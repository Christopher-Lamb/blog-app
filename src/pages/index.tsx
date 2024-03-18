import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container, Navbar, SearchBar, SiteBanner, BlogBox, Footer } from "../components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navbar />
      <Container className="gap-med mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
        <SiteBanner />
        <SearchBar />
        <Container className="gap-xsmall">
          <BlogBox />
          <BlogBox />
          <BlogBox />
          <BlogBox />
        </Container>
      </Container>
        <Footer className="mt-large" />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
