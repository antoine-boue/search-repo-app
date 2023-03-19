import "./SearchBar.css";
import { ChangeEvent, FormEvent, useState } from "react";

type SearchBarProps = {
  currentPage: number;
  fetchRepositories: (query: string, page: number) => void;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { currentPage, fetchRepositories } = props;

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchRepositories(searchInput, currentPage);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        id="searchInput"
        className="search-bar__input"
        placeholder="Search GitHub repositories"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button id="searchButton" className="search" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
