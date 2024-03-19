import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container, Navbar, AccoundHeader, BlogBox, Footer } from "../components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navbar />
      <AccoundHeader />
      <Container className="gap-xsmall mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
        <BlogBox />
        <BlogBox />
        <BlogBox />
      </Container>
      <Footer className="mt-large" />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
