import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onSave: () => void;
}
const SaveButton: React.FC<SaveButtonProps> = (props) => {
  //Carry out auto save feature with useInterval
  const { onSave, className, ...otherProps } = props;

  // const resetInterval = useInterval(() => {
  //   onSave();
  // }, 30000);

  const handleSave = () => {
    // resetInterval();
    onSave();
  };
  return (
    <button className={className + " accent outline outline-primary py-3xsmall px-xsmall text-med rounded hover:brightness-110"} onClick={handleSave} {...otherProps}>
      Save Blog
    </button>
  );
};

export default SaveButton;
