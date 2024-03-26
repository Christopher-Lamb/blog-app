import React from "react";
import "./ContentSelector.css";

interface ContentSelectorProps {
  onClick: (type: string) => void;
  className?: string;
}

const ContentSelector: React.FC<ContentSelectorProps> = ({ onClick, className }) => {
  return (
    <div className={"flex gap-s2xsmall outline outline-accent outline-1 rounded w-fit " + className}>
      <Button onClick={() => onClick("h2")} className="border-right">
        Subheading
      </Button>
      <Button onClick={() => onClick("p")} className="border-right">
        Paragraph
      </Button>
      <Button onClick={() => onClick("img")}>Image</Button>
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <button className={"px-2xsmall py-3xsmall secondary hover:brightness-110 " + className} {...otherProps}>
      {children}
    </button>
  );
};

export default ContentSelector;
