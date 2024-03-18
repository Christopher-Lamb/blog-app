import React from "react";

const Form: React.FC<{ className?: string; children: React.ReactNode }> = ({ children, className }) => {
  return <form className={"w-full " + className}>{children}</form>;
};

export default Form;
