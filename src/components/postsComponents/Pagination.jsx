import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageNumbers.push("...");
    }

    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {/* First page button */}
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-l-lg border border-gray-300 dark:border-gray-600 ${
              currentPage === 1
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            aria-label="Go to first page"
          >
            <HiOutlineChevronDoubleLeft className="w-4 h-4" />
          </button>
        </li>

        {/* Previous page button */}
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-600 ${
              currentPage === 1
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            aria-label="Go to previous page"
          >
            <HiChevronLeft className="w-4 h-4" />
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <li key={`ellipsis-${index}`}>
              <span className="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                ...
              </span>
            </li>
          ) : (
            <li key={`page-${page}`}>
              <button
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-600 ${
                  currentPage === page
                    ? "text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 border-blue-600 dark:border-blue-500 z-10"
                    : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Next page button */}
        <li>
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-600 ${
              currentPage === totalPages
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            aria-label="Go to next page"
          >
            <HiChevronRight className="w-4 h-4" />
          </button>
        </li>

        {/* Last page button */}
        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 me-0 leading-tight rounded-r-lg border border-gray-300 dark:border-gray-600 ${
              currentPage === totalPages
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            aria-label="Go to last page"
          >
            <HiOutlineChevronDoubleRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
