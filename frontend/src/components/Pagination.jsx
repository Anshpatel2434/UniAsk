const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    let startPage, endPage;
    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center mt-4 space-x-1 sm:space-x-2 text-sm sm:text-base">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1 rounded bg-[#1d1b31] text-gray-400 hover:bg-[#2e2c4e] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-2 sm:px-3 py-1 rounded bg-[#1d1b31] text-gray-400 hover:bg-[#2e2c4e]"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 sm:px-3 py-1 text-gray-400">...</span>
            )}
          </>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-2 sm:px-3 py-1 rounded ${
              currentPage === number
                ? "bg-[#4e4b73] text-white"
                : "bg-[#1d1b31] text-gray-400 hover:bg-[#2e2c4e]"
            }`}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 sm:px-3 py-1 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-2 sm:px-3 py-1 rounded bg-[#1d1b31] text-gray-400 hover:bg-[#2e2c4e]"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-1 rounded bg-[#1d1b31] text-gray-400 hover:bg-[#2e2c4e] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    );
  };
export default Pagination;