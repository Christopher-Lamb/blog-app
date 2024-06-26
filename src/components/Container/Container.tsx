import React from "react";

const Container: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={"grid " + className}>{children}</div>;
};

export default Container;
