import "./RepositoryList.css";
import { Repository } from "../../types";
import Pagination from "../Pagination/Pagination";

type RepositoryListProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  repositories: Repository[];
  hasError: boolean;
  fetchRepositories: (page: number) => void;
};

const RepositoryList: React.FC<RepositoryListProps> = (props) => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    repositories,
    hasError,
    fetchRepositories,
  } = props;

  if (hasError) {
    return <p className="error">An error happened, please try again soon</p>;
  }
  if (!repositories.length) {
    return null;
  }

  return (
    <div className="repository-list">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        fetchRepositories={fetchRepositories}
      />
      <div className="repository-list__header">
        <p className="repository-list__name">Name</p>
        <p className="repository-list__owner">Owner</p>
        <p className="repository-list__description">Description</p>
      </div>
      {repositories.map((repository) => (
        <a
          key={repository.id}
          className="repository-list__item"
          href={repository.html_url}
          target="_blank"
        >
          <p className="repository-list__name">{repository.name}</p>
          <p className="repository-list__owner">{repository.owner.login}</p>
          <p className="repository-list__description">
            {repository.description}
          </p>
        </a>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        fetchRepositories={fetchRepositories}
      />
    </div>
  );
};

export default RepositoryList;
