"use client"

import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services"
import { useEffect, useState } from "react"
import { RiFileCloudLine } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { LiaFileContractSolid } from "react-icons/lia";
import Link from "next/link";
import { PiFileCloud } from "react-icons/pi";

type Props = {

}

const Contract = (props: Props) => {
    const { apiContract } = apiMyCar()

    const [data, setData] = useState<any[]>([])

    const fetChDataContract = async () => {
        const { data: res } = await apiContract()
        console.log(res);
        if (res?.data) {
            setData(res.data)
        }
    }

    useEffect(() => {
        fetChDataContract()
    }, [])


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <PiFileCloud size={150} className="text-[#1EAAB1] mx-auto" />
                <h4 className='text-[#3E424E] font-normal lg:text-base text-sm text-center'>
                    Chọn loại hợp đồng bạn muốn xem
                </h4>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                <Link
                    href={data?.[0]?.file ?? ""}
                    download={data?.[0]?.name_file ?? ""}
                    className="flex flex-col items-center justify-center lg:ml-auto mx-auto gap-5  shadow bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-linear w-fit p-4 rounded-xl cursor-pointer"
                >
                    <h1 className="lg:text-base text-sm font-medium uppercase leading-5">
                        Hợp đồng cho thuê
                    </h1>
                    <div className="flex items-center justify-center  mx-auto">
                        <LiaFileContractSolid className="text-6xl text-[#1EAAB1]" />
                    </div>
                </Link>
                <Link
                    href={data?.[1]?.file ?? ""}
                    download={data?.[1]?.name_file ?? ""}
                    className="flex flex-col items-center justify-center lg:ml-auto mx-auto gap-5  shadow bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-linear w-fit p-4 rounded-xl cursor-pointer"
                >
                    <h1 className="lg:text-base text-sm font-medium uppercase leading-5">
                        Biên bản bàn giao xe
                    </h1>
                    <div className="flex items-center justify-center  mx-auto">
                        <RiFileList3Line className="text-6xl text-[#1EAAB1]" />
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default Contract