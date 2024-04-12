import React from "react";
import "./BlogBlox.css";
import { Link } from "gatsby";

interface BlogBoxProps {
  author: string;
  title: string;
  slug: string;
}

const BlogBox: React.FC<BlogBoxProps> = ({ author, title, slug }) => {
  return (
    <Link to={slug}>
      <div className="blog-container">
        <div className="flex flex-col blog-box md:flex-row golden-split min-h-two">
          {/* <div></div>
      <div></div> */}
          <div className="bg-secondary w-full h-two"></div>
          <div className="p-xsmall pr-med h-two flex flex-col justify-between">
            <div>
              <h2 className="text-med jost lg:text-medlarge">{title}</h2>
              <p className="text-gray-600">
                description In officia quis mollit eiusmod fugiat. Ea aliqua minim mollit laborum ut in aliquip occaecat nostrud aliqua ad velit. Sint Lorem nostrud ea sit incididunt excepteur labore.
                Qui esse incididunt duis labore anim in velit qui ea ea elit sunt.
              </p>
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

export default BlogBox;
