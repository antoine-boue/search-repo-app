import "./pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchRepositories: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currentPage, totalPages, setCurrentPage, fetchRepositories } = props;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchRepositories(newPage);
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
