import "./SearchBar.css";
import { ChangeEvent, FormEvent } from "react";

type SearchBarProps = {
  searchTerm: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: FormEvent) => void;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <form className="search-bar" onSubmit={props.handleSearch}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search GitHub repositories"
        onChange={props.handleInputChange}
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
