import { useState } from "react";
import { Repository } from "../types";

type RepositoryListProps = {
  repositories: Repository[];
};

const RepositoryList: React.FC<RepositoryListProps> = (props) => {
  const { repositories } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const repositoriesPerPage = 10;
  const totalPages = Math.ceil(repositories.length / repositoriesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = (currentPage - 1) * repositoriesPerPage;
  const endPage = startPage + repositoriesPerPage;
  const currentPageRepositories = repositories.slice(startPage, endPage);

  return (
    <div className="repository-list">
      <div className="repository-list__header">
        <p className="repository-list__name">Name</p>
        <p className="repository-list__owner">Owner</p>
        <p className="repository-list__description">Description</p>
      </div>
      {currentPageRepositories.map((repository) => (
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
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            disabled={currentPage === number}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;
