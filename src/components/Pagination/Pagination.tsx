import "./pagination.css";

type PaginationProps = {
  currentQuery: string;
  currentPage: number;
  totalPages: number;
  fetchRepositories: (query: string, page: number) => void;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currentQuery, currentPage, totalPages, fetchRepositories } = props;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchRepositories(currentQuery, newPage);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        &laquo;
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
