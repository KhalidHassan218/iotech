"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  locale: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  locale,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    // Ensure page is within valid range
    const validPage = Math.max(1, Math.min(page, totalPages));

    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams.toString());

    if (validPage === 1) {
      // Remove page param if it's the first page
      params.delete("page");
    } else {
      params.set("page", validPage.toString());
    }

    // Build the new URL
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(newUrl);
  };

  // Generate page numbers to display (with ellipsis for many pages)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      {/* Page Info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* First Page Button */}
        <button
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(1)}
          aria-label="First page"
        >
          «
        </button>

        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded transition-colors min-w-[40px] ${
              pageNum === currentPage
                ? "bg-blue-600 text-white"
                : pageNum === "..."
                  ? "text-gray-400 cursor-default"
                  : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() =>
              typeof pageNum === "number" && handlePageChange(pageNum)
            }
            disabled={pageNum === "..." || pageNum === currentPage}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Next page"
        >
          ›
        </button>

        {/* Last Page Button */}
        <button
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(totalPages)}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
}
