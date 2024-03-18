import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <button type="submit" className={" " + className} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
