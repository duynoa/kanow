"use client"

import { FormatCurrency, FormatNumberHundred, FormatPointStar } from "@/components/format/FormatNumber"
import { ReusableTable } from "@/components/table/ReusableTable"
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import moment from "moment"
import { FaCar, FaStar } from "react-icons/fa"

import { ColumnDef } from "@tanstack/react-table";
import { ReusableTable2 } from "@/components/table/ReusableTable2"

type Props = {

}
// Define types for the props

export interface Column {
    label: string;
    accessor: string;
    className?: string;
}

export interface FooterCell {
    content: React.ReactNode;
    colSpan?: number;
    className?: string;
}

const MyWallet = (props: Props) => {
    const data = {
        startTime: 1717174800000,
        endTime: 1719766799999,
        openingBalance: 1191341,
        endingBalance: 1639341,
        transactionsFinished: [
            {
                amount: 105000,
                trip: {
                    id: "IRP63KLQ",
                    serviceType: 1,
                    timeBooked: 1716735209258,
                    timeEnded: 1717343966665,
                    tripDateFrom: 1717196400000,
                    tripDateTo: 1717336800000,
                    price: 1820000,
                    deposit: 709360,
                    payAfter: 1442000,
                    promotion: 120000,
                    fee: 273000,
                    travelerName: "Trần Minh Thành",
                    carName: "TOYOTA VELOZ CROSS 2022",
                    carLP: "51L-01035"
                },
                type: 1,
                timeCreated: 1717343966732
            },
            {
                amount: 90000,
                trip: {
                    id: "CGPY194D",
                    serviceType: 1,
                    timeBooked: 1716781742138,
                    timeEnded: 1717492797697,
                    tripDateFrom: 1717459200000,
                    tripDateTo: 1717506000000,
                    price: 860000,
                    deposit: 314860,
                    payAfter: 641000,
                    promotion: 120000,
                    fee: 129000,
                    travelerName: "Nguyễn Hữu Lộc",
                    carName: "TOYOTA VELOZ CROSS 2022",
                    carLP: "51L-01035"
                },
                type: 1,
                timeCreated: 1717492797728
            },
            {
                amount: 84000,
                trip: {
                    id: "61NE74MV",
                    serviceType: 1,
                    timeBooked: 1717642007351,
                    timeEnded: 1717686026013,
                    tripDateFrom: 1717646400000,
                    tripDateTo: 1717678800000,
                    price: 860000,
                    deposit: 317460,
                    payAfter: 647000,
                    promotion: 120000,
                    fee: 129000,
                    travelerName: "Ngô Hải Khôi",
                    carName: "TOYOTA VELOZ CROSS 2022",
                    carLP: "51L-01035"
                },
                type: 1,
                timeCreated: 1717686026047
            },
            {
                amount: 84500,
                trip: {
                    id: "JDNXBZB1",
                    serviceType: 1,
                    timeBooked: 1717692707193,
                    timeEnded: 1717766396877,
                    tripDateFrom: 1717768800000,
                    tripDateTo: 1717851600000,
                    price: 910000,
                    deposit: 338510,
                    payAfter: 689000,
                    promotion: 120000,
                    fee: 136500,
                    travelerName: "Bibeo",
                    carName: "TOYOTA VELOZ CROSS 2022",
                    carLP: "51L-01035"
                },
                type: 1,
                timeCreated: 1717766396983
            },
            {
                amount: 84500,
                trip: {
                    id: "BYZP925B",
                    serviceType: 1,
                    timeBooked: 1717847020359,
                    timeEnded: 1717941654544,
                    tripDateFrom: 1717855200000,
                    tripDateTo: 1717938000000,
                    price: 910000,
                    deposit: 338510,
                    payAfter: 689000,
                    promotion: 120000,
                    fee: 136500,
                    travelerName: "Phạm văn tiến",
                    carName: "TOYOTA VELOZ CROSS 2022",
                    carLP: "51L-01035"
                },
                type: 1,
                timeCreated: 1717941654622
            }
        ],
        totalTripFinished: 5,
        rating: 5,
        responseRate: "100%",
        responseTime: "5 phút",
        acceptRate: "100%",
        timeRequested: 1717770632017,
        amount: 1554841,
        bankName: "Vietcombank",
        bankProvince: "",
        bankBranch: ""
    }

    // Define columns and data for the demo table
    const columns: Column[] = [
        {
            label: "Mã chuyến đi",
            accessor: "codeTrip",
            className: "w-[120px] max-w-[120px] text-center"
        },
        {
            label: "Hình thức",
            accessor: "carType",
            className: "text-center"
        },
        {
            label: "Ngày đi",
            accessor: "dateStart",
            className: "text-center"
        },
        {
            label: "Ngày về",
            accessor: "dateEnd",
            className: "text-center"
        },
        {
            label: "Đơn giá thuê",
            accessor: "rentalPrice",
            className: "w-[120px] max-w-[120px] text-center"
        },
        {
            label: "Doanh thu chủ xe",
            accessor: "ownerRevenue",
            className: "text-center"
        },
        {
            label: "Tiền đã nhận",
            accessor: "receivedPrice",
            className: "text-center"
        },
        {
            label: "Thay đổi số dư",
            accessor: "balanceChange",
            className: "text-center"
        },
    ];

    const columnsDataCustom: ColumnDef<any>[] = [
        {
            id: "codeTrip",
            header: () => <div className='w-[120px] max-w-[120px] text-center'>Mã chuyến đi</div>,
            // cell: ({ row }) => <div className={"row"}>{row.index + 1}</div>,
            cell: ({ row }) => {
                let codeTrip = row?.getValue("codeTrip");
                console.log('codeTrip: ', codeTrip);


                if (codeTrip) {
                    return (
                        <div className="flex gap-2 items-center">
                            <div className="capitalize 3xl:text-base text-sm">{row.getValue("codeTrip")}</div>
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
    ];

    // Function to convert data
    const convertData = (transactions: any[]): any[] => {
        return transactions.map((transaction) => ({

            codeTrip: transaction.trip.id,
            carType: transaction.trip.serviceType === 1 ? "Xe tự lái" : "Xe có tài",
            dateStart: moment(transaction.trip.tripDateFrom).format("DD/MM/YYYY"),
            dateEnd: moment(transaction.trip.tripDateTo).format("DD/MM/YYYY"),
            rentalPrice: `$${(transaction.trip.price / 100).toFixed(2)}`,
            ownerRevenue: `$${((transaction.trip.price - transaction.trip.fee) / 100).toFixed(2)}`,
            receivedPrice: `$${(transaction.amount / 100).toFixed(2)}`,
            balanceChange: `$${(transaction.trip.payAfter / 100).toFixed(2)}`,
        }));

    };

    const convertDataCustom = convertData(data.transactionsFinished);

    console.log('convertDataCustom', convertDataCustom);


    return (
        <>
            <div className='flex flex-col gap-10 pt-6'>
                <div className='3xl:text-4xl text-3xl w-full text-center font-bold'>
                    Ví của tôi
                </div>

                <div className='flex items-center justify-between w-full bg-[#F1FCFC] px-6 py-3'>
                    <div className='3xl:text-lg text-base uppercase font-semibold text-[#2FB9BD]'>
                        Bảng tổng hợp giao dịch
                    </div>

                    <div className='text-[#2FB9BD]'>
                        Select
                    </div>
                </div>

                <div className="flex items-center gap-2 ">
                    <div className='3xl:text-lg text-base'>
                        Số dư hiện tại:
                    </div>
                    <div className='3xl:text-3xl text-2xl font-bold text-[#2FB9BD]'>
                        {FormatCurrency(3287482)}
                    </div>
                </div>

                <div className='mx-20 grid grid-cols-8'>
                    <div className='col-span-2 flex flex-col items-center gap-1 border-r-2 px-6'>
                        <div className='flex items-center gap-2'>
                            <FaStar className='3xl:text-lg text-base text-[#FF9900]' />
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.rating ? (FormatPointStar(data.rating, 1)) : 0}
                            </div>
                        </div>
                        <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                            Đánh giá
                        </div>
                    </div>

                    <div className='col-span-2 flex flex-col items-center gap-1 border-r-2 px-6'>
                        <div className='flex items-center gap-2'>
                            <FaCar className='3xl:text-lg text-base text-[#2FB9BD]' />
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.totalTripFinished ? data.totalTripFinished : 0}
                            </div>
                        </div>
                        <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                            Chuyến đi thành công
                        </div>
                    </div>

                    <div className='col-span-4 grid grid-cols-3 gap-2 px-6'>
                        <div className='col-span-1 bg-[#F6F6F6] flex flex-col items-center gap-1 px-2 py-1 rounded-md'>
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.responseRate ? data.responseRate : 0}
                            </div>
                            <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                                Tỉ lệ phản hồi
                            </div>
                        </div>
                        <div className='col-span-1 bg-[#F6F6F6] flex flex-col items-center gap-1 px-2 py-1 rounded-md'>
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.responseTime ? data.responseTime : 0}
                            </div>
                            <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                                Thời gian phản hồi
                            </div>
                        </div>
                        <div className='col-span-1 bg-[#F6F6F6] flex flex-col items-center gap-1 px-2 py-1 rounded-md'>
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.acceptRate ? data.acceptRate : 0}
                            </div>
                            <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                                Tỉ lệ đồng ý
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {/* <ReusableTable
                        columns={columns}
                        data={columnsDataCustom}
                        // data={convertDataCustom}
                        caption="A list of your recent invoices."
                    /> */}
                    <ReusableTable2
                        data={convertDataCustom}
                        columns={columnsDataCustom}
                    />
                </div>
            </div>
            {/* <UnderDevelopment /> */}
        </>

    )
}

export default MyWallet