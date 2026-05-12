"use client";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDataHome } from '@/hooks/useDataQueryKey';
import { useDialogAddress, useDialogCalendar } from '@/hooks/useOpenDialog';
import { regexPatterns } from '@/lib/regex';
import { toastCore } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { uuidv4 } from '@/lib/uuid';
import { postDriverAppointment } from '@/services/cars/cars.services';
import { addDays, format, setHours, setMinutes } from 'date-fns';
import { vi } from 'date-fns/locale';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineGpsFixed } from 'react-icons/md';
import { TiLocation } from 'react-icons/ti';

const tabSearch = [
    {
        id: "232",
        name: "Xe tự lái",
        icon_active: "/icon/home/icon_car_active_1.png",
        icon_no_active: "/icon/home/icon_car_no_active_1.png",
        type: "list-cars-autonomous",
        tab: 1,
    },
    {
        id: "4343",
        name: "Xe có tài xế",
        icon_active: "/icon/home/icon_car_active_2.png",
        icon_no_active: "/icon/home/icon_car_no_active_2.png",
        type: "list-cars-driver",
        tab: 2,
    },
    {
        id: "5454",
        name: "Tìm tài xế",
        icon_active: "/icon/home/icon_car_active_3.png",
        icon_no_active: "/icon/home/icon_car_no_active_3.png",
        type: "search-driver",
        tab: 3,
    },
]

