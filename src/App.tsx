import "./App.css";
import { useRef, useState } from "react";
import RepositoryList from "./components/RepositoryList/RepositoryList";
import SearchBar from "./components/SearchBar/SearchBar";
import { GHSearchRepositoryResponse, Repository } from "./types";

const GH_REPO_API_URL = import.meta.env.VITE_GH_REPO_API_URL;
const THROTTLE_LIMIT_SECONDS = import.meta.env.VITE_THROTTLE_LIMIT_SECONDS;

const PAGE_SIZE = 10;
const MAX_TOTAL_PAGES = 100;

const App = () => {
  const [repositories, setRepositories] = useState<Repository[] | null>(null);
  const [currentSearchValue, setCurrentSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const lastFetchTime = useRef(Date.now());

  const fetchRepositories = (searchValue: string, page: number) => {
    if (Date.now() - lastFetchTime.current >= THROTTLE_LIMIT_SECONDS) {
      setIsLoading(true);
      fetch(`${GH_REPO_API_URL}?q=${searchValue}&page=${page}&per_page=10`)
        .then((response) => {
          if (response.status !== 200) throw Error();
          return response.json();
        })
        .then((data: GHSearchRepositoryResponse) => {
          setRepositories(data.items);
          setCurrentSearchValue(searchValue);
          setCurrentPage(page);
          const totalExistingPages = Math.ceil(data.total_count / PAGE_SIZE);
          // Need to set a maximum of pages as we cannot get more than 1000 results from GH API
          setTotalPages(
            totalExistingPages > MAX_TOTAL_PAGES
              ? MAX_TOTAL_PAGES
              : totalExistingPages
          );
          setHasError(false);
        })
        .catch(() => {
          setRepositories(null);
          setCurrentSearchValue("");
          setCurrentPage(1);
          setTotalPages(1);
          setHasError(true);
        })
        .finally(() => setIsLoading(false));
      lastFetchTime.current = Date.now();
    }
  };

  return (
    <div className="App">
      <SearchBar fetchRepositories={fetchRepositories} />
      <RepositoryList
        repositories={repositories}
        currentSearchValue={currentSearchValue}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        hasError={hasError}
        fetchRepositories={fetchRepositories}
      />
    </div>
  );
};

export default App;
