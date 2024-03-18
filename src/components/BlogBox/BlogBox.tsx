import React from "react";

const BlogBox: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row golden-split">
      {/* <div></div>
      <div></div> */}
      <div className="bg-primary w-full h-one"></div>
      <div className="p-2xsmall">
        <h2 className="text-med lg:text-med">Some Heading</h2>
        <p className="lg:text-small18">
          description In officia quis mollit eiusmod fugiat. Ea aliqua minim mollit laborum ut in aliquip occaecat nostrud aliqua ad velit. Sint Lorem nostrud ea sit incididunt excepteur labore. Qui
          esse incididunt duis labore anim in velit qui ea ea elit sunt.
        </p>
      </div>
    </div>
  );
};

export default BlogBox;
