import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container, Navbar, DynamicText, Footer, ContentSelector, ImgItem } from "../components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md";
import { generateUID, moveItemDND } from "../utils";

interface BlogItem {
  id: string;
  type: string;
  content: string;
}

const IndexPage: React.FC<PageProps> = () => {
  const [blogItems, setBlogItems] = useState<Record<string, BlogItem>>({});
  const [blogItemIds, setBlogItemIds] = useState<string[]>([]);

  useEffect(() => {
    const demoBlogItems = {
      title: { id: "title", type: "h1", content: "<h1>What a Great Blog title</h1>" },
      "item-2": { id: "item-2", type: "h2", content: "<h2>A secondary title not as good</h2>" },
      "item-3": {
        id: "item-3",
        type: "p",
        content: "<p>This is a paragraph about creating a blog post and we will be adding a backend functionality and I havent quite figured out how to incorporate the backend</p>",
      },
    };

    setBlogItems(demoBlogItems);
    setBlogItemIds(["item-2", "item-3"]);
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
    setBlogItems((prevItems) => ({ ...prevItems, [uid]: { id: uid, type: type, content: `<${type}>A secondary title not as good</${type}>` } }));
  };

  return (
    <main>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Navbar />
        <Container className="gap-meds blog mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
          {/* <DynamicText onChange={() => {}} primaryElement="h1" secondaryElement="none"  content={"<h1>This is the Title of the Blog</h1>"} />
        <DynamicText onChange={() => {}} primaryElement="h2" secondaryElement="none" content={"<h2>Welcome!</h2>"} />
      <DynamicText onChange={() => {}} secondaryElement="p" content={"<p>Hello There</p>"} /> */}

          {blogItems["title"] && <DynamicText primaryElement={"h1"} className="h-[60psx]s" secondaryElement={"none"} onChange={() => {}} content={blogItems["title"].content}></DynamicText>}
          <Droppable droppableId="main">
            {(provided, snapshot) => (
              <div className="borderl w-full" ref={provided.innerRef} {...provided.droppableProps}>
                {blogItemIds.map((itemId, i) => (
                  <DragWrapper id={itemId} index={i} key={itemId}>
                    {blogItems[itemId].type === "img" ? (
                      <ImgItem index={i} />
                    ) : (
                      <DynamicText
                        // className="mt-4"
                        primaryElement={blogItems[itemId].type}
                        secondaryElement={blogItems[itemId].type === "p" ? "p" : "none"}
                        onChange={() => {}}
                        content={blogItems[itemId].content}
                      ></DynamicText>
                    )}
                  </DragWrapper>
                ))}

                {/* <DragBox value="1" index={0} /> */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* <ImgItem /> */}
          <ContentSelector onClick={handleAddBlogItem} />
          {/* <SiteBanner /> */}
          {/* <SearchBar /> */}
        </Container>
        {/* <Footer className="mt-large" /> */}
      </DragDropContext>
    </main>
  );
};

const DragWrapper: React.FC<{ id: string; index: number; children?: React.ReactNode }> = ({ id, index, children }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="relative h-auto flex justify-center">
            <div className="absolute right-[-42px] top-0 primary" {...provided.dragHandleProps}>
              <MdDragHandle size={"2rem"} />
            </div>
          </div>
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
