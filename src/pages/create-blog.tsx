import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Authenticated, Navbar, DynamicText, Footer, ContentSelector, ImgItem, SaveButton, PublishToggle } from "../components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { generateUID, moveItemDND } from "../utils";

interface BlogItem {
  id: string;
  type: string;
  content: string;
  src?: string | ArrayBuffer;
}

type PlaceholderMap = {
  [key: string]: string;
};

const placeholderMap: PlaceholderMap = {
  h2: "Subheading",
  p: "Paragraph",
};

const CreateBlogContent = (props: PageProps) => {
  const [blogItems, setBlogItems] = useState<Record<string, BlogItem>>({});
  const [blogItemIds, setBlogItemIds] = useState<string[]>([]);

  useEffect(() => {
    const demoBlogItems = {
      title: { id: "title", type: "h1", content: "<h1>The Title of the Blog</h1>" },
      subtitle: { id: "subtitle", type: "span", content: "<span>this article will highliht the world view of dem dems</span>" },
      "item-2": { id: "item-2", type: "h2", content: "<h2></h2>" },
      "item-3": {
        id: "item-3",
        type: "p",
        content: "<p></p>",
      },
      "item-4": {
        id: "item-4",
        type: "img",
        content: "This is an image of some shit coffee",
        src: "https://res.cloudinary.com/dur3duyjo/image/upload/v1711109877/DALL_E_2024-03-16_19.05.47_-_Create_a_cartoon_image_of_a_confident_young_woman_sitting_on_a_beach._She_has_medium-dark_skin_is_wearing_a_bright_green_bikini_top_and_brown_bikini_ifiudk.webp",
      },
    };

    setBlogItems(demoBlogItems);
    setBlogItemIds(["item-2", "item-3", "item-4"]);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const newArr = moveItemDND(blogItemIds, result);
    if (newArr) {
      setBlogItemIds(newArr);
      // updateTodoPosition(newArr, "mainIds");
    }
  };

  const handleAddBlogItem = (type: string) => {
    const uid = "blogitem-" + generateUID();
    setBlogItemIds((prevIds) => [...prevIds, uid]);
    if (type === "img") {
      setBlogItems((prevItems) => ({ ...prevItems, [uid]: { id: uid, type: type, file: "", content: `<label></label>` } }));
    } else {
      setBlogItems((prevItems) => ({ ...prevItems, [uid]: { id: uid, type: type, content: `<${type}></${type}>` } }));
    }
  };

  const handleDelete = (delId: string) => {
    const objStore = JSON.parse(JSON.stringify(blogItems));
    delete objStore[delId];
    setBlogItems(objStore);
    setBlogItemIds((prevIds) => prevIds.filter((id) => id !== delId));
  };

  const handleSave = () => {
    // AXIOS SAVE CONTENTS
    console.log("Saved");
  };

  const handlePublish = (value: boolean) => {
    if (value) handleSave();
    // AXIOS PUBLISH === true
    console.log(value);
  };

  const handleImgChange = (id: string, file: string | ArrayBuffer, text: string) => {
    console.log({ id, file, text });
    setBlogItems((prevItems) => ({ ...prevItems, [id]: { ...prevItems[id], content: text, src: file } }));
  };

  const formattedCurrentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short", // abbreviated day of the week
    year: "numeric", // numeric year
    month: "short", // abbreviated month name
    day: "numeric", // numeric day of the month
  });

  return (
    <main>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Navbar />
        {/* <SiteBanner /> */}
        {/* <SearchBar /> */}
        <div className="flex justify-end mx-auto max-w-five">
          <div className="flex flex-col md:flex-row items-center gap-small">
            <SaveButton onSave={handleSave} />
            <div className="flex items-cente gap-3xsmall">
              <label htmlFor="Publish Toggle" className="text-med">
                Published
              </label>
              <PublishToggle onChange={handlePublish} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start blog mt-med container mx-auto px-4 md:px-0 xl:max-w-five min-h-[80vh]">
          {blogItems["title"] && (
            <>
              <DynamicText className="w-full" placeholder="Headline" primaryElement={"h1"} secondaryElement={"none"} onChange={() => {}} content={blogItems["title"].content}></DynamicText>
              <DynamicText
                className="w-full"
                placeholder="Subheadline"
                primaryElement={"span"}
                id="subtitle"
                secondaryElement={"none"}
                onChange={() => {}}
                content={blogItems["subtitle"].content}
              ></DynamicText>
              <span id="author">Inserted Author</span>
              <span id="date">{formattedCurrentDate}</span>
            </>
          )}
          <Droppable droppableId="main">
            {(provided, snapshot) => (
              <div className="borderl w-full" ref={provided.innerRef} {...provided.droppableProps}>
                {blogItemIds.map((itemId, i) => (
                  <DragWrapper id={itemId} index={i} key={itemId} type={blogItems[itemId].type} onDelete={handleDelete}>
                    {blogItems[itemId].type === "img" ? (
                      <ImgItem index={i} handleChange={(file, text) => handleImgChange(itemId, file, text)} content={blogItems[itemId].content} src={blogItems[itemId].src} />
                    ) : (
                      <DynamicText
                        className="w-full"
                        primaryElement={blogItems[itemId].type}
                        secondaryElement={blogItems[itemId].type === "p" ? "p" : "none"}
                        onChange={(s) => {
                          console.log(s);
                        }}
                        placeholder={placeholderMap[blogItems[itemId].type]}
                        content={blogItems[itemId].content}
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
      <Footer className="mt-large" />
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
