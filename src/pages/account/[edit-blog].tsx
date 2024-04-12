import React, { useEffect, useRef, useState, ChangeEvent, TextareaHTMLAttributes } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Authenticated, Navbar, DynamicText, Footer, ContentSelector, ImgItem, SaveButton, Thumbnail, BlogBox } from "../../components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { generateUID, moveItemDND } from "../../utils";
import { getBlogBySlug, updateBlogBySlug, updateSlugBySlug } from "../../utils/blogAPI";
import { useUserContext } from "../../context/UserContext";

interface BlogItem {
  _id: string;
  type: string;
  content?: string;
  position?: number;
  src?: string | ArrayBuffer;
}

type PlaceholderMap = {
  [key: string]: string;
};

const placeholderMap: PlaceholderMap = {
  h2: "subheading",
  p: "paragraph",
};

const elementMap: PlaceholderMap = {
  title: "h1",
  subtitle: "span",
  paragraph: "p",
  subheading: "h2",
  image: "img",
};

const CreateBlogContent = (props: PageProps) => {
  const [blogItems, setBlogItems] = useState<Record<string, BlogItem>>({});
  const [blogItemIds, setBlogItemIds] = useState<string[]>([]);
  const { userObj } = useUserContext();
  const initalObjRef = useRef<Record<string, BlogItem>>({});
  const slug = window.location.pathname.split("/")[2];
  const [slugState, setSlugState] = useState(slug);

  // INIT
  useEffect(() => {
    const initBlog = async () => {
      const { body }: { body: BlogItem[] } = await getBlogBySlug(slug);

      // Get the position of the body items where they have a position and then order the position and return only the ids
      const ids = body
        .filter((bodyItem): bodyItem is BlogItem & { position: number } => bodyItem.position !== undefined)
        .sort((a, b) => a.position - b.position)
        .map((item) => item._id);

      setBlogItemIds(ids);

      let mappedBlogItems: Record<string, BlogItem> = {};
      body.forEach((item) => {
        if (["title", "subtitle", "description", "thumbnail"].includes(item.type)) {
          mappedBlogItems[item.type] = item;
        } else {
          mappedBlogItems[item._id] = item;
        }
      });
      setBlogItems(mappedBlogItems);
      initalObjRef.current = mappedBlogItems;
      console.log({ blogItemIds, blogItems, initalObjRef });
    };
    initBlog();
  }, []);

  // BEAUTIFUL DND
  const handleDragEnd = (result: DropResult) => {
    const newArr = moveItemDND(blogItemIds, result);
    if (newArr) {
      setBlogItemIds(newArr);
      // updateTodoPosition(newArr, "mainIds");
    }
  };

  //
  // UI UPDATES
  //
  const handleAddBlogItem = (type: string) => {
    const uid = "blogitem-" + generateUID();
    setBlogItemIds((prevIds) => [...prevIds, uid]);
    if (type === "img") {
      setBlogItems((prevItems) => ({ ...prevItems, [uid]: { _id: uid, type: "image", src: "", content: `<label></label>` } }));
    } else if (type === "title") {
    } else {
      initalObjRef.current = { ...initalObjRef.current, [uid]: { _id: uid, type: type, content: `` } };
      setBlogItems((prevItems) => ({ ...prevItems, [uid]: { _id: uid, type: placeholderMap[type], content: `` } }));
    }
  };

  const handleDelete = (delId: string) => {
    const objStore = JSON.parse(JSON.stringify(blogItems));
    delete objStore[delId];
    setBlogItems(objStore);
    setBlogItemIds((prevIds) => prevIds.filter((id) => id !== delId));
  };

  const handleTextChange = (id: string, text: string) => {
    setBlogItems((prevItems) => ({
      ...prevItems,
      [id]: { ...prevItems[id], content: text },
    }));
  };

  const handleImgChange = (id: string, file: string | ArrayBuffer, text?: string) => {
    let imageObj = text ? { src: file, content: "" } : { src: file, content: text };
    setBlogItems((prevItems) => ({ ...prevItems, [id]: { ...prevItems[id], ...imageObj } }));
  };

  //
  // HANDLE AXIOS SAVING
  //
  const handleSave = async () => {
    //Copy the blogItems as to not alter state directly
    let workingStore = JSON.parse(JSON.stringify(blogItems));

    // Enumerate the position of each item that can be drag and dropped
    blogItemIds.forEach((item, i) => {
      workingStore[item] = { ...workingStore[item], position: i };
    });

    //Remove the id from the store as to not cause conflict with mongoose
    const blogItemsArray = Object.keys(workingStore)
      .map((key) => {
        const { _id, ...rest } = workingStore[key];
        if (_id.split("-")[0] === "blogitem") {
          return rest;
        } else {
          return workingStore[key];
        }
      })
      .filter((obj) => (obj.type !== "image" && obj.content !== "") || (["image", "thumbnail"].includes(obj.type) && obj.src !== ""));

    //Send the objects to the backend
    const imgsUploaded: { position: number; src: string; type: string }[] = await updateBlogBySlug(slug, blogItemsArray);
    // AXIOS is returning the positions we hav uploaded images along with the new url associated with that image
    imgsUploaded.forEach((imgObj) => {
      //get id at index then update the src with the new url at the targetId
      if (imgObj.type === "image") {
        const targetId = blogItemIds[imgObj.position];
        setBlogItems((prevItems) => ({ ...prevItems, [targetId]: { ...prevItems[targetId], src: imgObj.src } }));
      } else if (imgObj.type === "thumbnail") {
        console.log(imgObj);
        setBlogItems((prevItems) => ({ ...prevItems, thumbnail: { ...prevItems["thumbnail"], src: imgObj.src } }));
      }
    });

    // Handle if slug has changed
    if (slug !== slugState) {
      console.log("Slug has changed");
      const newSlug = await updateSlugBySlug(slug, slugState);
      console.log(newSlug);
      window.location.replace("/account/" + newSlug);
    }

    console.log({ blogItemIds, blogItems, initalObjRef });
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    let string = e.target.value;
    // Get rid of spaces and special characters
    string = string.replace(/(\s+)|(-+)/g, "-");
    string = string.replace(/[^a-zA-Z0-9-]/g, "");
    string = string.slice(0, 70).toLowerCase();
    setSlugState(string);
  };

  const formattedCurrentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short", // abbreviated day of the week
    year: "numeric", // numeric year
    month: "short", // abbreviated month name
    day: "numeric", // numeric day of the month
  });

  //

  return (
    <main>
      <Navbar />
      <div className="h-10 bg-orange-400">hello</div>
      {true && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex justify-end mx-auto max-w-five">
            <div className="flex flex-col md:flex-row items-center gap-small">
              <SaveButton onSave={handleSave} />
            </div>
          </div>
          <div className="flex flex-col items-start blog mt-med container mx-auto px-4 md:px-0 xl:max-w-five min-h-[80vh]">
            {/*  */}
            {blogItems["title"] && (
              <>
                {/* SLUG AND DESCRIPTION */}
                <div className="grid w-full max-w-four p-4 bg-gray-50 shadow mb-small">
                  <div className="grid">
                    <label className="text-med w-fit" style={{ borderBottom: "2px solid rgba(0,0,0,.2)" }}>
                      Slug or Url Path
                    </label>
                    <input className="p-3xsmall w-full text-small18" onChange={handleSlugChange} defaultValue={slugState}></input>
                    <span className="p-3xsmall">slug preview: /{slugState}/</span>
                  </div>
                  <div className="grid">
                    <label className="text-med w-fit" style={{ borderBottom: "2px solid rgba(0,0,0,.2)" }}>
                      Brief Description
                    </label>
                    <textarea
                      maxLength={250}
                      onChange={(e) => handleTextChange("description", e.target.value)}
                      className="max-h-large resize-none w-full"
                      defaultValue={initalObjRef.current["description"].content}
                    />
                  </div>
                </div>
                <div className="max-w-three w-full">
                  <label className="text-med">Thumbnail:</label>
                  <Thumbnail handleChange={(file) => handleImgChange("thumbnail", file)} src={blogItems["thumbnail"].src} />
                </div>
                {/* <BlogBox /> */}
                {/* TITLE AND SUBTITLE */}
                <DynamicText
                  className="w-full"
                  placeholder="Headline"
                  primaryElement={"h1"}
                  secondaryElement={"none"}
                  onChange={(text) => handleTextChange("title", text)}
                  content={initalObjRef.current["title"].content}
                ></DynamicText>
                <DynamicText
                  className="w-full"
                  placeholder="Subheadline"
                  primaryElement={"span"}
                  id="subtitle"
                  secondaryElement={"none"}
                  onChange={(text) => handleTextChange("subtitle", text)}
                  content={initalObjRef.current["subtitle"].content}
                ></DynamicText>
                <span id="author">Written by {userObj?.username}</span>
                <span id="date">{formattedCurrentDate}</span>
              </>
            )}
            {/* RENDER ALL Draggable Components */}
            <Droppable droppableId="main">
              {(provided, snapshot) => (
                <div className="borderl w-full" ref={provided.innerRef} {...provided.droppableProps}>
                  {blogItemIds.map((itemId, i) => (
                    <DragWrapper id={itemId} index={i} key={itemId} type={blogItems[itemId].type} onDelete={handleDelete}>
                      {blogItems[itemId].type === "image" ? (
                        <ImgItem index={i} handleChange={(file, text) => handleImgChange(itemId, file, text)} content={blogItems[itemId].content} src={blogItems[itemId].src} />
                      ) : (
                        <DynamicText
                          className="w-full"
                          primaryElement={elementMap[blogItems[itemId].type]}
                          secondaryElement={blogItems[itemId].type === "paragraph" ? "p" : "none"}
                          onChange={(text) => {
                            console.log(itemId);
                            handleTextChange(itemId, text);
                          }}
                          placeholder={placeholderMap[blogItems[itemId].type]}
                          content={initalObjRef.current[itemId].content}
                        ></DynamicText>
                      )}
                    </DragWrapper>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <ContentSelector className="mt-3xsmall" onClick={handleAddBlogItem} />
          </div>
        </DragDropContext>
      )}
      {/* <Footer className="mt-large" /> */}
    </main>
  );
};

interface DragWrapperProps {
  id: string;
  index: number;
  children?: React.ReactNode;
  type?: string;
  onDelete: (delId: string) => void;
}

const DragWrapper: React.FC<DragWrapperProps> = ({ id, index, children, type, onDelete }) => {
  let marginTop = "0";
  switch (type) {
    case "img":
      marginTop = "mt-4";
      break;
    case "h2":
      marginTop = "mt-2.5";
      break;
    case "p":
      marginTop = "mt-1";
      break;
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} className={"flex gap-2 " + marginTop}>
          {/* <div className="relative h-auto flex justify-center"></div> */}
          {children}
          <div className="relative primary h-8 w-8 flex rounded" {...provided.dragHandleProps}>
            <MdDragHandle size={"2rem"} />
          </div>
          <button onClick={() => onDelete(id)} className="relative accent h-8 w-8 flex items-center justify-center rounded">
            <FaTrash size={"1rem"} />
          </button>
        </div>
      )}
    </Draggable>
  );
};

// Now, wrap ProfilePageContent with Authenticated and export this instead
const CreateBlogPage = (props: PageProps) => {
  return <Authenticated WrappedComponent={CreateBlogContent} {...props} />;
};

export default CreateBlogPage;
export const Head: HeadFC = () => <title>Create Blog</title>;
