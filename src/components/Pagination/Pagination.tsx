import "./pagination.css";

type PaginationProps = {
  currentSearchValue: string;
  currentPage: number;
  totalPages: number;
  fetchRepositories: (query: string, page: number) => void;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currentSearchValue, currentPage, totalPages, fetchRepositories } =
    props;

  const onPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchRepositories(currentSearchValue, newPage);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        &laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
