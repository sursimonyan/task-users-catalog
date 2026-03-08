import cn from "classnames";
import styles from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  limit: number;
  skip: number;
  onPageChange: (skip: number) => void;
}

export const Pagination = ({ total, limit, skip, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(skip - limit);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(skip + limit);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange((page - 1) * limit);
  };

  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Always show first page and ellipsis if far from start
    if (startPage > 1) {
      pages.push(
        <button key={1} className={cn(styles.pageButton)} onClick={() => handlePageClick(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis-start" className={styles.ellipsis}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={cn(styles.pageButton, { [styles.active]: currentPage === i })}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    // Always show last page and ellipsis if far from end
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis-end" className={styles.ellipsis}>...</span>);
      }
      pages.push(
        <button key={totalPages} className={cn(styles.pageButton)} onClick={() => handlePageClick(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={cn(styles.pagination)}>
      <button
        className={cn(styles.pageButton, styles.navButton)}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      
      <div className={cn(styles.pageNumbers)}>
        {renderPages()}
      </div>

      <button
        className={cn(styles.pageButton, styles.navButton)}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
