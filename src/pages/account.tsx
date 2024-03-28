import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Authenticated, Container, Navbar, AccoundHeader, BlogBox, Footer } from "../components";

const AccountContents: React.FC<PageProps> = () => {
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

const AccountPage = (props: PageProps) => {
  return <Authenticated WrappedComponent={AccountContents} {...props} />;
};

export default AccountPage;

export const Head: HeadFC = () => <title>Home</title>;
