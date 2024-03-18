import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  const { className, ...otherProps } = props;

  return <input className={"h-small p-2xsmall border border-primary " + className} {...otherProps}></input>;
};

export default Input;
