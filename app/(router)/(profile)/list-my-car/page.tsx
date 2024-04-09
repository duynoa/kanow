"use client"

import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile"

type Props = {

}

const ListMyCar = (props: Props) => {

    return (
        <BackgroundUiProfile className='space-y-4 '>
            {/* <div className="flex md:flex-row flex-col justify-between">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Xe của tôi</h1>
                <div className='items-center gap-5 md:my-0 my-5 md:flex hidden'>
                </div>
            </div> */}
            <UnderDevelopment />
        </BackgroundUiProfile>
    )
}

export default ListMyCar