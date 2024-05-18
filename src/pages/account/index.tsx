import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Authenticated, Container, SearchBar, Navbar, AccountHeader, BlogBox, BlogSwitch, Footer, EditingWrapper, PublishedWrapper, SortBox } from "../../components";
import { createBlog, initAuthorsBlogs, deleteAllUserBlogs, publishBlog, getPublishedBlogsByAuthor, deleteBlog, unpublishBlog } from "../../utils/blogAPI";
import { useUserContext } from "../../context/UserContext";
import { localSearchBlogs } from "../../utils/searchFunctions";

interface BlogPreview {
  title: string;
  thumbnail?: string;
  description?: string;
}

interface BlogBoxProps {
  author: string;
  slug: string;
  blogPreview: BlogPreview;
  isPublished?: boolean;
  firstPublishedDate?: string | number | Date;
  lastUpdatedDate?: string | number | Date;
  createdAt?: string | number | Date;
  updatedAt?: string | number | Date;
}
function sortArrayByDate(arr: BlogBoxProps[], attribute: "createdAt" | "updatedAt" | "firstPublishedDate" | "lastUpdatedDate"): BlogBoxProps[] {
  // console.log({ attribute });
  return arr.sort((a, b) => {
    // Handle potential undefined dates by providing a default that sorts them last
    const dateA = new Date(a[attribute] || 0); // Converts undefined to Unix Epoch (very old date)
    const dateB = new Date(b[attribute] || 0); // Same as above

    return dateB.getTime() - dateA.getTime(); // Compare timestamps
  });
}
const AccountContents: React.FC<PageProps> = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [draftBlogs, setDraftBlogs] = useState<BlogBoxProps[]>([]);
  const [publishedBlogs, setPublishedBlogs] = useState<BlogBoxProps[]>([]);
  const [draftSortType, setDraftSortType] = useState("lastUpdated");
  const [publishedSortType, setPublishedSortType] = useState("lastPublished");
  const { userObj } = useUserContext();

  const handleCreateBlog = async () => {
    const data: BlogBoxProps = await createBlog();

    setDraftBlogs((prevState: any) => [{ author: userObj?.username, slug: data.slug, blogPreview: data.blogPreview }, ...prevState]);
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
        let draft = sortArrayByDate(blogs, "updatedAt");
        setDraftBlogs(draft);

        const pubBlogs: BlogBoxProps[] = await getPublishedBlogsByAuthor();
        let published = sortArrayByDate(pubBlogs, "lastUpdatedDate");
        setPublishedBlogs(published);

        // console.log({ blogs, pubBlogs });
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
      //This is dumb we are watting for it to respond getting a response and not using it XD
      const res = await publishBlog(slug);
      // console.log({ res });
      // console.log({ slug, draftBlogs, publishedBlogs });
      const isAlreadyPublished = publishedBlogs.some((blog: BlogBoxProps) => blog.slug === slug);

      if (!isAlreadyPublished) {
        const newlyPublishedBlog: any = draftBlogs.find((blog: BlogBoxProps) => blog.slug === slug);
        if (newlyPublishedBlog) {
          newlyPublishedBlog["isPublished"] = true;
          //If this is the first time publishing this blog
          if (!newlyPublishedBlog["firstPublishedDate"]) {
            //We add the firstPublishDate
            newlyPublishedBlog["firstPublishedDate"] = new Date();
            newlyPublishedBlog["lastUpdatedDate"] = new Date();
          } else {
            // Else we pass the blog strictly as an update
            newlyPublishedBlog["lastUpdatedDate"] = new Date();
          }
          //Insert blog into state
          const newDraftBlogs = draftBlogs.map((blog: BlogBoxProps) => {
            if (blog.slug === slug) {
              return newlyPublishedBlog;
            } else {
              return blog;
            }
          });

          setDraftBlogs(newDraftBlogs);
          setPublishedBlogs((prev: any) => [newlyPublishedBlog, ...prev]);
        } else {
          const newPublishedBlogs = publishedBlogs.map((pubBlog) => {
            if (pubBlog.slug === slug) {
              return { ...pubBlog, lastUpdatedDate: new Date() };
            } else {
              return pubBlog;
            }
          });
          setPublishedBlogs(() => [...newPublishedBlogs]);
        }
      }
    } catch (err) {}
  };

  const handleUnpublish = async (slug: string) => {
    const newPublishedBlogs = publishedBlogs.filter((blog) => blog.slug !== slug);
    const newDraftBlogs = draftBlogs.map((blog) => {
      if (blog.slug === slug) {
        return { ...blog, isPublished: false };
      } else {
        return blog;
      }
    });
    setPublishedBlogs(newPublishedBlogs);
    setDraftBlogs(newDraftBlogs);
    await unpublishBlog(slug);
  };

  const handleDeleteBlog = async (slug: string) => {
    const newDraftBlogs = draftBlogs.filter((blog) => blog.slug !== slug);
    const newPublishedBlogs = publishedBlogs.filter((blog) => blog.slug !== slug);
    setDraftBlogs(newDraftBlogs);
    setPublishedBlogs(newPublishedBlogs);
    const res = await deleteBlog(slug);
  };

  const handleDraftSort = (sortType: string) => {
    let arr: any = [];
    setDraftSortType(sortType);
    if (sortType === "lastUpdated") {
      arr = sortArrayByDate(draftBlogs, "updatedAt");
    } else {
      arr = sortArrayByDate(draftBlogs, "createdAt");
    }
    setDraftBlogs(() => [...arr]);
  };

  const handlePublishSort = (sortType: string) => {
    let arr: any = [];
    // console.log({ sortType });
    setPublishedSortType(sortType);
    if (sortType === "latestPublish") {
      arr = sortArrayByDate(publishedBlogs, "lastUpdatedDate");
    } else if (sortType === "newest") {
      arr = sortArrayByDate(publishedBlogs, "firstPublishedDate");
    }
    // console.log(arr);
    // console.log(arr.map((item: any) => item.blogPreview.title).join("\n"));
    setPublishedBlogs(() => [...arr]);
  };

  const handleDraftSearch = (searchQuery: string) => {
    //If we are not sorting by search resort by sortbox
    if (searchQuery === "") {
      handleDraftSort(draftSortType);
    } else {
      const newDrafts = localSearchBlogs(draftBlogs, searchQuery);
      setDraftBlogs(() => [...newDrafts]);
    }
  };

  const handlePublishSearch = (searchQuery: string) => {
    //If we are not sorting by search resort by sortbox
    if (searchQuery === "") {
      handlePublishSort(publishedSortType);
    } else {
      const newPublished = localSearchBlogs(publishedBlogs, searchQuery);
      setPublishedBlogs(() => [...newPublished]);
    }
  };
  return (
    <main>
      <Navbar />
      <AccountHeader />
      <BlogSwitch onChange={handleBlogSwitch} />
      {isEditing ? (
        <>
          <div className="mx-auto max-w-five px-4 xl:px-0 flex flex-col md:flex-row gap-2xsmall">
            <CreateBlogBtn onClick={handleCreateBlog}>Create Blog</CreateBlogBtn>
            <SortBox onChange={handleDraftSort} initialSortType={draftSortType}>
              <option value="lastUpdated">Last Updated</option>
              <option value="lastCreated">Last Created</option>
            </SortBox>
            <div className="max-w-three w-full mt-3">
              <SearchBar type="medium" onChange={handleDraftSearch} />
            </div>
            {/* <CreateBlogBtn onClick={handleDeleteAll}>Delete All Blogs</CreateBlogBtn> */}
          </div>
          <Container className="gap-xsmall mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
            {draftBlogs.map((props: any, i: number) => (
              <EditingWrapper
                key={props.slug}
                isPublished={props.isPublished}
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
        <div className="mx-auto max-w-five px-4 grid xl:px-0 flex gap-2xsmall">
          <div className="flex gap-2xsmall">
            <SortBox onChange={handlePublishSort} initialSortType={publishedSortType}>
              <option value="latestPublish">Latest Publish</option>
              <option value="newest">Newest</option>
            </SortBox>
            <div className="max-w-three w-full mt-3">
              <SearchBar type="medium" onChange={handlePublishSearch} />
            </div>
          </div>
          <Container className="gap-xsmall mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
            {publishedBlogs.map((props: any) => (
              <PublishedWrapper key={props.slug} onUnpublish={() => handleUnpublish(props.slug)}>
                <BlogBox {...props} />
              </PublishedWrapper>
            ))}
          </Container>
        </div>
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