const IntroSection = () => {
    const MAX_DESTINATIONS = 4;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const router = useRouter()
    const { dateReal, setOpenDialogCalendar, setTypeCarCalendar, setDateReal } = useDialogCalendar()
    const {
        coordinates,
        valueAddressPickup,
        valueAddressDestination,
        indexAddressDestination,
        setType,
        setIndexAddressDestination,
        setOpenDialogAddress,
        setValueAddressDestination,
    } = useDialogAddress()

    const { isStateDataHome, queryKeyIsStateDataHome } = useDataHome()

    // Lấy thời điểm hiện tại
    const currentTime = new Date();

    // Tính thời điểm hết hạn của cookie là 60 giây sau thời điểm hiện tại
    const expirationTime = new Date(currentTime.getTime() + 30 * 60 * 1000);


    useEffect(() => {
        queryKeyIsStateDataHome({
            tabSearch: {
                tabId: tabSearch[0].id,
                type: tabSearch[0].type,
                tab: tabSearch[0].tab,
            }
        })
        // Kiểm tra xem mảng valueAddressDestination có rỗng không
        if (valueAddressDestination.length === 0) {
            // Thêm một điểm đến mặc định vào mảng valueAddressDestination
            setValueAddressDestination([
                {
                    id: 1,
                    valueAddress: ""
                }
            ]);
        }
    }, [])

    const handleTabChange = (item: any) => {
        const defaultDateRange: DateRange = {
            from: setMinutes(setHours(new Date(), 8), 0),
            to: setMinutes(setHours(addDays(new Date(), 1), 8), 0),
        };

        setDateReal(defaultDateRange)

        queryKeyIsStateDataHome({
            tabSearch: {
                tabId: item.id,
                type: item.type,
                tab: item.tab
            }
        })
    }

    const handleOpenDialog = (type: string) => {
        if (type === 'calendarCarAutonomous') {
            setOpenDialogCalendar(true)
            setTypeCarCalendar("calendar_car_autonomous")
        } else if (type === 'calendarCarDriver') {
            setOpenDialogCalendar(true)
            setTypeCarCalendar("calendar_car_driver")
        }
    };

    const handleSearchCar = () => {
        if (isStateDataHome.tabSearch.type === 'list-cars-autonomous') {
            if (valueAddressPickup) {
                router.push('/list-cars-autonomous')
                Cookies.set('coordinates', JSON.stringify(coordinates), { expires: expirationTime })
            } else {
                toastCore.error("Vui lòng chọn địa điểm!")
            }

        } else if (isStateDataHome.tabSearch.type === 'list-cars-driver') {
            if (valueAddressPickup && valueAddressDestination[indexAddressDestination].valueAddress) {
                router.push('/list-cars-driver')
                Cookies.set('coordinates', JSON.stringify(coordinates), { expires: expirationTime })

            } else {
                toastCore.error("Vui lòng chọn địa điểm đón và địa điểm đến!")
            }
        } else if (isStateDataHome.tabSearch.type === 'search-driver') {
            router.push('/search-driver')
        }
    }

    var heroTitle: string = "KANOW - Đồng hành mọi chuyến đi của bạn";
    var heroPerTitle: { letter: string, id: number }[] = heroTitle.split('').map((letter, index) => ({ letter: letter, id: index + 1 }));

    const handleOpenDialogAddress = (type: string, index?: number) => {
        setOpenDialogAddress(true)
        setType(type)
        if (index) {
            setIndexAddressDestination(index)
        }
    }

    const onSubmit = async (value: any) => {
        // Xử lý dữ liệu form khi submit
        console.log("value submit: ", value);
        try {
            const dataSubmit = {
                point_start: value.startPoint,
                point_end: value.destinationPoint,
                contact_name: value.fullname,
                contact_phone: value.phone
            }

            const { data } = await postDriverAppointment(dataSubmit);
            console.log('data :', data);

            if (data && data.result) {
                toastCore.success("Hẹn tài xế thành công!")
                reset()
            } else {
                toastCore.error(data.message)
            }

        } catch (err) {
            throw err
        }
    };

    return (
        <div className='xl:h-[100vh] lg:h-[80vh] md:h-[80svh] h-[100svh] w-full relative '>
            <div className="xl:hidden">
                <Image
                    alt="background"
                    width={375}
                    height={664}
                    src="/background/cityHomeMobile.png"
                    className='w-full h-auto object-contain absolute'
                    priority
                    sizes="100vw"
                />
                <Image
                    alt="background"
                    width={375}
                    height={780}
                    src="/background/line_background_mobile1.png"
                    className='w-full h-auto object-contain absolute -bottom-8 drop-shadow'
                    priority
                    sizes="100vw"
                />
            </div>
            <div className="hidden xl:block">
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/cityHome.png"
                    className='w-full h-auto object-contain absolute'
                    priority
                />
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/line_background1.png"
                    className='w-full h-auto object-contain absolute 3xl:-bottom-[4px] 2xl:-bottom-[20px] xxl:-bottom-[16px] xl:bottom-0 lg:-bottom-[10px] md:bottom-0 bottom-0 drop-shadow'
                    priority
                />
            </div>
            <div
                className='xl:h-[60vh] h-[40vh] '
                style={{ background: "linear-gradient(0deg, rgba(3, 107, 116, 0.04) -75.88%, rgba(0, 0, 0, 0.00) 129.69%), rgba(194, 249, 249, 0.60)" }}
            >
                <div className='custom-container relative'>
                    <div className='xl:hidden 3xl:py-16 2xl:py-12 xl:py-12 py-8 3xl:text-[3.75rem] 2xl:text-[3rem] xxl:text-[2.25rem] xl:text-[2.25rem] lg:text-[1.875rem] md:text-[1.5rem] text-[2rem] font-bold md:max-w-[45%] max-w-full capitalize leading-tight'>
                        <span>{heroTitle}</span>
                    </div>
                    <div className='hidden xl:block 3xl:py-16 2xl:py-12 xl:py-12 py-8 3xl:text-[3.75rem] 2xl:text-[3rem] xxl:text-[2.25rem] xl:text-[2.25rem] lg:text-[1.875rem] md:text-[1.5rem] text-[2rem] font-bold md:max-w-[45%] max-w-full capitalize leading-tight'>
                        {
                            heroPerTitle.map(e => (
                                <span
                                    key={e.id.toString()}
                                    data-aos="fade-up"
                                    data-aos-delay={e.letter !== "" ? `${e.id * 50}` : "0"}
                                >
                                    {e.letter}
                                </span>
                            ))
                        }
                    </div>
                    <div className='flex flex-col xl:w-[500px] md:w-[400px] w-full'>
                        <div className='flex md:gap-[2px] items-center bg-white/0'>
                            {
                                tabSearch && tabSearch.map((tab: any) => (
                                    <div
                                        key={tab.id}
                                        className={`${tab.id == isStateDataHome.tabSearch.tabId ? "bg-white" : "bg-[#BEE9EA] hover:bg-[#BEE9EA]/80"} caret-transparent flex items-center gap-2 xl:px-6 xl:py-3 px-4 py-2 rounded-t-xl cursor-pointer`}
                                        onClick={() => handleTabChange(tab)}
                                    >
                                        <div className='relative flex gap-1 items-center w-fit'>
                                            <div className='w-5 h-full'>
                                                <Image
                                                    alt="icon_active"
                                                    src={tab.id == isStateDataHome.tabSearch.tabId ? (tab.icon_active ? tab.icon_active : "/default/default.png") : (tab.icon_no_active ? tab.icon_no_active : "/default/default.png")}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            <div className='text-sm text-[#585F71] font-medium'>
                                                {tab.name ? tab.name : ""}
                                            </div>

                                            {tab.id == isStateDataHome.tabSearch.tabId && (
                                                <div className="absolute -bottom-2 left-0 right-0 h-[3px] w-full bg-[#2FB9BD]"></div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {
                            isStateDataHome.tabSearch.tab === 1 &&
                            <div className='flex flex-col gap-4 bg-white w-full h-full rounded-b-xl xl:px-6 xl:py-4 p-4'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                        Địa điểm
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <TiLocation className="text-xl text-[#1EAAB1]" />
                                        </span>
                                        <div
                                            id="place"
                                            onClick={() => handleOpenDialogAddress('address_pickup')}
                                            className='pl-10  cursor-pointer pr-2 py-3 w-full 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                        >
                                            {valueAddressPickup ? valueAddressPickup : 'Chọn địa điểm'}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='text-sm text-[#6F7689] w-fit' htmlFor="date">
                                        Thời gian thuê
                                    </Label>

                                    <div className=''>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                `3xl:py-4 3xl:px-3 px-3 py-3.5 w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs`,
                                                !dateReal && "text-muted-foreground"
                                            )}
                                            onClick={() => handleOpenDialog('calendarCarAutonomous')}
                                        >
                                            <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                                            {dateReal?.from ? (
                                                dateReal.to ? (
                                                    <>
                                                        {format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                                        {format(dateReal.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                                    </>
                                                ) : (
                                                    format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                                )
                                            ) : (
                                                <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                                            )}
                                        </Button>
                                    </div>

                                </div>

                                <Button
                                    type='button'
                                    size="basic"
                                    className='3xl:text-base text-sm w-full 3xl:py-4 xl:py-3 py-2 text-center uppercase text-white bg-[#FF9900] hover:bg-[#FF9900]/80 font-bold rounded-xl caret-transparent'
                                    onClick={() => handleSearchCar()}
                                >
                                    <span>Tìm xe</span>
                                </Button>
                            </div>
                        }
                        {
                            isStateDataHome.tabSearch.tab === 2 &&
                            <div className=' flex flex-col gap-4 bg-white h-[380px] max-h-[400px] overflow-y-auto w-full rounded-tr-xl rounded-b-xl xl:px-6 xl:py-4 p-4'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                        Điểm đi
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            {/* <TiLocation className="text-xl text-[#1EAAB1]" /> */}
                                            <MdOutlineGpsFixed className="text-xl text-[#1EAAB1]" />
                                        </span>
                                        <div
                                            id="place"
                                            onClick={() => handleOpenDialogAddress('address_pickup')}
                                            className='pl-10  cursor-pointer pr-2 py-3 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                        >
                                            {valueAddressPickup ? valueAddressPickup : 'Chọn địa điểm đón'}
                                        </div>
                                    </div>
                                </div>

                                {
                                    valueAddressDestination && valueAddressDestination?.map((destination, index) => (
                                        <div className='flex flex-col gap-2 w-full' key={index}>
                                            <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                                Điểm đến {valueAddressDestination.length === 1 ? "" : index + 1}
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    {/* <TiLocation className="text-xl text-[#1EAAB1]" /> */}
                                                    <TiLocation className="text-xl text-[#FA3434]" />
                                                </span>
                                                <div
                                                    id="place"
                                                    onClick={() => handleOpenDialogAddress('address_destination', index)}
                                                    className='pl-10  cursor-pointer pr-2 py-3 w-full 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                                >
                                                    {valueAddressDestination[index].valueAddress ? valueAddressDestination[index].valueAddress : 'Chọn địa điểm đến'}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                                {/* Nút để thêm điểm đến mới (setup trước)*/}
                                {/* {valueAddressDestination.length < MAX_DESTINATIONS && (
                                    <div>
                                        <FaPlusCircle onClick={handleAddDestination} className='size-10 text-green-500' />
                                    </div>
                                )} */}


                                <div className='flex flex-col gap-2'>
                                    <Label className='text-sm text-[#6F7689] w-fit' htmlFor="date">
                                        Thời gian thuê
                                    </Label>

                                    <div className=''>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                `3xl:py-4 3xl:px-3 px-3 py-3.5 w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs`,
                                                !dateReal && "text-muted-foreground"
                                            )}
                                            onClick={() => handleOpenDialog('calendarCarDriver')}
                                        >
                                            <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                                            {dateReal?.from ? (
                                                dateReal.to ? (
                                                    <>
                                                        {format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                                        {format(dateReal.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                                    </>
                                                ) : (
                                                    format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                                )
                                            ) : (
                                                <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                                            )}
                                        </Button>
                                    </div>

                                </div>

                                <Button
                                    type='button'
                                    size="basic"
                                    className='3xl:text-base text-sm w-full 3xl:py-4 xl:py-3 py-2 text-center uppercase text-white bg-[#FF9900] hover:bg-[#FF9900]/80 font-bold rounded-xl caret-transparent'
                                    onClick={() => handleSearchCar()}
                                >
                                    <span>Tìm xe</span>
                                </Button>
                            </div>
                        }
                        {
                            isStateDataHome.tabSearch.tab === 3 &&
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 bg-white w-full h-full rounded-tr-xl rounded-b-xl xl:px-6 xl:py-4 p-4'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Label className='text-sm text-[#6F7689]' htmlFor="place_1">
                                        Điểm đi
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MdOutlineGpsFixed className="text-xl text-[#1EAAB1]" />
                                        </span>
                                        <Input
                                            id="place_1"
                                            placeholder='Nhập điểm đi'
                                            className={`${errors.startPoint ? "border border-[#FA3434]" : "border-0"} pl-10 placeholder:text-[#B4B8C5] placeholder:font-medium pr-2 py-3 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal`}
                                            {...register("startPoint", {
                                                required: "Vui lòng nhập điểm đi",
                                            })}
                                        />
                                    </div>
                                    {errors.startPoint ? <span className="text-red-500">{typeof errors.startPoint.message === 'string' && errors?.startPoint?.message ? errors?.startPoint?.message : ""}</span> : null}
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Label className='text-sm text-[#6F7689]' htmlFor="place_2">
                                        Điểm đến
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <TiLocation className="text-xl text-[#FA3434]" />
                                        </span>
                                        <Input
                                            id="place_2"
                                            placeholder='Nhập điểm đến'
                                            className={`${errors.destinationPoint ? "border border-[#FA3434]" : "border-0"} pl-10 placeholder:text-[#B4B8C5] placeholder:font-medium pr-2 py-3 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70  hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal`} // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                            {...register("destinationPoint", {
                                                required: "Vui lòng nhập điểm đến",
                                            })}
                                        />
                                    </div>
                                    {errors.destinationPoint ? <span className="text-red-500">{typeof errors.destinationPoint.message === 'string' && errors?.destinationPoint?.message ? errors?.destinationPoint?.message : ""}</span> : null}
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                        Thông tin liên hệ
                                    </Label>
                                    <div className={`${errors.fullname || errors.phone ? "border border-[#FA3434]" : ""} flex items-center rounded-xl bg-[#F6F6F8]/70`}>
                                        <Input
                                            id="place"
                                            placeholder="Nhập họ và tên"
                                            className="w-[60%] max-w-[60%] pl-4 pr-2 py-3 placeholder:text-[#B4B8C5] placeholder:font-medium 3xl:text-base 2xl:text-sm xl:text-[13px] bg-transparent rounded-none rounded-tl-xl rounded-bl-xl lg:text-xs md:text-xs text-xs truncate justify-start border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[#16171B] font-normal"
                                            {...register("fullname", {
                                                required: "Vui lòng nhập số họ và tên",
                                            })}
                                        />

                                        <div className='h-6 w-[1px] bg-[#B4B8C5]' />

                                        <Input
                                            id="phone"
                                            placeholder="Nhập số điện thoại"
                                            type='tel'
                                            maxLength={10}
                                            className="w-[40%] max-w-[40%] pl-4 pr-2 py-3 placeholder:text-[#B4B8C5] placeholder:font-medium 3xl:text-base 2xl:text-sm xl:text-[13px] bg-transparent rounded-tr-xl rounded-br-xl rounded-none lg:text-xs md:text-xs text-xs truncate justify-start border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[#16171B] font-normal"
                                            {...register("phone", {
                                                required: "Vui lòng nhập số điện thoại",
                                                pattern: {
                                                    value: regexPatterns.phone,
                                                    message: "Số điện thoại không hợp lệ",
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.fullname ? <span className="text-red-500">{typeof errors.fullname.message === 'string' && errors?.fullname?.message ? errors?.fullname?.message : ""}</span> : null}
                                    {errors.phone ? <span className="text-red-500">{typeof errors.phone.message === 'string' && errors?.phone?.message ? errors?.phone?.message : ""}</span> : null}
                                </div>

                                <Button
                                    type='submit'
                                    size="basic"
                                    className='3xl:text-base text-sm w-full 3xl:py-4 xl:py-3 py-2 text-center uppercase text-white bg-[#FF9900] hover:bg-[#FF9900]/80 font-bold rounded-xl caret-transparent'
                                // onClick={() => handleSearchCar()}
                                >
                                    <span>Hẹn tài xế</span>
                                </Button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default IntroSection