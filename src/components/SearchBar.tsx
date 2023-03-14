import { ChangeEvent } from "react";
import { Repository } from "../types";

type SearchBarProps = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        onChange={props.handleInputChange}
      />
      <button className="search-button" onClick={props.handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
