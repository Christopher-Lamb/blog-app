import React, { useState } from "react";

interface SingleAccordionProps {
  title: string; // Text for the clickable area
  children: React.ReactNode;
  defaultOpen?: boolean; // Optional prop to set the accordion as open by default
}

const SingleAccordion: React.FC<SingleAccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border bg-gray-50">
      {/* Accordion Header */}
      <button onClick={toggleAccordion} className="flex w-full items-center justify-between cursor-pointer hover:bg-gray-100 text-small18 p-3xsmall">
        {title}
        <span className="px-4" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
          ▼ {/* This is a simple arrow, you can replace it with an icon if preferred */}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default SingleAccordion;
