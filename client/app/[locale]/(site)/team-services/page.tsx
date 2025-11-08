/* eslint-disable max-lines */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TeamService {
  id: number;
  documentId: string;
  Title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface StrapiResponse {
  data: TeamService[];
  meta: Meta;
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    onPageChange(validPage);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
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
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center space-x-1">
        <button
          aria-label="First page"
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(1)}
        >
          «
        </button>

        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ‹
        </button>

        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            disabled={pageNum === "..." || pageNum === currentPage}
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
          >
            {pageNum}
          </button>
        ))}

        <button
          aria-label="Next page"
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ›
        </button>

        <button
          aria-label="Last page"
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          »
        </button>
      </div>
    </div>
  );
};

const getTeamServices = async (
  page: number = 1,
  pageSize: number = 2
): Promise<StrapiResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team-services?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const error = data?.error;

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching team services:", error);
      return {
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: 2,
            pageCount: 1,
            total: 0,
          },
        },
      };
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching team services:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 2,
          pageCount: 1,
          total: 0,
        },
      },
    };
  }
};

const TeamServicesPage = () => {
  const [teamServices, setTeamServices] = useState<TeamService[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 2,
    pageCount: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize currentPage from URL only once
  const [currentPage, setCurrentPage] = useState(1);

  const validatedPage = Math.max(
    1,
    Math.min(currentPage, pagination.pageCount || 1)
  );

  useEffect(() => {
    const fetchTeamServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getTeamServices(validatedPage, 2);

        setTeamServices(response.data);
        setPagination(response.meta.pagination);
      } catch (err) {
        setError("Failed to fetch team services");
        // eslint-disable-next-line no-console
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamServices();
    // Only depend on validatedPage and locale - removed urlSearchParams
  }, [validatedPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
              href="/"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Team Services</h1>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">Loading team services...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
              href="/"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Team Services</h1>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            href="/"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Team Services</h1>
        </div>
        {teamServices.length > 0 ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Team Services</h2>
            <div className="space-y-4">
              {teamServices.map((service) => (
                <div key={service.id} className="border-b pb-4 last:border-b-0">
                  <p className="text-gray-700">
                    <span className="font-medium">Title:</span> {service.Title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">ID:</span> {service.id}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">Published:</span>{" "}
                    {new Date(service.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <p className="text-gray-500 text-center">No team services found.</p>
          </div>
        )}

        <div className="mb-4 text-sm text-gray-600">
          Showing page {validatedPage} of {pagination.pageCount} •{" "}
          {pagination.total} total items
        </div>

        {/* Pagination */}
        {pagination.pageCount > 1 && (
          <PaginationControls
            currentPage={validatedPage}
            totalPages={pagination.pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default TeamServicesPage;
