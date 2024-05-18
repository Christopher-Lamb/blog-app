import * as React from "react";
import { Form, Input } from "../components/FormTEST";
import { HeadFC, PageProps } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => {
  return <main></main>;
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
