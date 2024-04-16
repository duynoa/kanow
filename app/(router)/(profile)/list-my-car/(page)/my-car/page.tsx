"use client"

import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import DialogFilterMyCar from "./components/DialogFilterMyCar"
import { useEffect, useRef, useState } from "react"
import { useResize } from "@/hooks/useResize"
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services"

type Props = {

}

const MyCar = (props: Props) => {
    const initialState = {
        daTafilter: [],
        isLoadingCar: false,
        openFilter: false,
        isLoadingScroll: false,
        status_search: "",
        limit: 4,
        page: 1,
        dataMyCar: []
    }
    const [isState, setIsState] = useState<any>(initialState)

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);


    const queryState = (key: any) => setIsState({ ...isState, ...key })


    const { apiListCar } = apiMyCar()

    const handleFetchListCars = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            const { data } = await apiListCar(page, isState.limit, { car_owner: 1 })
            if (data && data.data && data.base) {
                console.log("data", data);
                // const { customDataMyTripCar } = CustomDataMyTripCar(data)
                // queryState({
                //     dataMyTrips: customDataMyTripCar,
                //     page: isState.page + 1,
                //     next: data?.links?.next,
                //  
                // })
            }

        }
        catch (err) {
            throw err
        }
        finally {
            queryState({ isLoadingCar: false })
        }

    }

    useEffect(() => {
        handleFetchListCars(isState.page)
    }, [])

    const handleSubmitFilter = async () => {
        try {
            queryState({ openFilter: false });
            await handleFetchListCars(1)
        } catch (error) {
            throw error;
        }
    };
    return (
        <>
            <div className="flex md:flex-row flex-col justify-between">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Danh sách xe của tôi</h1>
                <div className='items-center gap-5 md:my-0 my-5 md:flex hidden'>
                    <DialogFilterMyCar handleSubmitFilter={handleSubmitFilter} isState={isState} queryState={queryState} />
                </div>
            </div>
            <UnderDevelopment />
        </>

    )
}

export default MyCar