import React, { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  type: "large" | "medium";
  onChange: (searchQuery: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ type, onChange, initialValue }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onChange(value);
  };

  let classList = "";
  switch (type) {
    case "large":
      classList += "max-w-four";
      break;
    case "medium":
      classList += "max-w-three";
      break;
  }

  return (
    <div className={"border border-secondary h-fit flex mx-auto w-full " + classList}>
      <div className="w-small h-smalls secondary flex items-center justify-center">
        <FaSearch size={"1.5rem"} />
      </div>
      <input className="w-full px-2xsmall h-small border" onChange={handleChange} value={searchQuery}></input>
    </div>
  );
};

export default SearchBar;
