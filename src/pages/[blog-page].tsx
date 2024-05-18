import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Footer, Navbar, Container } from "../components";
import { getPublishedBySlug } from "../utils/blogAPI";
import { h1Content } from "../utils";
import { Helmet } from "react-helmet";

interface BlogItem {
  _id: string;
  type: string;
  content?: string;
  src?: string;
  position: number;
}

interface BlogInfo {
  author: string;
  firstPublishedDate: string;
  lastUpdatedDate: string;
  title?: string | undefined;
  subtitle?: string | undefined;
}

const BlogPage: React.FC<PageProps> = () => {
  const slug =
    typeof window !== "undefined"
      ? window.location.pathname
          .split("/")
          .filter((i) => i)
          .pop() || ""
      : "";
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [blogInfo, setBlogInfo] = useState<BlogInfo>();

  useEffect(() => {
    const initBlog = async () => {
      const blog: BlogInfo & { published: BlogItem[] } = await getPublishedBySlug(slug);
      let infoObject = { author: blog.author, firstPublishedDate: blog.firstPublishedDate, lastUpdatedDate: blog.lastUpdatedDate };
      let itemsArray: BlogItem[] = [];
      blog.published.forEach((item) => {
        if (["title", "subtitle"].includes(item.type)) {
          infoObject = { ...infoObject, [item.type]: item.content };
        } else if (["subheading", "paragraph", "image"].includes(item.type)) {
          itemsArray.push(item);
        }
      });
      itemsArray.sort((a, b) => a.position - b.position);
      setBlogItems(itemsArray);
      // console.log(itemsArray);
      setBlogInfo(infoObject as BlogInfo);
    };
    initBlog();
    // console.log(slug);
  }, []);
  return (
    <main>
      <Helmet>
        <title>{h1Content(blogInfo?.title) || ""}The Public Post</title>
      </Helmet>
      <Navbar />
      <Container className="flex flex-col items-start blog mt-med container mx-auto px-4 md:px-0 max-w-four min-h-[80vh]s">
        {blogInfo && (
          <>
            <h1 dangerouslySetInnerHTML={{ __html: blogInfo.title || "" }}></h1>
            <span id="subtitle" dangerouslySetInnerHTML={{ __html: blogInfo.subtitle || "" }}></span>
            <span id="author">Written by {blogInfo.author}</span>
            <span id="date">{new Date().toLocaleDateString()}</span>
          </>
        )}
        <div className="w-full h-[1px] mt-2 bg-gray-200"></div>
        <div className="grid">
          {blogItems.map((props, i) => {
            if (props.type === "image") {
              return (
                <div key={i} className="w-full published-image">
                  <div className="relative min-h-fulls w-full">
                    <img className="inset-0 h-full min-w-full mx-auto object-cover" src={props.src || ""} alt={props.content} />
                  </div>
                  <div className="text-[14px] mt-1 text-[#595959]" dangerouslySetInnerHTML={{ __html: props.content || "" }}></div>
                </div>
              );
            } else {
              return <div key={i} className={`published-${props.type}`} dangerouslySetInnerHTML={{ __html: props.content || "" }}></div>;
            }
          })}
        </div>
      </Container>
      <Footer className="mt-four" />
    </main>
  );
};
export default BlogPage;

export const Head: HeadFC = () => <title>Blog Page</title>;
