import React, { useEffect } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerPortal,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useDrawerReview } from "@/hooks/useOpenDrawer"
import { getListAllReview } from "@/services/cars/cars.services"
import { useParams } from "next/navigation"
import { ScrollArea } from "../ui/scroll-area"
import Image from "next/image"
import moment from "moment"
import { Badge } from "../ui/badge"
import StarRatings from "react-star-ratings"
import SkeletonDrawerReview from "../skeleton/SkeletonDrawerReview"
import { motion } from 'framer-motion'
import ButtonLoading from "../button/ButtonLoading"

export function DrawerReview({ children }: any) {
    const {
        openDrawerReview,
        setOpenDrawerReview,
        isStateAllReview,
        queryKeyIsStateAllReview
    } = useDrawerReview()
    const slug = useParams()

    const handleOpenChange = (open: boolean) => {
        setOpenDrawerReview(open)
    }

    useEffect(() => {
        if (openDrawerReview) {
            const fetchListAllReview = async () => {
                try {
                    queryKeyIsStateAllReview({
                        loading: {
                            ...isStateAllReview.loading,
                            isLoadingListReview: true
                        }
                    })
                    const dataParams = {
                        current_page: isStateAllReview.params.page,
                        per_page: isStateAllReview.params.limit,
                        car_id: slug
                    }

                    const { data } = await getListAllReview(dataParams)

                    if (data && data.data && data.links && data.meta) {
                        queryKeyIsStateAllReview({
                            listAllReviewCar: data.data,
                            params: {
                                page: isStateAllReview.params.page + 1,
                                limit: isStateAllReview.params.limit,
                                next: data.links.next,
                                total_review: data.meta.total
                            },
                            loading: {
                                ...isStateAllReview.loading,
                                isLoadingListReview: false
                            }
                        })
                    } else {
                        queryKeyIsStateAllReview({
                            loading: {
                                ...isStateAllReview.loading,
                                isLoadingListReview: false
                            }
                        })
                    }

                } catch (err) {
                    throw err
                }
            }

            fetchListAllReview()
        } else {
            queryKeyIsStateAllReview({
                listAllReviewCar: [],
                params: {
                    page: 1,
                    limit: 10,
                    next: null,
                    total_review: 0
                }
            })
        }
    }, [openDrawerReview])

    const handleLoadmoreReview = () => {
        if (isStateAllReview.params.next !== null) {
            const fetchListAllReview = async () => {
                try {
                    queryKeyIsStateAllReview({
                        loading: {
                            ...isStateAllReview.loading,
                            isLoadingButton: true,
                        }
                    })
                    const dataParams = {
                        current_page: isStateAllReview.params.page,
                        per_page: isStateAllReview.params.limit,
                        car_id: slug
                    }

                    const { data } = await getListAllReview(dataParams)
                  
                    if (data && data.data && data.links && data.meta) {
                        let newListAllReviewCar = [...isStateAllReview.listAllReviewCar, ...data.data]

                        queryKeyIsStateAllReview({
                            listAllReviewCar: newListAllReviewCar,
                            params: {
                                page: isStateAllReview.params.page + 1,
                                limit: isStateAllReview.params.limit,
                                next: data.links.next,
                                total_review: data.meta.total
                            },
                            loading: {
                                ...isStateAllReview.loading,
                                isLoadingButton: false,
                            }
                        })
                    } else {
                        queryKeyIsStateAllReview({
                            loading: {
                                ...isStateAllReview.loading,
                                isLoadingButton: false,
                            }
                        })
                    }

                } catch (err) {
                    throw err
                }
            }

            fetchListAllReview()
        }
    }

    return (
        <Drawer
            open={openDrawerReview}
            onOpenChange={(open) => handleOpenChange(open)}
            direction="right"
        >
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger >
            <DrawerContent className='flex flex-row bg-white h-screen top-0 right-0 left-auto mt-0 w-[600px] rounded-tl-[10px] rounded-bl-[10px] outline-none ring-0 ring-offset-0'>
                <div className='flex items-center justify-center w-[6%]'>
                    <div className="w-2 h-[100px] rounded-full bg-muted" />
                </div>
                {
                    isStateAllReview.loading.isLoadingListReview ?
                        <SkeletonDrawerReview />
                        :
                        <div className="flex flex-col w-full max-w-[92%]">
                            <DrawerHeader className='p-0  py-4'>
                                <DrawerTitle className='3xl:text-2xl text-xl'>Tất cả đánh giá <span className='text-[#2FB9DB] 3xl:text-xl text-lg'>({isStateAllReview.params.total_review})</span></DrawerTitle>
                            </DrawerHeader>
                            <div className='flex flex-col h-full justify-between py-4'>
                                <ScrollArea className='h-[85vh] pr-4'>
                                    <div className='flex flex-col gap-4 3xl:pb-6 pb-4'>
                                        {
                                            isStateAllReview.listAllReviewCar && isStateAllReview.listAllReviewCar.map((item: any, index: number) => (
                                                <div key={item.id} className={`${index !== isStateAllReview?.listAllReviewCar?.length - 1 ? "border-b pb-3 px-2" : ""} flex flex-col`}>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='3xl:w-14 3xl:h-14 3xl:max-w-14 w-12 h-12 max-w-12 rounded-full drop-shadow'>
                                                            <Image
                                                                src={item.avatar ? item.avatar : "/avatar/avatar_default.png"}
                                                                alt="avatar"
                                                                width={100}
                                                                height={100}
                                                                className='w-full h-full object-contain rounded-full'
                                                            />
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <div className='capitalize 3xl:text-base text-sm text-[#484D5C] font-semibold'>
                                                                {item.customer_name ? item.customer_name : ''}
                                                            </div>
                                                            <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                                {
                                                                    moment().subtract(1, "days").isSame(moment(item?.date, "DD/MM/YYYY"), "day")
                                                                        ? `Hôm qua lúc ${moment(item?.date).format("HH:mm")}`
                                                                        : moment(item?.date).fromNow()
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='3xl:text-base text-sm text-[#585F71] mt-2'>
                                                        {item.content ? item.content : ''}
                                                    </div>

                                                    {
                                                        item?.template_content?.length > 0
                                                            ?
                                                            (
                                                                <div className='flex flex-wrap gap-2'>
                                                                    {
                                                                        item?.template_content && item?.template_content?.map((badge: any) => (
                                                                            <React.Fragment key={`content-${badge.id}`}>
                                                                                <Badge
                                                                                    variant={"secondary"}
                                                                                    className={`px-3 py-1 text-xs w-fit cursor-default caret-transparent hover:bg-[#2FB9BD]/20 border-[#2FB9BD] text-[#2FB9BD] transition duration-200 `}
                                                                                >
                                                                                    {badge.content}
                                                                                </Badge>
                                                                            </React.Fragment>
                                                                        ))
                                                                    }
                                                                </div>
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    <div className='flex items-center'>
                                                        <StarRatings
                                                            rating={item.star ? item.star : 0}
                                                            starRatedColor="#FCC43E"
                                                            starHoverColor='#FCC43E'
                                                            starDimension='14px'
                                                            starSpacing='0px'
                                                            numberOfStars={5}
                                                            name='rating'
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </ScrollArea>
                                <div className='flex items-center justify-center py-2'>
                                    {
                                        isStateAllReview.params.next !== null ?
                                            <motion.div
                                                initial={false}
                                                animate={"rest"}
                                                whileTap="press"
                                                variants={{
                                                    rest: { scale: 1 },
                                                    press: { scale: 1.03 }
                                                }}
                                            >
                                                <ButtonLoading
                                                    type='button'
                                                    title={"Xem thêm"}
                                                    onClick={() => handleLoadmoreReview()}
                                                    isStateloading={isStateAllReview?.loading?.isLoadingButton}
                                                    disabled={isStateAllReview?.loading?.isLoadingButton ? true : false}
                                                    className={`flex items-center gap-2 px-4 py-2 3xl:text-base text-sm bg-[#2FB9DB] text-white rounded-lg cursor-pointer hover:bg-[#2FB9DB]/80`}
                                                />
                                            </motion.div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                }
                <div className='flex items-center justify-center w-[2%]' />
            </DrawerContent>
        </Drawer>
    )
}
