import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const createPageUrl = (page: number) => {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${page}`;
  };

  return (
    <div className="admin-pagination-bar">
      <div className="admin-pagination-info">
        Showing <strong>{startItem}</strong>–<strong>{endItem}</strong> of{" "}
        <strong>{totalItems}</strong> entries
      </div>

      <div className="admin-pagination-controls">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="admin-page-btn prev-next"
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} /> Prev
          </Link>
        ) : (
          <span className="admin-page-btn prev-next disabled">
            <ChevronLeft size={16} /> Prev
          </span>
        )}

        {/* Page numbers */}
        <div className="admin-page-numbers">
          {pages.map((p) => {
            const isCurrent = p === currentPage;
            return isCurrent ? (
              <span key={p} className="admin-page-btn active">
                {p}
              </span>
            ) : (
              <Link
                key={p}
                href={createPageUrl(p)}
                className="admin-page-btn"
              >
                {p}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="admin-page-btn prev-next"
            aria-label="Next Page"
          >
            Next <ChevronRight size={16} />
          </Link>
        ) : (
          <span className="admin-page-btn prev-next disabled">
            Next <ChevronRight size={16} />
          </span>
        )}
      </div>
    </div>
  );
}
