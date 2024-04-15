import React, { useState } from "react";

interface BlogSwitchProps {
  onChange: (isEditing: boolean) => void;
}

const enabledStyles = {
  color: "#2e2050",
  background: "#c49cd6",
};
const disabledStyles = {
  color: "rgb(209 213 219)",
  background: "rgb(107, 114, 128)",
};

const BlogSwitch: React.FC<BlogSwitchProps> = ({ onChange }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (bool: boolean) => {
    setIsEditing(bool);
    onChange(bool);
  };
  return (
    <div className="w-full grid grid-cols-2 items-center">
      <button style={isEditing ? enabledStyles : disabledStyles} className="py-2xsmall text-med hover:brightness-110" onClick={() => handleChange(true)}>
        Edit Blogs
      </button>
      <button style={!isEditing ? enabledStyles : disabledStyles} className="py-2xsmall text-med hover:brightness-110" onClick={() => handleChange(false)}>
        Published Blogs
      </button>
    </div>
  );
};

export default BlogSwitch;
