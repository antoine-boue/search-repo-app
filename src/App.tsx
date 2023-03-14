import { ChangeEvent, useState } from "react";
import "./App.css";
import RepositoryList from "./components/RepositoryList";
import SearchBar from "./components/SearchBar";
import { GHSearchRepositoryResponse, Repository } from "./types";

const App = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      if (query) {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${query}`
        );
        const data: GHSearchRepositoryResponse = await response.json();
        setRepositories(data.items);
      }
    } catch (error) {
      console.error(error);
      setRepositories([]);
    }
  };

  return (
    <div className="App">
      <SearchBar
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      <RepositoryList repositories={repositories} />
    </div>
  );
};

export default App;
