import React from "react";

const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = (props) => {
  const { className, children, ...otherProps } = props;

  return (
    <form className={"w-full " + className} {...otherProps}>
      {children}
    </form>
  );
};

export default Form;
