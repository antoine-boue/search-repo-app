import "./RepositoryList.css";
import { Repository } from "../../types";
import Pagination from "../Pagination/Pagination";

type RepositoryListProps = {
  repositories: Repository[] | null;
  currentQuery: string;
  currentPage: number;
  totalPages: number;
  hasError: boolean;
  fetchRepositories: (query: string, page: number) => void;
};

const RepositoryList: React.FC<RepositoryListProps> = (props) => {
  const {
    currentQuery,
    currentPage,
    totalPages,
    repositories,
    hasError,
    fetchRepositories,
  } = props;

  if (hasError) {
    return <p className="error">An error happened, please try again soon</p>;
  }
  if (!repositories) {
    return null;
  }
  if (!repositories.length) {
    return <p>No results for your input, please try something else</p>;
  }

  const pagination = () => (
    <Pagination
      currentQuery={currentQuery}
      currentPage={currentPage}
      totalPages={totalPages}
      fetchRepositories={fetchRepositories}
    />
  );

  return (
    <div className="repository-list">
      {pagination()}
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
      {pagination()}
    </div>
  );
};

export default RepositoryList;
