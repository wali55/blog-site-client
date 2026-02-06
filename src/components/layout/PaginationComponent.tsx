"use client"

import { useRouter, useSearchParams } from "next/navigation";
import {
  PaginationContent,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const PaginationComponent = ({ meta }: {meta: PaginationProps}) => {
  const {page: currentPage, total, limit: pageSize, totalPages } = meta;
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    console.log(params);
  }
  return (
    <div className="mt-6 flex">
      <Pagination className="justify-end">
        <PaginationContent>
          <Button variant="ghost" disabled={currentPage === 1} className="cursor-pointer" onClick={() => navigateToPage(currentPage - 1)}>
            <ChevronLeftIcon   />
            Pervious
          </Button>
          <PaginationItem>
            <PaginationLink isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <Button variant="ghost" disabled={currentPage === totalPages} className="cursor-pointer" onClick={() => navigateToPage(currentPage + 1)}>
            Next
            <ChevronRightIcon  />
          </Button>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
