export const getButtonClassName = (
  isDisabled: boolean,
  isCurrentPage = false
) => {
  const baseClasses =
    "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-600";

  if (isDisabled) {
    return `${baseClasses} text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-100 dark:bg-gray-800`;
  }

  if (isCurrentPage) {
    return `${baseClasses} text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 border-blue-600 dark:border-blue-500 z-10`;
  }

  return `${baseClasses} text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700`;
};

export const generatePageNumbers = (
  currentPage: number,
  totalPages: number
): (number | "...")[] => {
  const pageNumbers: (number | "...")[] = [1];
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  if (startPage > 2) pageNumbers.push("...");

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages - 1) pageNumbers.push("...");
  if (totalPages > 1) pageNumbers.push(totalPages);

  return pageNumbers;
};
