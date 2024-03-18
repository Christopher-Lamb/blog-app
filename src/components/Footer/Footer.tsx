import React from "react";

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={"primary h-med " + className}>
      <div className="w-full h-2xsmall accent" />
    </div>
  );
};

export default Footer;
