import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container, Navbar, DynamicText, Footer } from "../components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const IndexPage: React.FC<PageProps> = () => {
  const [blogItems, setBlogItems] = useState([]);
  const [blogItemIds, setBlogItemIds] = useState([]);

  useEffect(() => {
    const demoBlogItems = { "item-1": { id: "item-1", type: "h1", content: "<" }, "item-2": { id: "item-2", type: "h2", content: "" } };

    setBlogItems([]);
  });
  return (
    <main>
      <DragDropContext onDragEnd={() => {}}>
        <Navbar />
        <Container className="gap-meds blog mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
          {/* <DynamicText onChange={() => {}} primaryElement="h1" secondaryElement="none"  content={"<h1>This is the Title of the Blog</h1>"} />
        <DynamicText onChange={() => {}} primaryElement="h2" secondaryElement="none" content={"<h2>Welcome!</h2>"} />
      <DynamicText onChange={() => {}} secondaryElement="p" content={"<p>Hello There</p>"} /> */}
          <Droppable droppableId="main">
            {(provided, snapshot) => (
              <div className="border h-four w-full" ref={provided.innerRef} {...provided.droppableProps}>
                <DragBox value="1" index={0} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* <SiteBanner /> */}
          {/* <SearchBar /> */}
        </Container>
        {/* <Footer className="mt-large" /> */}
      </DragDropContext>
    </main>
  );
};

const DragBox: React.FC<{ value: string; index: number }> = ({ value, index }) => {
  return <div className="bg-blue-300 w-full h-large"></div>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
