import React, { useEffect, useRef, useState, ChangeEvent, TextareaHTMLAttributes } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Authenticated, Navbar, DynamicText, Footer, ContentSelector, ImgItem, SaveButton, Thumbnail, BlogBox, SingleAccordion } from "../../components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { generateUID, moveItemDND } from "../../utils";
import { getDraftBySlug, updateDraftBySlug, updateSlugBySlug } from "../../utils/blogAPI";
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
      const { draft }: { draft: BlogItem[] } = await getDraftBySlug(slug);
      console.log({ draft });
      // Get the position of the body items where they have a position and then order the position and return only the ids
      const ids = draft
        .filter((draftItem): draftItem is BlogItem & { position: number } => draftItem.position !== undefined)
        .sort((a, b) => a.position - b.position)
        .map((item) => item._id);

      setBlogItemIds(ids);

      let mappedBlogItems: Record<string, BlogItem> = {};
      draft.forEach((item) => {
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
    let imageObj = text ? { src: file, content: text } : { src: file, content: "" };

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
    const blogItemsArray = Object.keys(workingStore).map((key) => {
      const { _id, ...rest } = workingStore[key];
      if (_id.split("-")[0] === "blogitem") {
        return rest;
      } else {
        return workingStore[key];
      }
    });

    //arr.filter((item)=> item.type !== 1) this will remove all items that equall one because it filters out every false
    //Send the objects to the backend
    const imgsUploaded: { position: number; src: string; type: string }[] = await updateDraftBySlug(slug, blogItemsArray);
    // AXIOS is returning the positions we hav uploaded images along with the new url associated with that image
    imgsUploaded.forEach((imgObj) => {
      //get id at index then update the src with the new url at the targetId
      if (imgObj.type === "image") {
        const targetId = blogItemIds[imgObj.position];
        setBlogItems((prevItems) => ({ ...prevItems, [targetId]: { ...prevItems[targetId], src: imgObj.src } }));
      } else if (imgObj.type === "thumbnail") {
        setBlogItems((prevItems) => ({ ...prevItems, thumbnail: { ...prevItems["thumbnail"], src: imgObj.src } }));
      }
    });

    // Handle if slug has changed
    if (slug !== slugState) {
      const newSlug = await updateSlugBySlug(slug, slugState);
      window.location.replace("/account/" + newSlug);
    }
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    let string = e.target.value;
    // Get rid of spaces and special characters
    string = string.replace(/(\s+)|(-+)/g, "-");
    string = string.replace(/[^a-zA-Z0-9-]/g, "");
    string = string.replace(/(\s+)|(-+)/g, "-");
    string = string.replace(/^[-]+|[-]+$/g, "");
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-end mx-auto max-w-five">
          <div className="flex flex-col md:flex-row items-center gap-small">
            <SaveButton onSave={handleSave} />
          </div>
        </div>
        <div className="flex flex-col items-start blog mt-med container mx-auto px-4 md:px-0 max-w-four min-h-[80vh]">
          {blogItems["title"] && (
            <>
              {/* SLUG AND DESCRIPTION */}
              <SingleAccordion title="Url, Description, and Thumbnail">
                <div className="grid w-full gap-3xsmall max-w-four p-4">
                  <div className="grid">
                    <label className="text-med w-fit" style={{ borderBottom: "2px solid rgba(0,0,0,.2)" }}>
                      Slug or Url Path
                    </label>
                    <input className="p-3xsmall w-full text-small18 border" onChange={handleSlugChange} defaultValue={slugState}></input>
                    <span className="p-3xsmall">slug preview: /{slugState}/</span>
                  </div>
                  <div className="grid">
                    <label className="text-med w-fit" style={{ borderBottom: "2px solid rgba(0,0,0,.2)" }}>
                      Brief Description
                    </label>
                    <textarea
                      maxLength={300}
                      onChange={(e) => handleTextChange("description", e.target.value)}
                      className="h-[100px] resize-none w-full p-3xsmall border"
                      defaultValue={initalObjRef.current["description"].content}
                    />
                  </div>
                  <div className="max-w-three w-full">
                    <label className="text-med">Thumbnail:</label>
                    <Thumbnail handleChange={(file) => handleImgChange("thumbnail", file)} src={blogItems["thumbnail"].src} />
                  </div>
                </div>
              </SingleAccordion>
              {/* <BlogBox /> */}
              {/* TITLE AND SUBTITLE */}
              <DynamicText
                className="w-full "
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
                        className="w-full h-fit"
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
  className?: string;
}

const DragWrapper: React.FC<DragWrapperProps> = ({ id, index, children, type, onDelete, className }) => {
  let marginTop = "0";
  switch (type) {
    case "image":
      marginTop = "my-3";
      break;
    case "subheading":
      marginTop = "mb-[0.125rem] mt-2";
      break;
    case "paragraph":
      marginTop = "mb-2";
      break;
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} className={"flex h-auto relative gap-2s " + marginTop}>
          {/* <div className="relative h-auto flex justify-center"></div> */}
          {children}
          {type === "image" ? (
            <div className="absolute rights-0 flex">
              <div className="relative primary h-8 w-8 shrink-0 rounded" {...provided.dragHandleProps}>
                <MdDragHandle size={"2rem"} />
              </div>
              <button onClick={() => onDelete(id)} className="relative shrink-0 accent h-8 w-8 flex items-center justify-center rounded">
                <FaTrash size={"1rem"} />
              </button>
            </div>
          ) : (
            <>
              <div className="relative primary h-8 w-8 shrink-0 rounded" {...provided.dragHandleProps}>
                <MdDragHandle size={"2rem"} />
              </div>
              <button onClick={() => onDelete(id)} className="relative shrink-0 accent h-8 w-8 flex items-center justify-center rounded">
                <FaTrash size={"1rem"} />
              </button>
            </>
          )}
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
