import React, { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <div className="border border-secondary flex max-w-four mx-auto w-full">
      <div className="w-small h-small secondary flex items-center justify-center">
        <FaSearch size={"1.5rem"} />
      </div>
      <input className="w-full px-2xsmall h-small" onChange={handleChange} value={searchQuery}></input>
    </div>
  );
};

export default SearchBar;
