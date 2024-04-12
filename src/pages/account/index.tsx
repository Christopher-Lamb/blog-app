import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Authenticated, Container, Navbar, AccountHeader, BlogBox, Footer } from "../../components";
import { createBlog, initAuthorsBlogs, deleteAllUserBlogs } from "../../utils/blogAPI";
import { useUserContext } from "../../context/UserContext";

const AccountContents: React.FC<PageProps> = () => {
  const [accountBlogs, setAccountBlogs] = useState<any>([]);
  const { userObj } = useUserContext();

  const handleCreateBlog = async () => {
    const data: { title: string; slug: string } = await createBlog();
    setAccountBlogs((prevState: any) => [...prevState, { title: data.title, author: userObj?.username, slug: data.slug }]);
  };
  const handleDeleteAll = async () => {
    await deleteAllUserBlogs();
    setAccountBlogs([]);
  };

  useEffect(() => {
    const initBlogs = async () => {
      try {
        const blogs = await initAuthorsBlogs();
        setAccountBlogs(blogs);
      } catch (err) {}
    };
    initBlogs();
  }, []);
  return (
    <main>
      <Navbar />
      <AccountHeader />
      <div className="mx-auto max-w-five px-4 xl:px-0 flex gap-2xsmall">
        <CreateBlogBtn onClick={handleCreateBlog}>Create Blog</CreateBlogBtn>
        <CreateBlogBtn onClick={handleDeleteAll}>Delete All Blogs</CreateBlogBtn>
      </div>
      <Container className="gap-xsmall mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
        {accountBlogs.map((props: any, i: number) => (
          <BlogBox key={i} {...props} />
        ))}
      </Container>
      <Footer className="mt-large" />
    </main>
  );
};

const CreateBlogBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <button className="text-med px-xsmall py-2xsmall primary" {...otherProps}>
      {children}
    </button>
  );
};

const AccountPage = (props: PageProps) => {
  return <Authenticated WrappedComponent={AccountContents} {...props} />;
};

export default AccountPage;

export const Head: HeadFC = () => <title>Home</title>;
