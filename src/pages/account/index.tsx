import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Authenticated, Container, Navbar, AccountHeader, BlogBox, BlogSwitch, Footer, EditingWrapper, PublishedWrapper } from "../../components";
import { createBlog, initAuthorsBlogs, deleteAllUserBlogs, publishBlog, getPublishedBlogsByAuthor, deleteBlog, unpublishBlog } from "../../utils/blogAPI";
import { useUserContext } from "../../context/UserContext";

interface BlogPreview {
  title: string;
  thumbnail?: string;
  description?: string;
}

interface BlogBoxProps {
  author: string;
  slug: string;
  blogPreview: BlogPreview;
  published?: boolean;
  firstPublishedDate?: string;
  lastUpdatedDate?: string;
}

const AccountContents: React.FC<PageProps> = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [draftBlogs, setDraftBlogs] = useState<BlogBoxProps[]>([]);
  const [publishedBlogs, setPublishedBlogs] = useState<BlogBoxProps[]>([]);
  const { userObj } = useUserContext();

  const handleCreateBlog = async () => {
    const data: BlogBoxProps = await createBlog();

    setDraftBlogs((prevState: any) => [...prevState, { author: userObj?.username, slug: data.slug, blogPreview: data.blogPreview }]);
  };
  const handleDeleteAll = async () => {
    // await deleteAllUserBlogs();
    setDraftBlogs([]);
  };

  useEffect(() => {
    const initBlogs = async () => {
      try {
        // Handle Draft Blogs
        const blogs: BlogBoxProps[] = await initAuthorsBlogs();
        setDraftBlogs(blogs);
        const pubBlogs: BlogBoxProps[] = await getPublishedBlogsByAuthor();
        setPublishedBlogs(pubBlogs);
        console.log({ blogs, pubBlogs });
      } catch (err) {}
    };
    initBlogs();
  }, []);

  const handleBlogSwitch = async (bool: boolean) => {
    setIsEditing(bool);
    if (!bool) {
    }
  };

  const handlePublishBlog = async (slug: string) => {
    try {
      const res = await publishBlog(slug);
      console.log({ res });
      console.log({ slug, draftBlogs, publishedBlogs });
      const isAlreadyPublished = publishedBlogs.some((blog: BlogBoxProps) => blog.slug === slug);

      if (!isAlreadyPublished) {
        const newlyPublishedBlog: any = draftBlogs.find((blog: BlogBoxProps) => blog.slug === slug);
        if (newlyPublishedBlog) {
          newlyPublishedBlog["published"] = true;
          const newDraftBlogs = draftBlogs.map((blog: BlogBoxProps) => {
            if (blog.slug === slug) {
              return newlyPublishedBlog;
            } else {
              return blog;
            }
          });

          setDraftBlogs(newDraftBlogs);
          setPublishedBlogs((prev: any) => [...prev, newlyPublishedBlog]);
          console.log({ newlyPublishedBlog, publishedBlogs, draftBlogs });
        }
      }
    } catch (err) {}
  };

  const handleUnpublish = async (slug: string) => {
    const newPublishedBlogs = publishedBlogs.filter((blog) => blog.slug !== slug);
    const newDraftBlogs = draftBlogs.map((blog) => {
      if (blog.slug === slug) {
        return { ...blog, published: false };
      } else {
        return blog;
      }
    });
    setPublishedBlogs(newPublishedBlogs);
    setDraftBlogs(newDraftBlogs);
    await unpublishBlog(slug);
  };

  const handleDeleteBlog = async (slug: string) => {
    console.log({ draftBlogs });
    const newDraftBlogs = draftBlogs.filter((blog) => blog.slug !== slug);
    const newPublishedBlogs = publishedBlogs.filter((blog) => blog.slug !== slug);
    setDraftBlogs(newDraftBlogs);
    setPublishedBlogs(newPublishedBlogs);
    const res = await deleteBlog(slug);
  };
  return (
    <main>
      <Navbar />
      <AccountHeader />
      <BlogSwitch onChange={handleBlogSwitch} />
      {isEditing ? (
        <>
          <div className="mx-auto max-w-five px-4 xl:px-0 flex gap-2xsmall">
            <CreateBlogBtn onClick={handleCreateBlog}>Create Blog</CreateBlogBtn>
            {/* <CreateBlogBtn onClick={handleDeleteAll}>Delete All Blogs</CreateBlogBtn> */}
          </div>
          <Container className="gap-xsmall mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
            {draftBlogs.map((props: any, i: number) => (
              <EditingWrapper
                key={i}
                published={props.published}
                onPublish={() => handlePublishBlog(props.slug)}
                onDelete={() => {
                  // console.log("HELLOOOOOOOOOOO");
                  handleDeleteBlog(props.slug);
                }}
              >
                <BlogBox {...props} />
              </EditingWrapper>
            ))}
          </Container>
        </>
      ) : (
        <Container className="gap-xsmall mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
          {publishedBlogs.map((props: any, i: number) => (
            <PublishedWrapper key={i} onUnpublish={() => handleUnpublish(props.slug)}>
              <BlogBox {...props} />
            </PublishedWrapper>
          ))}
        </Container>
      )}
      <Footer className="mt-four" />
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
