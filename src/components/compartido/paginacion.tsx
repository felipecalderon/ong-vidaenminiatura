"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from "@/components/ui/pagination";

interface PaginacionProps {
  currentPage: number;
  totalPages: number;
}

export function Paginacion({ currentPage, totalPages }: PaginacionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push("ellipsis-1");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-2");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <UIPagination className="my-8">
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <Link href={createPageUrl(currentPage - 1)} passHref legacyBehavior>
              <PaginationPrevious />
            </Link>
          ) : (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>

        {pages.map((page, index) => {
          if (typeof page === "string") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <Link href={createPageUrl(page)} passHref legacyBehavior>
                <PaginationLink isActive={isActive}>{page}</PaginationLink>
              </Link>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          {currentPage < totalPages ? (
            <Link href={createPageUrl(currentPage + 1)} passHref legacyBehavior>
              <PaginationNext />
            </Link>
          ) : (
            <PaginationNext className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
