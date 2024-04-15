import React from "react";
import "./BlogBlox.css";
import { Link } from "gatsby";
import PLACEHOLDER from "../../images/placeholder.jpeg";

interface BlogPreview {
  title: string;
  thumbnail?: string;
  description?: string;
}

interface BlogBoxProps {
  author: string;
  slug: string;
  blogPreview: BlogPreview;
}

const BlogBox: React.FC<BlogBoxProps> = ({ author, slug, blogPreview }) => {
  // console.log({ author, slug, blogPreview });
  return (
    <Link to={slug}>
      <div className="blog-container">
        <div className="flex flex-col blog-box md:flex-row golden-split min-h-two">
          {/* <div></div>
      <div></div> */}
          <div className="w-full relative h-one md:h-auto max-h-two overflow-hidden">
            <div className="relative min-h-full w-full">
              {blogPreview.thumbnail ? (
                <img src={blogPreview.thumbnail} alt="Blog Thumbnail" className="absolute inset-0 h-full min-w-full mx-auto object-cover" />
              ) : (
                <img src={PLACEHOLDER} alt="Blog Thumbnail" className="absolute inset-0 h-full min-w-full mx-auto object-cover" />
              )}
            </div>
          </div>
          <div className="p-xsmall pr-med h-two w-full flex flex-col justify-between">
            <div>
              <h2 className="text-med jost lg:text-medlarge">{blogPreview.title}</h2>
              <p className="text-gray-600">{blogPreview.description}</p>
            </div>
            <span aria-label="author" className="block mt-2xsmall">
              <span className="text-gray-600">Written By:</span> {author}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface EditingWrapperProps {
  children: React.ReactNode;
  onDelete: () => void;
  onPublish: () => void;
  published: boolean;
}

const publishStyles = {
  color: "var(--primary-text)",
  background: "var(--primary)",
};
const republishStyles = {
  color: "var(--secondary-text)",
  background: "var(--secondary)",
};

export const EditingWrapper: React.FC<EditingWrapperProps> = ({ children, onDelete, onPublish, published }) => {
  return (
    <div className="w-full">
      <div className="flex justify-end relative">
        <button className={"relative px-4 py-2 hover:contrast-125 hover:translate-y-[-1px] active:translate-y-0"} style={{ ...(published ? republishStyles : publishStyles) }} onClick={onPublish}>
          {published ? "Re-Publish" : "Publish"}
        </button>
        <button className="relative px-4 py-2 bg-red-700 text-white hover:translate-y-[-1px] active:translate-y-0" onClick={onDelete}>
          Delete
        </button>
      </div>
      {children}
    </div>
  );
};
interface PublishedWrapperProps {
  children: React.ReactNode;
  onUnpublish: () => void;
}
export const PublishedWrapper: React.FC<PublishedWrapperProps> = ({ children, onUnpublish }) => {
  return (
    <div className="w-full">
      <div className="flex justify-end relative">
        <button className="relative px-4 py-2 primary" onClick={onUnpublish}>
          Un-Publish
        </button>
      </div>
      {children}
    </div>
  );
};

export default BlogBox;
