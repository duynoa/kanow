"use client";

import React, { useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
    title?: string;
    type?: string;
    data: any[];
    isState?: any;
    columns: ColumnDef<any>[];
};

export function ReusableTable2({
    title,
    type,
    data,
    columns,
}: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        defaultColumn: {
            size: 200, //starting column size
            minSize: 10, //enforced during column resizing
            maxSize: 500, //enforced during column resizing
        },
        columnResizeMode: "onChange",
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <Table>
            <TableHeader>
                {
                    table?.getHeaderGroups()?.map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-[#F9FAFB]">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="text-[#000000]/65">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    table?.getRowModel()?.rows?.length ?
                        (
                            table?.getRowModel()?.rows?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row?.getIsSelected() && "selected"}
                                >
                                    {
                                        row?.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                width={cell.column.getSize()} // giúp để chỉnh size của cột
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        )
                        :
                        (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Không có sản phẩm...
                                </TableCell>
                            </TableRow>
                        )
                }
            </TableBody>
        </Table>
    );
}
