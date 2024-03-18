import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

const Label: React.FC<LabelProps> = (props) => {
  const { className, children, label, ...otherProps } = props;

  return (
    <div className={"w-full flex flex-col " + className}>
      <label className="jost" {...otherProps}>{label}</label>
      {children}
    </div>
  );
};

export default Label;
