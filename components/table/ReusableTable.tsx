import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Column, FooterCell } from "@/app/(router)/(profile)/list-my-car/components/my-wallet/MyWallet";

interface ReusableTableProps {
    columns: Column[];
    data: Record<string, any>[];
    caption?: string;
    footer?: FooterCell[];
}

export const ReusableTable: React.FC<ReusableTableProps> = ({ columns, data, caption, footer }) => {
    return (
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.accessor} className={column.className}>
                            {column.label}
                        </TableHead>
                    ))}

                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((column) => (
                            <TableCell key={column.accessor} className={column.className}>
                                {row[column.accessor]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            {footer && (
                <TableFooter>
                    <TableRow>
                        {footer.map((cell, index) => (
                            <TableCell key={index} colSpan={cell.colSpan} className={cell.className}>
                                {cell.content}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableFooter>
            )}
        </Table>
    );
}
