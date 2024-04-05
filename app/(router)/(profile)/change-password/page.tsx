'use client'
import React, { useState } from "react"
import { toastCore } from "@/lib/toast";
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input";
import { useCookie } from "@/hooks/useCookie";
import { Button } from "@/components/ui/button";
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import useAuthenticationAPI from "@/services/auth/auth.services";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InitialSate } from "@/types/Profile/IChangePassword";

type Props = {}


const ChangePassWord = (props: Props) => {

    const { setCookie } = useCookie()

    const { apiChangePassword } = useAuthenticationAPI()

    const initialSate: InitialSate = {
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
    }

    const [isState, setIsState] = useState<InitialSate>(initialSate)

    const queryKeyIsState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    const form = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const newPassword = form.watch("newPassword", "");

    const onSubmit = async (value: any) => {
        let formData = new FormData()
        formData.append('password', value.oldPassword)
        formData.append('password_old', value.newPassword)
        const { data } = await apiChangePassword(formData)
        if (data?.result) {
            toastCore.success(data?.message)
            setCookie("token_kanow", data?.token, { expires: 7 })
            form.reset()
            return
        }
        toastCore.error(data?.message)
    }


    const IconInput = ({ onClick, show }: any) => {
        return (
            <>
                {show ? (
                    <RiEyeLine
                        onClick={onClick}
                        className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                    />
                ) : (
                    <RiEyeOffLine
                        onClick={onClick}
                        className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                    />
                )}
            </>
        )
    }


    return (
        <BackgroundUiProfile className="flex flex-col gap-4 ">
            <div className='flex flex-col gap-2'>
                <div className='flex items-center md:gap-4 gap-2'>
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl font-semibold '>Đổi mật khẩu</h1>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <h4 className='text-[#3E424E] font-normal lg:text-base text-sm'>
                        Vui lòng nhập mật khẩu cũ của bạn để thực hiện thay đổi mật khẩu
                    </h4>
                </div>
            </div>
            <Form {...form}>
                <div className=' flex flex-col lg:gap-5 md:gap-4 gap-3'>
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập mật khẩu cũ',
                            },
                            minLength: {
                                value: 8,
                                message: "Mật khẩu phải có ít nhất 8 ký tự",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Mật khẩu cũ <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Mật khẩu cũ"
                                                type={isState.showOldPassword ? "text" : "password"}
                                                {...field}
                                            />
                                            <IconInput
                                                onClick={() => queryKeyIsState({ showOldPassword: !isState.showOldPassword })}
                                                show={isState.showOldPassword}
                                            />
                                        </div>
                                    </FormControl>

                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập mật khẩu mới',
                            },
                            minLength: {
                                value: 8,
                                message: "Mật khẩu phải có ít nhất 8 ký tự",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Mật khẩu mới <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Mật khẩu mới"
                                                type={isState.showNewPassword ? "text" : "password"}
                                                {...field}
                                            />
                                            <IconInput
                                                onClick={() => queryKeyIsState({ showNewPassword: !isState.showNewPassword })}
                                                show={isState.showNewPassword}
                                            />
                                        </div>
                                    </FormControl>

                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng xác nhận mật khẩu mới',
                            },
                            minLength: {
                                value: 8,
                                message: "Mật khẩu phải có ít nhất 8 ký tự",
                            },
                            validate: (value) => value === newPassword || "Mật khẩu không khớp",
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Xác nhận mật khẩu mới"
                                                type={isState.showConfirmPassword ? "text" : "password"}
                                                {...field}
                                            />
                                            <IconInput
                                                onClick={() => queryKeyIsState({ showConfirmPassword: !isState.showConfirmPassword })}
                                                show={isState.showConfirmPassword}
                                            />
                                        </div>
                                    </FormControl>
                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                    <div className="flex justify-end">
                        <Button onClick={() => form.handleSubmit((values) => onSubmit(values))()}
                            type="button"
                            disabled={form.formState.isSubmitting}
                            className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                            px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                            Đổi mật khẩu
                        </Button>
                    </div>
                </div>
            </Form>
        </BackgroundUiProfile>
    )
}
export default ChangePassWord