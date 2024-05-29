import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { addDays, differenceInDays, differenceInMinutes, format, getMonth, getYear, isAfter, isBefore, isEqual, isSameDay, isSameMonth, isSameYear, isWithinInterval, setHours, setMinutes, startOfDay } from 'date-fns';
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
    const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar()

    // slider place
    const swiperRef = React.useRef<any>(null);
    const [sliderStartMonth, setSliderStartMonth] = React.useState<boolean>(true)
    const [sliderEndMonth, setSliderEndMonth] = React.useState<boolean>(false)
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState<number>(0)

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

    const currentDate = new Date(); // Lấy ngày hiện tại
    const currentMonth = `0${currentDate?.getMonth()}`.slice(-2); // Lấy tháng hiện tại với định dạng 2 chữ số
    const currentYear = currentDate?.getFullYear(); // Lấy năm hiện tại

    // tạo ra icon theo mùa
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

    // Tính số ngày giữa hai ngày startDate và endDate
    const daysBetweenDates = (startDate: Date, endDate: Date): number => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(startDate);
        const secondDate = new Date(endDate);
        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
        return diffDays;
    };

    // Lấy danh sách các ngày giữa startDate và endDate (không bao gồm startDate và endDate).
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

    // Kiểm tra xem một ngày có nằm trong danh sách các ngày hay không.
    const checkDateInBetween = (dateToCheck: Date, datesInBetween: Date[]): boolean => {
        return datesInBetween.some((date) => {
            return dateToCheck.getTime() === date.getTime();
        });
    };

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


            if (swiperRef.current) {
                swiperRef.current.slideTo(currentSlideIndex); // Chuyển slide về currentSlideIndex
                setCurrentSlideIndex(swiperRef.current.realIndex)
            }

            if (dateStart && dateEnd) {
                if (isBeforeInSameYearAndMonth(date, dateStart)) {
                    if (isStateDetailCar?.dataDetailCar?.hour_receive_car?.length > 0) {
                        const hourStartStr = isStateDetailCar?.dataDetailCar?.hour_receive_car[0].hour_start;
                        const [hourStart, minuteStart] = hourStartStr.split(':').map(Number);
                        const newDate = new Date(date);
                        newDate.setHours(hourStart, minuteStart, 0);

                        setDateStart(newDate)
                        setDateEnd(undefined)
                        setFlagSubmit(true)
                    } else {
                        const newDate = new Date(date);
                        newDate.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setDateStart(newDate)
                        setDateEnd(undefined)
                        setFlagSubmit(true)
                    }
                } else if (isAfterInSameYearAndMonth(date, dateStart)) {
                    if (isStateDetailCar?.dataDetailCar?.hour_receive_car?.length > 0) {
                        const hourStartStr = isStateDetailCar?.dataDetailCar?.hour_receive_car[0].hour_start;
                        const [hourStart, minuteStart] = hourStartStr.split(':').map(Number);

                        const newDate = new Date(date);
                        newDate.setHours(hourStart, minuteStart, 0);

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
                } else {
                    if (isStateDetailCar?.dataDetailCar?.hour_receive_car?.length > 0) {
                        const hourStartStr = isStateDetailCar?.dataDetailCar?.hour_receive_car[0].hour_start;
                        const [hourStart, minuteStart] = hourStartStr.split(':').map(Number);

                        const newDate = new Date(date);
                        newDate.setHours(hourStart, minuteStart, 0);

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
                }

            } else if (dateStart && !dateEnd) {

                if (isBeforeInSameYearAndMonth(date, dateStart)) {
                    if (isStateDetailCar?.dataDetailCar?.hour_receive_car?.length > 0) {
                        const hourStartStr = isStateDetailCar?.dataDetailCar?.hour_receive_car[0].hour_start;
                        const [hourStart, minuteStart] = hourStartStr.split(':').map(Number);

                        const newDate = new Date(date);
                        newDate.setHours(hourStart, minuteStart, 0);

                        setDateStart(newDate)
                        setDateEnd(undefined)
                        setFlagSubmit(true)
                    } else {
                        const newDate = new Date(date);
                        newDate.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setDateStart(newDate)
                        setFlagSubmit(true)
                    }

                } else if (isAfterInSameYearAndMonth(date, dateStart)) {
                    if (isStateDetailCar?.dataDetailCar?.hour_back_car?.length > 0) {
                        const hourEndStr = isStateDetailCar?.dataDetailCar?.hour_back_car[0].hour_start;
                        const [hourEnd, minuteEnd] = hourEndStr.split(':').map(Number);
                        const newDate = new Date(date);
                        newDate.setHours(hourEnd, minuteEnd, 0);

                        setDateEnd(newDate)
                        setFlagSubmit(true)
                    } else {
                        const newDate = new Date(date);
                        newDate.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setFlagSubmit(true)
                        setDateEnd(newDate)
                    }

                } else {
                    if (isStateDetailCar?.dataDetailCar?.hour_back_car?.length > 0) {
                        const hourEndStr = isStateDetailCar?.dataDetailCar?.hour_back_car[0].hour_start;
                        const [hourEnd, minuteEnd] = hourEndStr.split(':').map(Number);

                        const newDate = new Date(date);
                        newDate.setHours(hourEnd, minuteEnd, 0);

                        setDateEnd(newDate)
                        setFlagSubmit(true)
                    } else {
                        const newDate = new Date(date);
                        newDate.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());

                        setFlagSubmit(true)
                        setDateEnd(newDate)
                    }
                }
            }

        } else if (typeCarCalendar === "calendar_car_driver") {
            const date = new Date(Number(item?.year), Number(item?.month) - 1, item?.day);

            if (dateStart && dateEnd) {
                if (isStateDetailCar?.dataDetailCar?.hour_receive_car?.length > 0 && isStateDetailCar?.dataDetailCar?.hour_back_car?.length > 0) {
                    const hourStartStr = isStateDetailCar?.dataDetailCar?.hour_receive_car[0].hour_start;
                    const hourEndStr = isStateDetailCar?.dataDetailCar?.hour_back_car[0].hour_start;
                    const [hourStart, minuteStart] = hourStartStr.split(':').map(Number);
                    const [hourEnd, minuteEnd] = hourEndStr.split(':').map(Number);
                    // Tạo một đối tượng Date mới từ newDate
                    const newDateStart = new Date(date);
                    // Thiết lập thời gian của newFromDate từ dateTimeComponent.from
                    newDateStart.setHours(hourStart, minuteStart, 0);

                    const newDateEnd = new Date(newDateStart)
                    newDateEnd?.setHours(hourEnd, minuteEnd, 0)
                    newDateEnd?.setDate(date?.getDate() + numberDay);

                    setDateStart(newDateStart)
                    setDateEnd(newDateEnd)
                    setFlagSubmit(true)
                } else {
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
        }
    };

    const handlePrev = (e: any) => {
        if (swiperRef.current && !sliderStartMonth) {
            swiperRef?.current?.slidePrev();

            setCurrentSlideIndex(swiperRef.current.realIndex)
            setSliderStartMonth(swiperRef.current.isBeginning)
            setSliderEndMonth(swiperRef.current.isEnd)
        }
    };

    const handleNext = (e: any) => {
        if (swiperRef.current && !sliderEndMonth) {
            swiperRef?.current?.slideNext();

            setCurrentSlideIndex(swiperRef.current.realIndex)
            setSliderStartMonth(swiperRef.current.isBeginning)
            setSliderEndMonth(swiperRef.current.isEnd)
        }
    };

    return (
        <>
            <Swiper
                slidesPerView={typeCarCalendar == "calendar_car_autonomous" ? 2 : 1}
                spaceBetween={typeCarCalendar == "calendar_car_autonomous" ? 20 : 0}
                modules={[Pagination, A11y]}
                breakpoints={{
                    320: {
                        slidesPerView: typeCarCalendar == "calendar_car_autonomous" ? 1 : 1,
                        spaceBetween: typeCarCalendar == "calendar_car_autonomous" ? 15 : 0,
                    },
                    640: {
                        slidesPerView: typeCarCalendar == "calendar_car_autonomous" ? 1 : 1,
                        spaceBetween: typeCarCalendar == "calendar_car_autonomous" ? 15 : 0,
                    },
                    768: {
                        slidesPerView: typeCarCalendar == "calendar_car_autonomous" ? 2 : 1,
                        spaceBetween: typeCarCalendar == "calendar_car_autonomous" ? 15 : 0,
                    },
                    1024: {
                        slidesPerView: typeCarCalendar == "calendar_car_autonomous" ? 2 : 1,
                        spaceBetween: typeCarCalendar == "calendar_car_autonomous" ? 20 : 0,
                    },
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                allowTouchMove={false}
                className='custom-swiper-calendar h-full'
            >
                {/* Hiển thị các tháng */}
                <div>
                    {
                        customDataDate && customDataDate?.map((monthItem, index) => {
                            const formattedMonth = parseInt(monthItem?.month, 10)?.toString() // tháng format bỏ số 0
                            const daysInMonth = monthItem?.price_detail?.length; // Số ngày trong tháng

                            const daysOfWeek = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'];
                            // Tìm ngày đầu tiên của tháng và ngày cuối của tháng
                            // Lưu ý: month phải trừ đi 1 vì months trong JavaScript bắt đầu từ 0 (tháng 1 là tháng 0)
                            const firstDayOfMonth = new Date(currentYear, monthItem?.month - 1, 1);
                            const lastDayOfMonth = new Date(currentYear, monthItem?.month, 1);

                            // Xác định ngày đầu tiên của tuần và ngày cuối cùng của tuần
                            const firstDayOfWeek = firstDayOfMonth?.getDay() || 7;
                            const lastDayOfWeek = lastDayOfMonth?.getDay() || 7;

                            // Xác định ngày bắt đầu và kết thúc của tuần trước và tuần sau
                            const startOfPreviousWeek = new Date(firstDayOfMonth);
                            startOfPreviousWeek?.setDate(startOfPreviousWeek?.getDate() - (firstDayOfWeek - 1));

                            const endOfNextWeek = new Date(lastDayOfMonth);
                            endOfNextWeek?.setDate(endOfNextWeek?.getDate() + (7 - lastDayOfWeek));

                            const totalDays = 42; // Total number of days to display in the calendar grid

                            const previousMonthDays = [];
                            for (let d = new Date(startOfPreviousWeek); d < firstDayOfMonth; d.setDate(d.getDate() + 1)) {
                                previousMonthDays.push({
                                    date: new Date(d),
                                    day: d.getDate(),
                                    isPreviousMonthDay: true,
                                });
                            }

                            const currentMonthDays = monthItem.price_detail.map((dayDataApi: any) => {
                                const currentDate = new Date(dayDataApi.date);
                                return {
                                    ...dayDataApi,
                                    date: currentDate,
                                    day: currentDate.getDate(),
                                    price: dayDataApi.price,
                                };
                            });

                            const nextMonthDays = [];
                            for (let d = new Date(lastDayOfMonth); d <= endOfNextWeek; d.setDate(d.getDate() + 1)) {
                                nextMonthDays.push({
                                    date: new Date(d),
                                    day: d.getDate(),
                                    isNextMonthDay: true,
                                });
                            }

                            let dayComponents = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

                            // Ensure dayComponents has exactly 42 days
                            if (dayComponents.length < totalDays) {
                                const additionalDaysNeeded = totalDays - dayComponents.length;
                                let lastDate = new Date(dayComponents[dayComponents.length - 1].date);
                                for (let i = 0; i < additionalDaysNeeded; i++) {
                                    lastDate.setDate(lastDate.getDate() + 1);
                                    dayComponents.push({
                                        date: new Date(lastDate),
                                        day: lastDate.getDate(),
                                        isNextMonthDay: true,
                                    });
                                }
                            }

                            dayComponents = dayComponents.map((dayData, i, arr) => {
                                const datesInBetween = dateStart && dateEnd ? datesBetweenDates(dateStart, dateEnd) : [];

                                const firstDate = new Date(Number(dayData?.year), Number(dayData?.month) - 1, dayData.day)

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
                                const isPastDay = dayData?.day !== -1 ?
                                    isBefore(startOfDay(firstDate), startOfDay(secondDate)) :
                                    false;

                                // ngày trong khoảng cách
                                const isInRange =
                                    dayData?.day !== -1 && // Đảm bảo dayData không phải là ngày trống
                                    (dateStart && dateEnd) && // Đảm bảo đã chọn cả ngày bắt đầu và ngày kết thúc
                                    (
                                        isWithinInterval(firstDate, { start: dateStart, end: dateEnd }) || // firstDate nằm trong khoảng thời gian từ dateStart đến dateEnd
                                        isWithinInterval(secondDate, { start: dateStart, end: dateEnd }) || // secondDate nằm trong khoảng thời gian từ dateStart đến dateEnd
                                        isWithinInterval(firstDate, { start: dateStart, end: dateEnd }) && isWithinInterval(secondDate, { start: dateStart, end: dateEnd }) // Khoảng thời gian từ firstDate đến secondDate chứa trong khoảng thời gian từ dateStart đến dateEnd
                                    ) &&
                                    datesInBetween.some(date => isEqual(date, firstDate)); // Sử dụng isEqual để kiểm tra ngày

                                // ngày đã chọn
                                const isPicked = dayData?.day !== -1 ?
                                    ((firstYear === dateStartYear && firstMonth === dateStartMonth && firstDay === dateStartDay) ||
                                        (firstYear === dateEndYear && firstMonth === dateEndMonth && firstDay === dateEndDay)) &&
                                    !isInRange :
                                    false;

                                return (
                                    <div
                                        key={`current-${i}`}
                                        onClick={isPastDay || dayData.isPreviousMonthDay || dayData.isNextMonthDay ? () => { } : (event: React.MouseEvent<HTMLDivElement>) => handleChangeDate(event, dayData)}
                                        className={`
                                        ${(!isPastDay && (dayData.status !== 2 && dayData.status !== 3) && (!dayData.isPreviousMonthDay && !dayData.isNextMonthDay)) && "hover:bg-[#2FB9BD]/80 hover:text-white cursor-pointer"}
                                        ${isPicked && (dayData.status !== 2 && dayData.status !== 3) && "bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 text-white hover:text-white cursor-pointer"} 
                                        ${isPicked && (dayData.status === 2 || dayData.status === 3) && " !text-[#D3D3D3] border-2 border-red-500 hover:!text-[#D3D3D3] bg-[#F6F6F7] hover:bg-[#F6F6F7]/80 cursor-pointer"}
                                        ${isInRange && (dayData.status !== 2 && dayData.status !== 3) && " bg-[#C2F9F9] text-[#2FB9BD] hover:bg-[#2FB9BD] hover:text-white cursor-pointer"}
                                        ${isInRange && (dayData.status === 2 || dayData.status === 3) && " text-[#D3D3D3] hover:text-[#D3D3D3] border-2 border-[#C2F9F9] bg-[#F6F6F7] hover:bg-[#F6F6F7]/80 cursor-pointer"}
                                        ${!isPastDay && (dayData.status === 2 || dayData.status === 3) && " text-[#D3D3D3] hover:text-[#D3D3D3] bg-[#F6F6F7] hover:bg-[#F6F6F7]/80 cursor-pointer"}
                                        ${isPastDay && (dayData.status === 2 || dayData.status === 3) && " text-[#D3D3D3] bg-[#F6F6F7] cursor-default"}
                                        ${((isPastDay && (dayData.status !== 2 || dayData.status !== 3)) || dayData.isPreviousMonthDay || dayData.isNextMonthDay) && "cursor-default text-[#000000]/40 font-normal text-sm"}
                                        rounded-[2px] flex flex-col justify-center items-center w-full 3xl:h-14 h-12 p-2 group col-span-1 `}
                                    >
                                        <div className='3xl:text-[13px] lg:text-xs text-[11px] font-medium'>
                                            {dayData.day}
                                        </div>
                                        {
                                            isPastDay || (dayData?.status == 2 && !isPastDay) || (dayData?.status == 2 && isPastDay && isInRange) ?
                                                null
                                                :
                                                <div className={`3xl:text-xs lg:text-[11px] text-[10px] font-semibold`}>
                                                    {FormatNumberToThousands(dayData.price)}
                                                </div>
                                        }
                                    </div>
                                );
                            });


                            return (
                                <SwiperSlide key={index} className="flex flex-col gap-2 p-0 max-w-[440px]">
                                    <div className="w-full text-center text-base font-bold mt-4 mb-2 text-[#166A71]">
                                        {formatCaption(formattedMonth)} Tháng {formattedMonth}, {currentYear}
                                    </div>
                                    <div className="grid grid-cols-7 text-center text-[#A9A4A2] text-sm font-extralight">
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
                                        {dayComponents}
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
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

    )
}
CalendarCustom.displayName = "CalendarCustom"

export { CalendarCustom }
