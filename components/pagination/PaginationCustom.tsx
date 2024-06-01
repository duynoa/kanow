
import { v4 as uuidv4 } from 'uuid';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
    data: any[]
    current_page: number,
    limit: number,
    total: number,
    handleChangePage?: (page: number) => void
}

const PaginationCustom = ({ data, current_page, limit, total, handleChangePage }: Props) => {
    // Giả sử bạn muốn 3 bài viết trên mỗi trang
    const itemsPerPage = limit;
    const totalPages = Math.ceil(total / itemsPerPage);

    const handlePageChangeComponent = (event: React.MouseEvent, page: number) => {
        event.preventDefault();
        if (handleChangePage) {
            handleChangePage(page);
        }
    }

    console.log('current_page', current_page);


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {/* <PaginationPrevious /> */}
                    <div
                        className={`${Math.max(current_page - 1, 1) == current_page ? "cursor-not-allowed" : "cursor-pointer"} size-10 hover:bg-[#000000]/10 flex justify-center items-center duration-300 transition rounded-lg `}
                        onClick={(e) => handlePageChangeComponent(e, Math.max(current_page - 1, 1))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </div>
                </PaginationItem>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <div
                                // href={`?current_page=${index + 1}`}
                                className={`${index + 1 === current_page ? 'bg-[#1EAAB1] text-white hover:bg-[#1EaAB1]/80 hover:text-white' : 'hover:bg-[#000000]/10'} size-10  flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
                                onClick={(e) => handlePageChangeComponent(e, index + 1)}
                            >
                                {index + 1}
                            </div>
                        </PaginationItem>
                    ))
                }
                {
                    totalPages > 5 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )
                }
                <PaginationItem>
                    {/* <PaginationNext href={`?current_page=${Math.min(current_page + 1, totalPages)}`} /> */}
                    <div
                        className={`${Math.min(current_page + 1, totalPages) == current_page ? "cursor-not-allowed" : "cursor-pointer"} size-10 hover:bg-[#000000]/10 flex justify-center items-center duration-300 transition rounded-lg`}
                        onClick={(e) => handlePageChangeComponent(e, Math.min(current_page + 1, totalPages))}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </div>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationCustom;
