import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import { Button } from "../../UI/Button";
import {
  generatePageNumbers,
  getButtonClassName,
} from "../../utils/pagination";

type PageChange = (page: number) => void;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: PageChange;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {/* First page button */}
        <li>
          <Button
            onClick={() => currentPage > 1 && onPageChange(1)}
            disabled={currentPage === 1}
            className={`${getButtonClassName(currentPage === 1)} rounded-l-lg`}
            ariaLabel="Go to first page"
          >
            <HiOutlineChevronDoubleLeft className="w-4 h-4" />
          </Button>
        </li>

        {/* Previous page button */}
        <li>
          <Button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={getButtonClassName(currentPage === 1)}
            ariaLabel="Go to previous page"
          >
            <HiChevronLeft className="w-4 h-4" />
          </Button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <li key={`ellipsis-${index}`}>
              <span className={`${getButtonClassName(true)} cursor-default`}>
                ...
              </span>
            </li>
          ) : (
            <li key={`page-${page}`}>
              <Button
                onClick={() => onPageChange(page as number)}
                className={getButtonClassName(false, currentPage === page)}
                ariaLabel={`Go to page ${page}`}
              >
                {page}
              </Button>
            </li>
          )
        )}

        {/* Next page button */}
        <li>
          <Button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={getButtonClassName(currentPage === totalPages)}
            ariaLabel="Go to next page"
          >
            <HiChevronRight className="w-4 h-4" />
          </Button>
        </li>

        {/* Last page button */}
        <li>
          <Button
            onClick={() => currentPage < totalPages && onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`${getButtonClassName(
              currentPage === totalPages
            )} rounded-r-lg`}
            ariaLabel="Go to last page"
          >
            <HiOutlineChevronDoubleRight className="w-4 h-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
