
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

type Props = {
    data: any[]
}

const PaginationCustom = ({ data }: Props) => {
    // Giả sử bạn muốn 3 bài viết trên mỗi trang
    const itemsPerPage = 6;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href={`#${index + 1}`}>{index + 1}</PaginationLink>
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
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationCustom;
