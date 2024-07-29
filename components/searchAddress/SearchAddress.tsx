import { useDialogAddress } from "@/hooks/useOpenDialog"
import useGoogleApi from "@/services/filter/google/google.services"
import { debounce } from "lodash"
import { useEffect, useState } from "react"
import { TiLocation } from "react-icons/ti"
import { useDebounce } from "use-debounce"
import { ScrollArea } from "../ui/scroll-area"

const SearchAddress = ({ onChange, children, field }: any) => {
    const { setCoordinates, openBoxSearch, setOpenBoxSearch, coordinates } = useDialogAddress()
    const [debouncedOpenBoxSearch] = useDebounce(openBoxSearch, 500)
    const [dataAddress, setDataAddress] = useState<string>("")
    const [debouncedDataAddress] = useDebounce(dataAddress, 500)
    const [dataBoxSearch, setDataBoxSearch] = useState<any[]>([])

    const { apiViewboxSearch } = useGoogleApi()
    console.log("coordinates dd", coordinates,);
    useEffect(() => {
        if (field.value) {
            setDataAddress(field.value)
            setCoordinates({ lat: 0, lng: 0 })
            if (coordinates.lat == 0 && coordinates.lng == 0) {
                setOpenBoxSearch(true)
            }
        } else {
            setOpenBoxSearch(false)
        }
    }, [field.value])

    const handleChangeAddress = (item: any) => {
        setDataAddress(item.address)
        setCoordinates({
            lat: item.location.lat,
            lng: item.location.lng
        })
        console.log("item.address", item.address);
        console.log("item.latlon", item.location.lat, item.location.lng);

        onChange(item.address);
        setOpenBoxSearch(false)
    }

    const VietnamBounds = "8.175944,102.148125,23.393395,109.464211";

    // khi có data thì mới chạy để lấy ra view box search


    const fetchDataTextSearch = debounce(async () => {
        try {
            const dataParams = {
                key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
                viewbox: VietnamBounds,
                text: debouncedDataAddress,
                types: "",
                tag: "",
                datetime: "",
            }

            const { data } = await apiViewboxSearch(dataParams)

            if (data && data.code == 'ok' && data.result) {

                setDataBoxSearch(data.result)
            } else {
                setOpenBoxSearch(false)
            }


        } catch (err) {
            throw err
        } finally {

        }
    }, 500)

    useEffect(() => {
        if (debouncedDataAddress) {

            fetchDataTextSearch()
        }
    }, [debouncedDataAddress])

    // useEffect(() => {
    //     if (dataBoxSearch?.length > 0) {
    //         setOpenBoxSearch(true)
    //     }
    // }, [dataBoxSearch])

    return (
        <div className="relative">
            {children}
            {
                field.value != '' && debouncedOpenBoxSearch && debouncedDataAddress && dataBoxSearch.length > 0 ?
                    <ScrollArea className='absolute top-full left-0 bg-white border w-full h-fit max-h-[300px] z-[999] pr-2 mt-2 rounded-2xl'>
                        <div className='flex flex-col z-[999]'>
                            {dataBoxSearch.slice(0, 10).map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleChangeAddress(item)}
                                    className={`${dataBoxSearch.length - 1 === index ? "" : "border-b"} flex flex-row gap-2 px-4 py-3 hover:bg-slate-100 cursor-pointer duration-200 transition ease-in-out`}
                                >
                                    <div className='size-5'>
                                        <TiLocation className="size-5 text-[#1EAAB1]" />
                                    </div>
                                    <div className="text-sm">
                                        {item.address}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    :
                    null
            }
        </div>
    )
}
export default SearchAddress