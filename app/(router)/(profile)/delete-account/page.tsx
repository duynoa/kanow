"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/hooks/useAlertDialog";
import { useGeneralKey } from "@/hooks/useGeneralKey";
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile";
type Props = {}


export default function DeleteAccount(props: Props) {
    const { setOpenAlert } = useAlert()
    const { generalKey: db } = useGeneralKey()

    return (
        <BackgroundUiProfile className="flex flex-col gap-4 ">
            <div className='flex flex-col gap-2'>
                <div className='flex items-center md:gap-4 gap-2'>
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl font-semibold '>Yêu cầu xóa tài khoản</h1>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <h4 className='text-[#3E424E] font-normal lg:text-base text-sm'>
                        Các thông tin cần lưu ý khi yêu cầu xóa tài khoản
                    </h4>
                </div>
            </div>
            <div className="h-auto w-full">
                <Image src={'/profile/lockAccount/log.png'} width={1280} height={1024} alt="" className="lg:size-[40%] size-[80%] object-cover mx-auto" />
            </div>
            <div className="flex flex-col gap-4">
                <span dangerouslySetInnerHTML={{ __html: db.rule_delete_account }}></span>
                <div className="flex justify-end">
                    <Button onClick={() => setOpenAlert(true, 'delete-account')}
                        type="button"
                        className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                            px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                        Xóa tài khoản
                    </Button>
                </div>
            </div>

        </BackgroundUiProfile>
    )
}