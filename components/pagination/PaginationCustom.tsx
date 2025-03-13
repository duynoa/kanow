import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";

type Props = {
    data?: any[]
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
    };

    // const renderPagination = () => {
    //     const pages: JSX.Element[] = [];

    //     // Hiển thị các trang đầu tiên (1, 2, 3)
    //     for (let i = 1; i <= Math.min(3, totalPages); i++) {
    //         pages.push(
    //             <PaginationItem key={i}>
    //                 <div
    //                     className={`${i === current_page
    //                         ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
    //                         : "hover:bg-[#000000]/10"
    //                         } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
    //                     onClick={(e) => handlePageChange(e, i)}
    //                 >
    //                     {i}
    //                 </div>
    //             </PaginationItem>
    //         );
    //     }

    //     // Hiển thị dấu "..." nếu current_page > 4
    //     if (current_page > 4) {
    //         pages.push(
    //             <PaginationItem key="start-ellipsis">
    //                 <PaginationEllipsis />
    //             </PaginationItem>
    //         );
    //     }

    //     // Hiển thị các trang xung quanh current_page
    //     const startPage = Math.max(4, current_page - 1); // Bắt đầu từ 4 hoặc current_page - 1
    //     const endPage = Math.min(totalPages, current_page + 1); // Tới current_page + 1 hoặc tổng số trang

    //     for (let i = startPage; i <= endPage; i++) {
    //         pages.push(
    //             <PaginationItem key={i}>
    //                 <div
    //                     className={`${i === current_page
    //                         ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
    //                         : "hover:bg-[#000000]/10"
    //                         } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
    //                     onClick={(e) => handlePageChange(e, i)}
    //                 >
    //                     {i}
    //                 </div>
    //             </PaginationItem>
    //         );
    //     }

    //     // Hiển thị dấu "..." nếu còn trang sau current_page
    //     if (current_page < totalPages - 2) {
    //         pages.push(
    //             <PaginationItem key="end-ellipsis">
    //                 <PaginationEllipsis />
    //             </PaginationItem>
    //         );
    //     }

    //     // Hiển thị các trang cuối cùng (nếu có)
    //     for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
    //         if (i > current_page + 1) { // Đảm bảo không hiển thị trùng lặp
    //             pages.push(
    //                 <PaginationItem key={i}>
    //                     <div
    //                         className={`${i === current_page
    //                             ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
    //                             : "hover:bg-[#000000]/10"
    //                             } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
    //                         onClick={(e) => handlePageChange(e, i)}
    //                     >
    //                         {i}
    //                     </div>
    //                 </PaginationItem>
    //             );
    //         }
    //     }

    //     return pages;
    // };


    const renderPagination = () => {
        const pages: JSX.Element[] = [];

        // Nếu tổng số trang <= 6, hiển thị tất cả các trang và không hiển thị dấu "..."
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <div
                            className={`${i === current_page
                                ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
                                : "hover:bg-[#000000]/10"
                                } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
                            onClick={(e) => handlePageChange(e, i)}
                        >
                            {i}
                        </div>
                    </PaginationItem>
                );
            }
            return pages;
        }

        // Nếu current_page <= 3, hiển thị: 1 2 3 ... 5 6 7
        if (current_page <= 3) {
            for (let i = 1; i <= 3; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <div
                            className={`${i === current_page
                                ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
                                : "hover:bg-[#000000]/10"
                                } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
                            onClick={(e) => handlePageChange(e, i)}
                        >
                            {i}
                        </div>
                    </PaginationItem>
                );
            }

            pages.push(
                <PaginationItem key="ellipsis-1">
                    <PaginationEllipsis />
                </PaginationItem>
            );

            for (let i = totalPages - 2; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <div
                            className={`${i === current_page
                                ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
                                : "hover:bg-[#000000]/10"
                                } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
                            onClick={(e) => handlePageChange(e, i)}
                        >
                            {i}
                        </div>
                    </PaginationItem>
                );
            }

            return pages;
        }

        // Nếu current_page > 3, hiển thị: 1 2 3 ... cuối cùng
        for (let i = 1; i <= 3; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <div
                        className={`${i === current_page
                            ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
                            : "hover:bg-[#000000]/10"
                            } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
                        onClick={(e) => handlePageChange(e, i)}
                    >
                        {i}
                    </div>
                </PaginationItem>
            );
        }

        pages.push(
            <PaginationItem key="ellipsis-2">
                <PaginationEllipsis />
            </PaginationItem>
        );

        for (let i = totalPages - 2; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <div
                        className={`${i === current_page
                            ? "bg-[#1EAAB1] text-white hover:bg-[#1EAAB1]/80 hover:text-white"
                            : "hover:bg-[#000000]/10"
                            } size-10 flex justify-center items-center duration-300 transition rounded-lg cursor-pointer`}
                        onClick={(e) => handlePageChange(e, i)}
                    >
                        {i}
                    </div>
                </PaginationItem>
            );
        }

        return pages;
    };


    return (
        <Pagination>
            <PaginationContent className='list-none'>
                <PaginationItem>
                    <div
                        className={`${current_page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                            } size-10 hover:bg-[#000000]/10 flex justify-center items-center duration-300 transition rounded-lg`}
                        onClick={(e) => handlePageChange(e, Math.max(current_page - 1, 1))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </div>
                </PaginationItem>

                {renderPagination()}

                <PaginationItem>
                    <div
                        className={`${current_page === totalPages ? "cursor-not-allowed" : "cursor-pointer"
                            } size-10 hover:bg-[#000000]/10 flex justify-center items-center duration-300 transition rounded-lg`}
                        onClick={(e) => handlePageChange(e, Math.min(current_page + 1, totalPages))}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </div>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationCustom;
