import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { addDays, differenceInDays, differenceInMinutes, format, getMonth, getYear, isAfter, isBefore, isSameDay, isSameMonth, isSameYear, isWithinInterval, setHours, setMinutes } from 'date-fns';
import { DateFormatter, DayPicker, Modifiers, Months } from 'react-day-picker';
import { vi } from "date-fns/locale";
import { FormatNumberToThousands } from "../format/FormatNumber";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDialogCalendar } from "@/hooks/useOpenDialog";
import { useDataDetailCar } from "@/hooks/useDataQueryKey";


export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CalendarCustom({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    const { isStateDetailCar } = useDataDetailCar()
    const { openDialogCalendar } = useDialogCalendar()

    const {
        dateStart,
        dateEnd,
        dataCalendar,
        typeCarCalendar,
        numberDay,
        setNumberDay,
        setDateStart,
        setDateEnd,
        setFlagSubmit,
        setDateTemp
    } = useDialogCalendar()

    const parseTimeString = (timeString: string): [number, number] => {
        const [hours, minutes] = timeString?.split(':').map(Number);
        return [hours, minutes];
    };


    const seasonEmoji: Record<string, string> = {
        winter: '⛄️',
        spring: '🌸',
        summer: '🌻',
        autumn: '🍂'
    };

    const getSeason = (month: any): string => {
        const formatMonthToNumber = +month

        if (formatMonthToNumber >= 0 && formatMonthToNumber < 3) return 'winter';
        if (formatMonthToNumber >= 3 && formatMonthToNumber < 6) return 'spring';
        if (formatMonthToNumber >= 6 && formatMonthToNumber < 9) return 'summer';
        else return 'autumn';
    };

    const formatCaption = (month: any) => {
        const season = getSeason(month);

        return (
            <>
                <span role="img" aria-label={month}>
                    {seasonEmoji[season]}
                </span>{' '}
            </>
        );
    };


    // custom tháng + day
    const CustomMonth = () => {
        // slider place
        const swiperRef = React.useRef<any>(null);
        const [sliderStartMonth, setSliderStartMonth] = React.useState<boolean>(true)
        const [sliderEndMonth, setSliderEndMonth] = React.useState<boolean>(false)

        const handlePrev = (e: any) => {
            console.log('check handleprev swiperRef.current: ', swiperRef.current);
            console.log('check e: ', e);


            if (swiperRef.current && !sliderStartMonth) {
                swiperRef?.current?.slidePrev();
                setSliderStartMonth(swiperRef.current.isBeginning)
                setSliderEndMonth(swiperRef.current.isEnd)
            }
        };

        const handleNext = (e: any) => {
            console.log('check handlenext swiperRef.current: ', swiperRef.current);

            if (swiperRef.current && !sliderEndMonth) {
                swiperRef?.current?.slideNext();
                setSliderStartMonth(swiperRef.current.isBeginning)
                setSliderEndMonth(swiperRef.current.isEnd)
            }
        };

        const customPagination = {
            clickable: true,

            renderBullet: function (index: number, className: string) {
                return `<span class=${className}></span>`
            },

        }

        const currentDate = new Date(); // Lấy ngày hiện tại
        const currentMonth = `0${currentDate?.getMonth()}`.slice(-2); // Lấy tháng hiện tại với định dạng 2 chữ số
        const currentYear = currentDate?.getFullYear(); // Lấy năm hiện tại

        // Tạo dữ liệu cho các tháng từ data
        const monthData = dataCalendar?.filter(item => +item?.year === currentYear);

        const customDataDate = monthData?.map((item) => ({
            ...item,
            price_detail: item?.price_detail?.map((itemDate: any) => ({
                ...itemDate,
                month: item.month,
                year: item.year
            }))
        }))

        // Tạo giao diện cho từng tháng dựa trên dữ liệu
        const monthComponents = customDataDate?.map((monthItem, index) => {
            const month: any = monthItem?.month; // Tháng
            const formattedMonth = parseInt(month, 10)?.toString() // tháng format bỏ số 0
            const daysInMonth = monthItem?.price_detail?.length; // Số ngày trong tháng

            // Tạo các component cho từng ngày trong tháng
            // const dayComponents: any[] = [];
            const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
            // Tìm thứ của ngày đầu tiên trong tháng
            // const firstDayOfMonth = new Date(currentYear, month - 1, 1).getDay(); 

            // Tìm ngày đầu tiên của tháng và ngày cuối của tháng
            // Lưu ý: month phải trừ đi 1 vì months trong JavaScript bắt đầu từ 0 (tháng 1 là tháng 0)
            const firstDayOfMonth = new Date(currentYear, month - 1, 1);
            const lastDayOfMonth = new Date(currentYear, month, 1);

            // Xác định ngày đầu tiên của tuần và ngày cuối cùng của tuần
            const firstDayOfWeek = firstDayOfMonth?.getDay();
            const lastDayOfWeek = lastDayOfMonth?.getDay();

            // Xác định ngày bắt đầu và kết thúc của tuần trước và tuần sau
            const startOfPreviousWeek = new Date(firstDayOfMonth);
            startOfPreviousWeek?.setDate(startOfPreviousWeek?.getDate() - firstDayOfWeek);

            const endOfNextWeek = new Date(lastDayOfMonth);
            endOfNextWeek?.setDate(endOfNextWeek?.getDate() + (6 - lastDayOfWeek));

            const previousMonthDays = [];
            for (let d = new Date(startOfPreviousWeek); d < firstDayOfMonth; d.setDate(d.getDate() + 1)) {
                previousMonthDays.push(
                    <div key={`prev-${d}`} className='col-span-1 text-center text-[#000000]/40 font-normal 3xl:text-[15px] text-sm'>
                        {d.getDate()}
                    </div>
                );
            }

            const currentMonthDays = monthItem.price_detail.map((dayDataApi: any, i: number) => {
                const currentDate = new Date(dayDataApi.date);
                const dayOfWeek = currentDate.getDay();

                return (
                    // <div key={`current-${i}`} className='col-span-1'>
                    <CustomDay
                        key={`current-${i}`}
                        date={currentDate}
                        dayDataApi={dayDataApi}
                        dayOfWeek={dayOfWeek}
                        index={i}
                    />
                    // </div>
                );
            });

            const nextMonthDays = [];
            for (let d = new Date(lastDayOfMonth); d <= endOfNextWeek; d.setDate(d.getDate() + 1)) {
                nextMonthDays.push(
                    <div key={`next-${d}`} className='col-span-1 text-center text-[#000000]/40 font-normal 3xl:text-[15px] text-sm'>
                        {d.getDate()}
                    </div>
                );
            }

            const dayComponents = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];


            return (
                <SwiperSlide key={index} className="flex flex-col gap-2 p-0 max-w-[400px]">
                    <div className="w-full text-center text-base font-bold mt-4 mb-2 text-[#166A71]">
                        {formatCaption(formattedMonth)} Tháng {formattedMonth}, {currentYear}
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm font-semibold">
                        {/* Render các ngày trong tuần */}
                        {
                            daysOfWeek.map((item, index) => (
                                <div key={`index-week-${index}`}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                    {/* Render các ngày trong tháng */}
                    <div className='grid grid-cols-7 items-center'>
                        {/* <div className='grid grid-cols-7 items-center auto-cols-[minmax(0,_1fr)]'> */}
                        {dayComponents}
                    </div>
                </SwiperSlide>
            );
        });
        
        // const monthComponents = customDataDate?.map((monthItem, index) => {
        //     const month: any = monthItem?.month; // Tháng
        //     const formattedMonth = parseInt(month, 10)?.toString() // tháng format bỏ số 0
        //     const daysInMonth = monthItem?.price_detail?.length; // Số ngày trong tháng

        //     // Tạo các component cho từng ngày trong tháng
        //     const dayComponents: any[] = [];
        //     const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        //     // Tìm thứ của ngày đầu tiên trong tháng
        //     // const firstDayOfMonth = new Date(currentYear, month - 1, 1).getDay(); 

        //     // Tìm ngày đầu tiên của tháng và ngày cuối của tháng
        //     // Lưu ý: month phải trừ đi 1 vì months trong JavaScript bắt đầu từ 0 (tháng 1 là tháng 0)
        //     const firstDayOfMonth = new Date(currentYear, month - 1, 1);
        //     const lastDayOfMonth = new Date(currentYear, month, 1);

        //     // Xác định ngày đầu tiên của tuần và ngày cuối cùng của tuần
        //     const firstDayOfWeek = firstDayOfMonth?.getDay();
        //     const lastDayOfWeek = lastDayOfMonth?.getDay();

        //     // Xác định ngày bắt đầu và kết thúc của tuần trước và tuần sau
        //     const startOfPreviousWeek = new Date(firstDayOfMonth);
        //     startOfPreviousWeek?.setDate(startOfPreviousWeek?.getDate() - firstDayOfWeek);

        //     const endOfNextWeek = new Date(lastDayOfMonth);
        //     endOfNextWeek?.setDate(endOfNextWeek?.getDate() + (6 - lastDayOfWeek));

        //     // Render các ngày của tháng trước
        //     for (let d = new Date(startOfPreviousWeek); d < firstDayOfMonth; d?.setDate(d?.getDate() + 1)) {
        //         dayComponents.push(
        //             <div key={`prev-${d}`} className='col-span-1 text-center text-[#000000]/40 font-normal 3xl:text-[15px] text-sm'>
        //                 {/* Hiển thị ngày của tháng trước */}
        //                 {d.getDate()}
        //             </div>
        //         );
        //     }

        //     // Render các ngày trong tháng
        //     monthItem.price_detail.forEach((dayDataApi: any, i: any) => {
        //         const currentDate = new Date(dayDataApi.date);
        //         const dayOfWeek = currentDate.getDay();

        //         dayComponents.push(
        //             <CustomDay
        //                 date={currentDate}
        //                 dayDataApi={dayDataApi}
        //                 dayOfWeek={dayOfWeek}
        //                 index={i}
        //             />
        //         );
        //     });

        //     // Render các ngày của tháng sau
        //     for (let d = new Date(lastDayOfMonth); d <= endOfNextWeek; d.setDate(d.getDate() + 1)) {
        //         dayComponents.push(
        //             <div key={`next-${d}`} className='col-span-1 text-center text-[#000000]/40 font-normal 3xl:text-[15px] text-sm'>
        //                 {/* Hiển thị ngày của tháng sau */}
        //                 {d.getDate()}
        //             </div>
        //         );
        //     }

        //     return (
        //         <SwiperSlide key={index} className="flex flex-col gap-2 p-0 max-w-[400px]">
        //             <div className="w-full text-center text-base font-bold mt-4 mb-2 text-[#166A71]">
        //                 {formatCaption(formattedMonth)} Tháng {formattedMonth}, {currentYear}
        //             </div>
        //             <div className="grid grid-cols-7 text-center text-sm font-semibold">
        //                 {/* Render các ngày trong tuần */}
        //                 {
        //                     daysOfWeek.map((item, index) => (
        //                         <div key={`index-week-${index}`}>
        //                             {item}
        //                         </div>
        //                     ))
        //                 }
        //             </div>
        //             {/* Render các ngày trong tháng */}
        //             {/* <div className='flex flex-wrap items-center'> */}
        //                 {/* <div className='grid grid-cols-7 items-center auto-cols-[minmax(0,_1fr)]'> */}
        //                 {dayComponents}
        //             {/* </div> */}
        //         </SwiperSlide>
        //     );
        // });


        // Sử dụng useEffect để thiết lập swiperRef.current khi component được render ra lần đầu tiên
        React.useEffect(() => {
            if (swiperRef.current) {
                swiperRef.current.swiper = swiperRef.current;
                console.log('swiperRef.current if: ', swiperRef.current);
                console.log('swiperRef.current.swiper if: ', swiperRef.current.swiper);
            }

            console.log('swiperRef.current: ', swiperRef.current);
        }, [openDialogCalendar]);

        return (
            <>
                <Swiper
                    slidesPerView={typeCarCalendar == "calendar_car_autonomous" ? 2 : 1}
                    spaceBetween={typeCarCalendar == "calendar_car_autonomous" ? 35 : 0}
                    modules={[Pagination, A11y]}
                    breakpoints={{
                        320: {
                            slidesPerView: typeCarCalendar == "calendar_car_autonomous" ? 2 : 1,
                        },
                        640: {
                            slidesPerView: typeCarCalendar == "calendar_car_autonomous" ? 2 : 1,
                        },
                        768: {
                            slidesPerView: typeCarCalendar == "calendar_car_autonomous" ? 2 : 1,
                        },
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    allowTouchMove={false}
                    pagination={customPagination}
                    className='custom-swiper-calendar h-full'
                // ref={swiperRef}
                >
                    {/* Hiển thị các tháng */}
                    <div>
                        {monthComponents}
                    </div>
                    {/* các nút chuyển lịch */}
                    <div className='flex gap-2 absolute top-2 z-30 left-0 px-4 justify-between w-full disable-selection'>
                        <IoIosArrowBack
                            onClick={(e) => handlePrev(e)}
                            className={`${sliderStartMonth ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#2FB9BD]/10 text-[#2FB9BD] cursor-pointer hover:scale-105 duration-500 ease-in-out transition'}  p-1 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 w-8 h-8 rounded-lg`}
                        />
                        <IoIosArrowForward
                            onClick={(e) => handleNext(e)}
                            className={`${sliderEndMonth ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#2FB9BD]/10 text-[#2FB9BD] cursor-pointer hover:scale-105 duration-500 ease-in-out transition'}  p-1 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 w-8 h-8 rounded-lg`}
                        />
                    </div>
                </Swiper>
            </>
        );
    };

    // Component Day tùy chỉnh
    const CustomDay = ({ date, dayDataApi, dayOfWeek, index, ...props }: any) => {
        const daysBetweenDates = (startDate: Date, endDate: Date): number => {
            const oneDay = 24 * 60 * 60 * 1000;
            const firstDate = new Date(startDate);
            const secondDate = new Date(endDate);
            const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
            return diffDays;
        };

        const datesBetweenDates = (startDate: Date, endDate: Date): Date[] => {
            const dates: Date[] = [];
            const numberOfDays = daysBetweenDates(startDate, endDate);

            for (let i = 1; i < numberOfDays; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                date.setHours(0, 0, 0, 0);
                dates.push(date);
            }

            return dates;
        };

        const checkDateInBetween = (dateToCheck: Date, datesInBetween: Date[]): boolean => {
            return datesInBetween.some((date) => {
                return dateToCheck.getTime() === date.getTime();
            });
        };

        const handleChangeDate = (event: React.MouseEvent<HTMLDivElement>, item: any) => {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
            event.stopPropagation()
            if (typeCarCalendar === "calendar_car_autonomous") {
                const date = new Date(Number(item?.year), Number(item?.month) - 1, item?.day);
                // sau ngày dateStart
                const isAfterInSameYearAndMonth = (date: any, compareDate: any) => {
                    return (
                        (isSameYear(date, compareDate) || (getYear(date) > getYear(compareDate))) &&
                        ((isSameMonth(date, compareDate) || (getMonth(date) > getMonth(compareDate))) &&
                            isAfter(date, compareDate))
                    )
                };

                // trước ngày dateStart
                const isBeforeInSameYearAndMonth = (date: any, compareDate: any) => {
                    return (
                        (isSameYear(date, compareDate) || (getYear(date) < getYear(compareDate))) &&
                        ((isSameMonth(date, compareDate) || (getMonth(date) < getMonth(compareDate))) &&
                            isBefore(date, compareDate))
                    )
                };

                if (dateStart && dateEnd) {
                    if (isBeforeInSameYearAndMonth(date, dateStart)) {
                        const newDate = new Date(date);
                        newDate?.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setDateStart(newDate)
                        setFlagSubmit(true)
                    } else {
                        const newDate = new Date(date);
                        newDate?.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setDateStart(newDate)
                        setDateEnd(undefined)
                        setFlagSubmit(true)
                    }

                    if (isBeforeInSameYearAndMonth(date, dateStart)) {
                        const newDate = new Date(date);
                        newDate.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setDateStart(newDate)
                        setDateEnd(undefined)
                        setFlagSubmit(true)
                    } else if (isAfterInSameYearAndMonth(date, dateStart)) {
                        const newDate = new Date(date);
                        newDate?.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setDateStart(newDate)
                        setDateEnd(undefined)
                        setFlagSubmit(true)
                    } else {
                        const newDate = new Date(date);
                        newDate?.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setDateStart(newDate)
                        setDateEnd(undefined)
                        setFlagSubmit(true)
                    }

                } else if (dateStart && !dateEnd) {
                    const newDate = new Date(date);
                    newDate.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                    if (isBeforeInSameYearAndMonth(newDate, dateStart)) {
                        setDateStart(newDate)
                        setFlagSubmit(true)
                    } else if (isAfterInSameYearAndMonth(newDate, dateStart)) {
                        setFlagSubmit(true)
                        setDateEnd(newDate)
                    } else {
                        setFlagSubmit(true)
                        setDateEnd(newDate)
                    }
                }

            } else if (typeCarCalendar === "calendar_car_driver") {
                if (dateStart && dateEnd) {
                    // Tạo một đối tượng Date mới từ newDate
                    const newFromDate = new Date(date);
                    // Thiết lập thời gian của newFromDate từ dateTimeComponent.from
                    newFromDate?.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                    const newToDate = new Date(newFromDate)
                    newToDate?.setDate(date?.getDate() + numberDay);

                    setDateStart(newFromDate)
                    setDateEnd(newToDate)
                    setFlagSubmit(true)

                }
            }
        };

        const datesInBetween = dateStart && dateEnd ? datesBetweenDates(dateStart, dateEnd) : [];

        const firstDate = new Date(Number(dayDataApi?.year), Number(dayDataApi?.month) - 1, dayDataApi.day)
        const dayData = dataCalendar.flatMap((item: any) => item.price_detail).find(d => d.date == date.toISOString().split('T')[0]);

        const secondDate = new Date();
        const firstYear = firstDate.getFullYear();
        const firstMonth = firstDate.getMonth();
        const firstDay = firstDate.getDate();
        const secondYear = secondDate.getFullYear();
        const secondMonth = secondDate.getMonth();
        const secondDay = secondDate.getDate();


        const dateStartYear = dateStart?.getFullYear();
        const dateStartMonth = dateStart?.getMonth();
        const dateStartDay = dateStart?.getDate();

        const dateEndYear = dateEnd?.getFullYear();
        const dateEndMonth = dateEnd?.getMonth();
        const dateEndDay = dateEnd?.getDate();

        // ngày phía trước
        const isEarlier = dayDataApi?.day !== -1 ?
            firstYear < secondYear ||
            (firstYear === secondYear && firstMonth < secondMonth) ||
            (firstYear === secondYear && firstMonth === secondMonth && firstDay < secondDay)
            :
            false;

        // ngày trùng khi click chọn 1 ngày
        const isMatched = dayDataApi?.day !== -1 ?
            firstYear == dateStartYear &&
            firstYear == dateEndYear &&
            firstMonth == dateStartMonth &&
            firstMonth == dateEndMonth &&
            firstDay == dateStartDay &&
            firstDay == dateEndDay
            :
            false;

        // ngày trong khoảng cách
        const isInRange =
            dayDataApi?.day !== -1 && // Đảm bảo dayDataApi không phải là ngày trống
            (dateStart && dateEnd) && // Đảm bảo đã chọn cả ngày bắt đầu và ngày kết thúc
            (
                (firstDate >= dateStart && firstDate <= dateEnd) || // firstDate nằm trong khoảng thời gian từ dateStart đến dateEnd
                (secondDate >= dateStart && secondDate <= dateEnd) || // secondDate nằm trong khoảng thời gian từ dateStart đến dateEnd
                (firstDate <= dateStart && secondDate >= dateEnd) // Khoảng thời gian từ firstDate đến secondDate chứa trong khoảng thời gian từ dateStart đến dateEnd
            ) &&
            checkDateInBetween(firstDate, datesInBetween);

        const isPicked = dayDataApi?.day !== -1 ?
            ((firstYear === dateStartYear && firstMonth === dateStartMonth && firstDay === dateStartDay) ||
                (firstYear === dateEndYear && firstMonth === dateEndMonth && firstDay === dateEndDay)) &&
            !isInRange
            :
            false;

        if (dayData) {
            return (
                <div
                    // key={`current-${index}`}
                    onClick={isEarlier ? () => { } : (event: React.MouseEvent<HTMLDivElement>) => handleChangeDate(event, dayDataApi)}
                    className={`${isPicked && (dayDataApi.status !== 2 && dayDataApi.status !== 3) ? "bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 text-white hover:text-white cursor-pointer" : ""} 
                    ${isPicked && (dayDataApi.status === 2 || dayDataApi.status === 3) ? " !text-[#D3D3D3] border-2 border-[#2FB9BD] hover:!text-[#D3D3D3] bg-[#F6F6F7] hover:bg-[#F6F6F7]/80 cursor-pointer" : ""}
                    ${isInRange && (dayDataApi.status !== 2 && dayDataApi.status !== 3) ? " bg-[#C2F9F9] text-[#2FB9BD] hover:bg-[#2FB9BD] hover:text-white cursor-pointer" : ""}
                    ${isInRange && (dayDataApi.status === 2 || dayDataApi.status === 3) ? " text-[#D3D3D3] hover:!text-[#D3D3D3] border-2 border-[#C2F9F9] bg-[#F6F6F7] hover:!bg-[#F6F6F7]/80 cursor-pointer" : ""}
                    ${isEarlier && !isInRange && (dayDataApi.status === 2 || dayDataApi.status === 3) ? "cursor-default text-[#000000]/40 font-normal text-sm" : ""}
                    ${isEarlier && !isInRange && (dayDataApi?.status !== 2 && dayDataApi?.status !== 3) ? "cursor-default text-[#000000]/40 font-normal text-sm" : ""}
                    ${!isEarlier && !isInRange && (dayDataApi?.status !== 2 && dayDataApi?.status !== 3) ? "hover:bg-[#2FB9BD]/80 hover:text-white cursor-pointer" : ""}
                    ${!isEarlier && !isInRange && (dayDataApi?.status === 2 || dayDataApi?.status === 3) ? "text-[#D3D3D3] bg-[#F6F6F7] hover:!text-[#D3D3D3] hover:!bg-[#F6F6F7] cursor-pointer" : ""}
                    rounded-[2px] flex flex-col justify-center items-center w-full h-12 p-2 group col-span-1`}
                >
                    <div className='3xl:text-[15px] text-sm font-medium'>
                        {dayData.day}
                    </div>
                    {
                        isEarlier || (dayDataApi?.status == 2 && !isEarlier) || (dayDataApi?.status == 2 && isEarlier && isInRange) ?
                            null
                            :
                            <div className={` text-[10px] font-normal`}>
                                {FormatNumberToThousands(dayData.price)}
                            </div>
                    }
                </div>
            );
        }

        return (
            <div>
                {date.getDate()}
            </div>
        )
    };



    return (
        <>
            <DayPicker
                showOutsideDays={showOutsideDays}
                formatters={{ formatCaption }}
                footer
                locale={vi}
                className={cn("py-3 caret-transparent", className)}
                classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-semibold",
                    nav: "space-x-1 flex items-center",
                    nav_button: cn(
                        buttonVariants({ variant: "outline" }),
                        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-none"
                    ),
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-12 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-12 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: cn(
                        buttonVariants({ variant: "ghost" }),
                        "h-9 w-12 p-0 font-normal aria-selected:opacity-100"
                    ),
                    day_range_end: "day-range-end",
                    day_selected: "bg-[#1EAAB1] text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-[#1EAAB1] focus:text-primary-foreground",
                    // day_today: "bg-accent text-accent-foreground",
                    day_range_start: "bg-[#1EAAB1]",
                    day_outside:
                        "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle:
                        "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                    ...classNames,
                }}
                components={{
                    IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                    IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                    Months: CustomMonth,
                }}
                {...props}
            />
        </>

    )
}
CalendarCustom.displayName = "CalendarCustom"

export { CalendarCustom }
