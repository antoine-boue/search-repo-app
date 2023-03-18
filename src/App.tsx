import "./App.css";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import RepositoryList from "./components/RepositoryList/RepositoryList";
import SearchBar from "./components/SearchBar/SearchBar";
import { GHSearchRepositoryResponse, Repository } from "./types";

const PAGE_SIZE = 10;
const THROTTLE_LIMIT_SECONDS = 1000;

const App = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasError, setHasError] = useState(false);
  const lastFetchTime = useRef(Date.now());

  const fetchRepositories = (page: number) => {
    if (Date.now() - lastFetchTime.current >= THROTTLE_LIMIT_SECONDS) {
      fetch(
        `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=10`
      )
        .then((response) => {
          if (response.status !== 200) throw Error();
          return response.json();
        })
        .then((data: GHSearchRepositoryResponse) => {
          setRepositories(data.items);
          setTotalPages(Math.ceil(data.total_count / PAGE_SIZE));
          setCurrentPage(page);
          setHasError(false);
        })
        .catch(() => {
          setRepositories([]);
          setHasError(true);
        });
      lastFetchTime.current = Date.now();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRepositories(1);
  };

  return (
    <div className="App">
      <SearchBar
        searchTerm={query}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      <RepositoryList
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        repositories={repositories}
        hasError={hasError}
        fetchRepositories={fetchRepositories}
      />
    </div>
  );
};

export default App;
