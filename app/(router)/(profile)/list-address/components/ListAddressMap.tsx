import Image from "next/image"
import SkeletonAddress from "./SkeletonAddress"
import { MdEditLocationAlt } from "react-icons/md"

const ListAddressMap = ({ isState, queryKeyIsState }: any) => {
    return <div className="flex flex-col 2xl:gap-6 lg:gap-4 gap-6 bg-white">
        {isState.isLoadingAddress ?
            [...Array(4)].map((e: any) => {
                return <SkeletonAddress key={e} />
            })
            : isState.listAddress?.length > 0 ? isState.listAddress?.map((e: any) => {
                const images: any = {
                    1: '/listAddress/home-2.png',
                    2: '/listAddress/building-4.png',
                    3: '/listAddress/stickynote.png'
                }
                return (
                    <div
                        key={e.id}
                        onClick={() => queryKeyIsState({ tabAddress: 'add', idAddress: e.id })}
                        className={`flex w-full items-center cursor-pointer gap-2 2xl:py-6 lg:py-4 py-4 px-4 rounded-3xl border group hover:bg-gray-100 transition-all duration-200 ease-linear`}
                    >
                        <div className="lg:w-[5%] w-[15%] flex items-center justify-center">
                            <Image src={images[e.type]} width={1280} height={1024} className="size-7" alt="" />
                        </div>
                        <div className="lg:w-[85%] w-[80%] flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <h1 className="xl:text-base lg:text-sm text-sm font-medium leading-[17px] capitalize">{e.name}</h1>
                                {e.default_address == 1 && <span className="text-[#166A71] bg-[#9DF2EE] font-medium xl:text-sm text-xs py-1 px-4 rounded-2xl leading-4">Mặc định</span>}
                            </div>

                            <h1 className="text-[#6F7689] font-normal leading-6 xl:text-base lg:text-sm text-sm">
                                {e.address},  {e.ward.name}, {e.district.name}, {e.province.name}
                            </h1>
                        </div>
                        <div className="lg:w-[10%] w-[5%] flex items-center justify-center">
                            <MdEditLocationAlt className="group-hover:text-[#2FB9BD] group-hover:scale-110 cursor-pointer lg:text-xl text-lg transition-all duration-200 ease-linear" />
                        </div>
                    </div>
                )
            }) :
                <Image src={'/card/no_car.png'} alt="logo" width={1280} height={1024} className='w-full h-full object-cover'></Image>
        }
    </div>
}
export default ListAddressMap