import moment from "moment"
import Image from "next/image"
import StarRatings from "react-star-ratings"
import { FormatNumberToDecimal } from "@/components/format/FormatNumber"
import { IStatePageAccount } from "@/types/Profile/IAccount"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    isState: IStatePageAccount,
    queryState: (key: any) => void
}
const SessionStarRating = ({ isState, queryState }: Props) => {
    return (
        <div className="flex flex-col md:gap-8 gap-4 ">
            <div className="flex md:flex-row flex-col md:justify-between md:items-center md:gap-0 gap-2">
                <div className='flex flex-col gap-1'>
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl font-semibold '>Đánh giá</h1>
                    <div className="flex items-center gap-2">
                        <StarRatings
                            rating={isState.totalStar ?? 0}
                            starRatedColor="#FCC43E"
                            starHoverColor='#FCC43E'
                            starDimension='16px'
                            starSpacing='2px'
                            numberOfStars={5}
                            name='rating'
                        />
                        {isState?.totalReview !== 0
                            &&
                            <div className='3xl:text-base text-sm text-[#FF9900] font-semibold'>
                                {FormatNumberToDecimal(isState.totalStar ?? 0, 1)}/5
                            </div>
                        }
                        {
                            isState?.totalReview !== 0 ?
                                <div className='3xl:text-base text-sm text-[#6F7689]'>
                                    ({isState?.totalReview ? isState?.totalReview : 0} đánh giá)
                                </div>
                                :
                                <div className='3xl:text-base text-sm text-[#6F7689]'>
                                    Chưa có đánh giá
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <Tabs value={isState.tabRatings} defaultValue="1" onValueChange={(value) => {
                        queryState({ tabRatings: value, page: 1 })
                    }} className="w-full">
                        <TabsList className='bg-transparent border-b border-b-[#F6F6F8] rounded-none w-full justify-start gap-8 p-0'>
                            <TabsTrigger
                                value="1"
                                className='data-[state=active]:text-[#2FB9BD] text-[#667085] data-[state=active]:border-b-[#2FB9BD]
                                border-b-2 border-transparent rounded-none pb-[15px] px-0 font-semibold text-sm leading-[17px]'>
                                Khách thuê
                            </TabsTrigger>
                            <TabsTrigger
                                value="2"
                                className='data-[state=active]:text-[#2FB9BD] text-[#667085] data-[state=active]:border-b-[#2FB9BD]
                                border-b-2 border-transparent rounded-none pb-[15px] px-0 font-semibold text-sm leading-[17px]'>
                                Chủ xe
                            </TabsTrigger>
                        </TabsList>
                        {/* <TabsContent value="1" className='lg:mt-4 mt-5'>

                        </TabsContent>
                        <TabsContent value="2" className='lg:mt-4 mt-5'>

                        </TabsContent> */}
                    </Tabs>
                </div>
            </div>
            {isState.loadingData ?
                [...Array(5)].map((_, index) => (
                    <div key={index} className={`${index == 5 ? "border-0" : "border-b pb-3"} flex flex-col gap-2`}>
                        <div className='flex items-center gap-3'>
                            <Skeleton className='3xl:w-14 3xl:h-14 3xl:max-w-14 w-12 h-12 max-w-12 rounded-full drop-shadow'>  </Skeleton>
                            <Skeleton className='flex flex-col gap-1 h-5 w-full'> </Skeleton>
                        </div>
                        <Skeleton className='3xl:text-base text-sm text-[#585F71] h-5'>
                        </Skeleton>
                        <Skeleton className='flex items-center justify-between h-5'></Skeleton>
                    </div>
                ))
                :
                isState?.dataStarRatings && isState?.dataStarRatings?.map((item, index) => (
                    <div key={item.id} className={`${index == isState?.dataStarRatings?.length - 1 ? "border-0" : "border-b pb-3"} flex flex-col `}>
                        <div className='flex items-center gap-3'>
                            <div className='3xl:w-14 3xl:h-14 3xl:max-w-14 w-12 h-12 max-w-12 rounded-full drop-shadow'>
                                <Image
                                    src={item.avatar}
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                    className='w-full h-full object-contain rounded-full'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize 3xl:text-base text-sm text-[#484D5C] font-semibold'>
                                    {item.name ? item.name : ''}
                                </div>
                                {/* <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                    {
                                        moment().subtract(1, "days").isSame(moment(item?.date, "DD/MM/YYYY"), "day")
                                            ? `Hôm qua lúc ${moment(item?.date).format("HH:mm")}`
                                            : moment(item?.date).fromNow()
                                    }
                                </div> */}
                            </div>
                        </div>
                        <div className='3xl:text-base text-sm text-[#585F71] mt-2'>
                            {item.content ? item.content : ''}
                        </div>
                        <div className='flex items-center justify-between'>
                            <StarRatings
                                rating={item.star ? item.star : 0}
                                starRatedColor="#FCC43E"
                                starHoverColor='#FCC43E'
                                starDimension='14px'
                                starSpacing='2px'
                                numberOfStars={5}
                                name='rating'
                            />
                            <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                {
                                    moment().subtract(1, "days").isSame(moment(item?.date, "DD/MM/YYYY"), "day")
                                        ? `Hôm qua lúc ${moment(item?.date).format("HH:mm")}`
                                        : moment(item?.date).fromNow()
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>)
}
export default SessionStarRating