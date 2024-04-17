import React from "react";

interface SortBoxProps {
  onChange: (sortType: string) => void;
  initialSortType: string;
  children: React.ReactNode;
}
const SortBox: React.FC<SortBoxProps> = ({ onChange, initialSortType, children }) => {
  // Handle change on select
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setSortType(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <select defaultValue={initialSortType} onChange={handleSortChange} className="border p-4 text-med">
        {children}
      </select>
    </div>
  );
};

export default SortBox;
