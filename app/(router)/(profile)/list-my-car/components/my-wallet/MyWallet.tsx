"use client"

import { FormatCurrency, FormatNumberDot, FormatNumberHundred, FormatPointStar } from "@/components/format/FormatNumber"
import { ReusableTable } from "@/components/table/ReusableTable"
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import moment from "moment"
import { FaCar, FaStar } from "react-icons/fa"

import { ColumnDef } from "@tanstack/react-table";
import { ReusableTable2 } from "@/components/table/ReusableTable2"
import { Button } from "@/components/ui/button"

import { motion } from "framer-motion";
import SelectCustom from "@/components/select/SelectCustom"
import { uuidv4 } from "@/lib/uuid"
import { useEffect, useState } from "react"
import { useDialogPayment } from "@/hooks/useOpenDialog"
import Link from "next/link"
import { useDataMyWallet } from "@/hooks/useDataQueryKey"
import { getListSyntheticTransaction } from "@/services/cars/historyPayment.services"

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
    const [dataMonths, setDataMonths] = useState<{ id: number; date: string }[]>([]);

    const {
        setOpenDialogPayment,
        setTypeModal
    } = useDialogPayment()

    const { isStateMyWallet, queryKeyIsStateMyWallet } = useDataMyWallet()

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

    // const dataMonths = [
    //     {
    //         id: 1,
    //         date: "06-2024"
    //     },
    //     {
    //         id: 2,
    //         date: "05-2024"
    //     },
    //     {
    //         id: 3,
    //         date: "04-2024"
    //     },
    //     {
    //         id: 4,
    //         date: "03-2024"
    //     },
    //     {
    //         id: 5,
    //         date: "02-2024"
    //     },
    //     {
    //         id: 6,
    //         date: "01-2024"
    //     },
    //     {
    //         id: 7,
    //         date: "12-2023"
    //     },
    //     {
    //         id: 8,
    //         date: "11-2023"
    //     },
    //     {
    //         id: 9,
    //         date: "10-2023"
    //     },
    //     {
    //         id: 10,
    //         date: "09-2023"
    //     },
    //     {
    //         id: 11,
    //         date: "08-2023"
    //     }
    // ]

    useEffect(() => {
        const currentDate = new Date(); // Lấy ngày hiện tại
        const monthsToFetch = 12; // Số tháng cần lấy từ tháng hiện tại lùi về

        const newDataMonths = [];

        // Lặp từ tháng hiện tại lùi về monthsToFetch tháng
        for (let i = 0; i < monthsToFetch; i++) {
            const date = new Date();
            date.setMonth(currentDate.getMonth() - i);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            const formattedDate = `${month.toString().padStart(2, '0')}_${year}`;

            newDataMonths.push({
                id: i + 1,
                date: formattedDate,
            });
        }

        // Cập nhật state dataMonths
        setDataMonths(newDataMonths);

        queryKeyIsStateMyWallet({
            selectedMonth: newDataMonths[0].date,
        })
    }, []);

    useEffect(() => {
        if (isStateMyWallet.selectedMonth !== "") {
            const fetchListSyntheticTransaction = async () => {
                const dataParams = {
                    month_search: isStateMyWallet.selectedMonth
                }
                const { data } = await getListSyntheticTransaction(dataParams)

                console.log('data ví của tôi: ', data);
                if (data) {
                    queryKeyIsStateMyWallet({
                        listSyntheticTransaction: data,
                    })
                }
            }

            fetchListSyntheticTransaction()
        }
    }, [isStateMyWallet.selectedMonth])

    // Function to convert data
    const convertData = (transactions: any[]) => {
        console.log('transactions', transactions);

        return transactions?.map((transaction) => ({
            idCar: transaction.id,
            type: transaction.type,
            codeTrip: transaction.reference_no,
            carType: transaction.type === 1 ? "Xe tự lái" : "Xe có tài",
            dateStart: moment(transaction.date_start).format("DD/MM/YYYY"),
            dateEnd: moment(transaction.date_end).format("DD/MM/YYYY"),
            rentalPrice: `${FormatNumberDot(transaction.cost.amount)}đ`,
            ownerRevenue: `${FormatNumberDot(transaction.cost.revenue_customer)}đ`,
            receivedPrice: `${FormatNumberDot(transaction.cost.payment_customer)}đ`,
            balanceChange: `${FormatNumberDot(transaction.cost.account_balance)}đ`,
        }));

    };

    const convertDataCustom = convertData(isStateMyWallet?.listSyntheticTransaction?.transactionFinish?.data ? isStateMyWallet?.listSyntheticTransaction?.transactionFinish?.data : []);

    const columnsDataCustom: ColumnDef<any>[] = [
        {
            id: "codeTrip",
            header: () => <div className='flex items-center justify-center w-full h-full text-center '>Mã chuyến đi</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let codeTrip = row?.original?.codeTrip;
                let idCar = row?.original?.idCar;
                let type = row?.original?.type;
                console.log('row: ', row);

                if (codeTrip) {
                    return (
                        <Link
                            href={`/info-rental-car/${idCar}?type=${type}`}
                            className="3xl:text-sm text-[13px] text-[#2FB9BD] cursor-pointer transition duration-300 w-full text-center"
                        >
                            {codeTrip ? codeTrip : ""}
                        </Link>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "carType",
            header: () => <div className='flex items-center justify-center w-full h-full text-center'>Hình thức</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let carType = row?.original?.carType;

                if (carType) {
                    return (
                        <div className=" 3xl:text-sm text-[13px] w-full text-center">
                            {carType}
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "dateStart",
            header: () => <div className='flex items-center justify-center w-full h-full text-center'>Ngày đi</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let dateStart = row?.original?.dateStart;

                if (dateStart) {
                    return (
                        <div className="  3xl:text-sm text-[13px] transition duration-300 w-full text-center">
                            {dateStart}
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "dateEnd",
            header: () => <div className='flex items-center justify-center w-full h-full text-center'>Ngày về</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let dateEnd = row?.original?.dateEnd;

                if (dateEnd) {
                    return (
                        <div className="  3xl:text-sm text-[13px] transition duration-300 w-full text-center">
                            {dateEnd}
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "rentalPrice",
            header: () => <div className='flex items-center justify-center w-full h-full text-center'>Đơn giá thuê</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let rentalPrice = row?.original?.rentalPrice;

                if (rentalPrice) {
                    return (
                        <div className="  3xl:text-sm text-[13px] transition duration-300 w-full text-center">
                            {rentalPrice}
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "ownerRevenue",
            header: () => <div className='flex items-center justify-center w-full h-full text-center'>Doanh thu chủ xe</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let ownerRevenue = row?.original?.ownerRevenue;

                if (ownerRevenue) {
                    return (
                        <div className="  3xl:text-sm text-[13px] transition duration-300 w-full text-center">
                            {ownerRevenue}
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "receivedPrice",
            header: () => <div className='flex items-center justify-center w-full h-full text-center'>Tiền đã nhận</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let receivedPrice = row?.original?.receivedPrice;

                if (receivedPrice) {
                    return (
                        <div className="  3xl:text-sm text-[13px] transition duration-300 w-full text-center">
                            {receivedPrice}
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "balanceChange",
            header: () => <div className='flex items-center justify-center w-full h-full text-center'>Thay đổi số dư</div>,
            cell: ({ row }) => {
                // let codeTrip = row?.getValue("codeTrip");
                let balanceChange = row?.original?.balanceChange;

                if (balanceChange) {
                    return (
                        <div className="  3xl:text-sm text-[13px] transition duration-300 w-full text-center">
                            {balanceChange}
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            enableHiding: false,
        },
    ];

    const handleRequestPayment = () => {
        setOpenDialogPayment(true)
        setTypeModal("selected_method")
    }

    const handleChangeValue = (values: any) => {
        queryKeyIsStateMyWallet({
            selectedMonth: values
        })
    }

    return (
        <>
            <div className='flex flex-col 3xl:gap-10 gap-6 3xl:pt-6 pt-4'>
                <div className='3xl:text-4xl text-3xl w-full text-center font-bold'>
                    Ví của tôi
                </div>

                <div className='flex items-center justify-between w-full bg-[#F1FCFC] rounded-lg 3xl:px-6 3xl:py-3 px-4 py-2'>
                    <div className='3xl:text-lg text-base uppercase font-semibold text-[#2FB9BD]'>
                        Bảng tổng hợp giao dịch
                    </div>
                    <SelectCustom
                        dataMonths={dataMonths}
                        selectedMonth={isStateMyWallet.selectedMonth}
                        handleChangeValue={handleChangeValue}
                    />
                </div>

                <div className="flex items-center gap-2 ">
                    <div className='3xl:text-lg text-base'>
                        Số dư hiện tại:
                    </div>
                    <div className='3xl:text-3xl text-2xl font-bold text-[#2FB9BD]'>
                        {FormatCurrency(isStateMyWallet?.listSyntheticTransaction?.balance ? isStateMyWallet?.listSyntheticTransaction?.balance : 0)}
                    </div>
                </div>

                <div className='3xl:mx-20 xl:mx-14 grid 3xl:grid-cols-8 grid-cols-10 md:gap-0 gap-4'>
                    <div className='md:col-span-2 col-span-5 flex flex-col items-center gap-1 border-r-2 xl:px-6 px-4'>
                        <div className='flex items-center gap-2'>
                            <FaStar className='3xl:text-lg text-base text-[#FF9900]' />
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {isStateMyWallet?.listSyntheticTransaction?.infoTrip?.star_avg ? (FormatPointStar(isStateMyWallet?.listSyntheticTransaction?.infoTrip?.star_avg, 1)) : 0}
                            </div>
                        </div>
                        <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                            Đánh giá
                        </div>
                    </div>

                    <div className='md:col-span-2 col-span-5 flex flex-col items-center gap-1 md:border-r-2 xl:px-6 px-4'>
                        <div className='flex items-center gap-2'>
                            <FaCar className='3xl:text-lg text-base text-[#2FB9BD]' />
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {isStateMyWallet?.listSyntheticTransaction?.infoTrip?.total ? FormatNumberHundred(isStateMyWallet?.listSyntheticTransaction?.infoTrip?.total, 100) : 0}
                            </div>
                        </div>
                        <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                            Chuyến đi thành công
                        </div>
                    </div>

                    <div className='3xl:col-span-4 md:col-span-6 col-span-10 grid grid-cols-3 gap-2 xl:px-6 px-4'>
                        <div className='col-span-1 bg-[#F6F6F6] flex flex-col items-center gap-1 px-2 py-2 rounded-md'>
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.responseRate ? data.responseRate : 0}
                            </div>
                            <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                                Tỉ lệ phản hồi
                            </div>
                        </div>
                        <div className='col-span-1 bg-[#F6F6F6] flex flex-col items-center gap-1 px-2 py-2 rounded-md'>
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.responseTime ? data.responseTime : 0}
                            </div>
                            <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                                Thời gian phản hồi
                            </div>
                        </div>
                        <div className='col-span-1 bg-[#F6F6F6] flex flex-col items-center gap-1 px-2 py-2 rounded-md'>
                            <div className='3xl:text-2xl text-xl text-[#484D5C] font-medium      '>
                                {data.acceptRate ? data.acceptRate : 0}
                            </div>
                            <div className='3xl:text-base text-sm text-[#8C93A3] text-center'>
                                Tỉ lệ đồng ý
                            </div>
                        </div>
                    </div>
                </div>

                {
                    isStateMyWallet?.listSyntheticTransaction?.transactionFinish?.data && isStateMyWallet?.listSyntheticTransaction?.transactionFinish?.data?.length > 0 ?
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
                                classNameRow="flex w-full"
                                classNameCell="max-w-[200px]"
                            />
                        </div>
                        :
                        (null)
                }

                <div className="flex flex-col gap-3">
                    <div className='flex items-center justify-between bg-[#F6F6F6] py-2 px-4 rounded-md'>
                        <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                            Tổng thay đổi - Chuyến đi hoàn thành
                        </div>
                        <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                            {FormatNumberDot(isStateMyWallet?.listSyntheticTransaction?.totalTransactionFinish ? isStateMyWallet?.listSyntheticTransaction?.totalTransactionFinish : 0)}đ
                        </div>
                    </div>

                    <div className='flex items-center justify-between bg-[#F6F6F6] py-2 px-4 rounded-md'>
                        <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                            Tổng thay đổi - Giao dịch rút/nộp tiền
                        </div>
                        <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                            {FormatNumberDot(isStateMyWallet?.listSyntheticTransaction?.totalTransactionCancel ? isStateMyWallet?.listSyntheticTransaction?.totalRequestWithdrawMoney : 0)}đ
                        </div>
                    </div>

                    <div className='flex items-center justify-between bg-[#F6F6F6] py-2 px-4 rounded-md'>
                        <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                            Tổng thay đổi - Giao dịch huỷ chuyến
                        </div>
                        <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                            {FormatNumberDot(isStateMyWallet?.listSyntheticTransaction?.totalTransactionCancel ? isStateMyWallet?.listSyntheticTransaction?.totalTransactionCancel : 0)}đ
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 bg-[#F6F6F6] py-2 px-4 rounded-md'>
                        <div className='flex items-center justify-between'>
                            <div className='3xl:text-base text-sm uppercase text-[#545454] font-medium'>
                                Tổng cộng thay đổi trong kì
                            </div>
                            <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                                {FormatNumberDot(isStateMyWallet?.listSyntheticTransaction?.balance_period ? isStateMyWallet?.listSyntheticTransaction?.balance_period : 0)}đ
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='3xl:text-base text-sm uppercase text-[#545454] font-medium'>
                                Tiền đầu kì
                            </div>
                            <div className='3xl:text-base text-sm text-[#545454] font-medium'>
                                {FormatNumberDot(isStateMyWallet?.listSyntheticTransaction?.opening_balance ? isStateMyWallet?.listSyntheticTransaction?.opening_balance : 0)}đ
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='3xl:text-base text-sm uppercase text-[#2FB9BD] font-medium'>
                                Tiền cuối kì
                            </div>
                            <div className='3xl:text-base text-sm text-[#2FB9BD] font-medium'>
                                {FormatNumberDot(isStateMyWallet?.listSyntheticTransaction?.ending_balance ? isStateMyWallet?.listSyntheticTransaction?.ending_balance : 0)}đ
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='3xl:text-base text-sm uppercase text-[#f08080] font-medium'>
                                Thu nhập chủ xe
                            </div>
                            <div className='3xl:text-base text-sm text-[#f08080] font-medium'>
                                {FormatNumberDot(isStateMyWallet?.listSyntheticTransaction?.revenue_customer ? isStateMyWallet?.listSyntheticTransaction?.revenue_customer : 0)}đ
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className='grid xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='xxl:col-span-1 xxl:block hidden w-full' />

                    <motion.div
                        initial={false}
                        animate={"rest"}
                        whileTap="press"
                        variants={{
                            rest: { scale: 1 },
                            press: { scale: 1.03, transition: { duration: 0.4 } }
                        }}
                        className='col-span-1 w-full'
                    >
                        <Link
                            href={`/transaction-statement/${isStateMyWallet?.selectedMonth ? isStateMyWallet?.selectedMonth : ""}`}
                            type="button"
                            // onClick={handleSubmitCar}
                            className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-[#2FB9BD] bg-white hover:bg-[#2FB9BD]/20 border border-[#2FB9BD] transition-all duration-300 font-semibold rounded-xl caret-transparent'
                        >
                            Xem sao kê chi tiết giao dịch
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={false}
                        animate={"rest"}
                        whileTap="press"
                        variants={{
                            rest: { scale: 1 },
                            press: { scale: 1.03, transition: { duration: 0.4 } }
                        }}
                        className='col-span-1 w-full'
                    >
                        <Button
                            type="button"
                            onClick={handleRequestPayment}
                            className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                        >
                            Gửi yêu cầu rút tiền
                        </Button>
                    </motion.div>
                </div>
            </div>
            {/* <UnderDevelopment /> */}
        </>

    )
}

export default MyWallet