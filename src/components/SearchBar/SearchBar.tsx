import "./SearchBar.css";
import { ChangeEvent, FormEvent, useState } from "react";

type SearchBarProps = {
  fetchRepositories: (query: string, page: number) => void;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { fetchRepositories } = props;

  const [searchValue, setSearchValue] = useState("");

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue) {
      fetchRepositories(searchValue, 1);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        id="searchInput"
        className="search-bar__input"
        placeholder="Search GitHub repositories"
        value={searchValue}
        onChange={onSearchInputChange}
      />
      <button id="searchButton" className="search-bar__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
