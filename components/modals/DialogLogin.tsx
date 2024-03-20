import { useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { Checkbox } from "../ui/checkbox"

type Props = {
    children: React.ReactNode
    openModal: boolean
    statusModal: string
    setStatusModal: any
    handleOpenChangeModal: () => void
}

export function DialogLogin({
    children,
    openModal,
    statusModal,
    setStatusModal,
    handleOpenChangeModal
}: Props) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

    const [checkPolicy, setCheckPolicy] = useState<boolean>(false)

    const form = useForm({
        defaultValues: {
            phoneNumber: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            promoCode: ""
        },
    });

    const password = form.watch("password", "");

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: any, type: any) => {

    };

    const handleShowPassword = (type: string) => {
        if (type === "password") {
            setShowPassword(!showPassword);
        } else {
            setShowPasswordConfirm(!showPasswordConfirm);
        }
    };

    const handleChangeStatus = () => {
        if (statusModal === 'login') {
            setStatusModal('signup')
            setShowPassword(false)
            setShowPasswordConfirm(false)
            form.reset()
        } else if (statusModal === 'signup') {
            setStatusModal('login')
            setShowPassword(false)
            setShowPasswordConfirm(false)
            form.reset()
        }
    }

    console.log('statusModal: ', statusModal);


    return (
        <Dialog modal open={openModal} onOpenChange={handleOpenChangeModal}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogOverlay />
            <DialogContent className="lg:max-w-[520px] sm:max-w-[425px] max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={handleOpenChangeModal}
                    className="size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <DialogHeader className='flex items-center justify-center w-full 3xl:mt-6 mt-3'>
                    <DialogTitle className='text-2xl capitalize'>
                        {
                            statusModal === 'login' ?
                                "Đăng nhập"
                                :
                                "Đăng ký"
                        }
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values: any) => onSubmit(values, 'login'))}
                        className="space-y-4"
                    >
                        {
                            statusModal === 'login' && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        rules={{
                                            required: "Vui lòng nhập số điện thoại!",
                                        }}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                        Số điện thoại {" "}
                                                        <span className="text-[#F15A5A]">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            disabled={isLoading}
                                                            className={`${fieldState?.invalid && fieldState?.error
                                                                ? "border rounded-lg border-[#F15A5A]"
                                                                : "border-b rounded-lg border-[#D8DAE5]"
                                                                } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                            placeholder="Nhập số điện thoại"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        rules={{
                                            required: "Vui lòng nhập password!",
                                            minLength: {
                                                value: 6,
                                                message: "Mật khẩu phải có ít nhất 6 ký tự!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                    Mật khẩu <span className="text-[#F15A5A]">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            disabled={isLoading}
                                                            className={`${fieldState?.invalid && fieldState?.error
                                                                ? "border rounded-lg border-[#F15A5A]"
                                                                : "border-b rounded-lg border-[#D8DAE5]"
                                                                } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                            placeholder="Nhập mật khẩu"
                                                            type={showPassword ? "text" : "password"}
                                                            {...field}
                                                        />
                                                        {
                                                            showPassword ? (
                                                                <RiEyeLine
                                                                    onClick={() => handleShowPassword("password")}
                                                                    className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                                                                />
                                                            ) : (
                                                                <RiEyeOffLine
                                                                    onClick={() => handleShowPassword("password")}
                                                                    className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                </FormControl>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    <div className='flex w-full justify-end'>
                                        <div className='w-fit text-sm font-semibold cursor-pointer caret-transparent text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition-all'>
                                            Quên mật khẩu?
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center gap-2'>
                                        <Button
                                            type="submit"
                                            className='3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full 3xl:py-4 py-3 rounded-xl'
                                        >
                                            Đăng nhập
                                        </Button>
                                        <div className='flex items-center gap-1 text-sm'>
                                            <span>
                                                Bạn chưa là thành viên?
                                            </span>
                                            <span
                                                onClick={handleChangeStatus}
                                                className='cursor-pointer text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition-all'
                                            >
                                                Đăng ký ngay
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            statusModal === 'signup' && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        rules={{
                                            required: "Vui lòng nhập họ và tên",
                                        }}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                        Số điện thoại
                                                        <span className="text-[#F15A5A]">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            disabled={isLoading}
                                                            className={`${fieldState?.invalid && fieldState?.error
                                                                ? "border rounded-lg border-[#F15A5A]"
                                                                : "border-b rounded-lg border-[#D8DAE5]"
                                                                } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                            placeholder="Nhập số điện thoại"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        rules={{
                                            required: "Nhập họ và tên",
                                        }}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                        Họ và tên
                                                        <span className="text-[#F15A5A]">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            disabled={isLoading}
                                                            className={`${fieldState?.invalid && fieldState?.error
                                                                ? "border rounded-lg border-[#F15A5A]"
                                                                : "border-b rounded-lg border-[#D8DAE5]"
                                                                } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                            placeholder="Nhập họ và tên"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        rules={{
                                            required: "Vui lòng nhập password!",
                                            minLength: {
                                                value: 6,
                                                message: "Mật khẩu phải có ít nhất 6 ký tự!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                    Mật khẩu <span className="text-[#F15A5A]">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            disabled={isLoading}
                                                            className={`${fieldState?.invalid && fieldState?.error
                                                                ? "border rounded-lg border-[#F15A5A]"
                                                                : "border-b rounded-lg border-[#D8DAE5]"
                                                                } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                            placeholder="Nhập mật khẩu"
                                                            type={showPassword ? "text" : "password"}
                                                            {...field}
                                                        />
                                                        {showPassword ? (
                                                            <RiEyeLine
                                                                onClick={() => handleShowPassword("password")}
                                                                className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                                                            />
                                                        ) : (
                                                            <RiEyeOffLine
                                                                onClick={() => handleShowPassword("password")}
                                                                className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                                                            />
                                                        )}
                                                    </div>
                                                </FormControl>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        rules={{
                                            required: "Vui lòng nhập mật khẩu xác nhận!",
                                            minLength: {
                                                value: 6,
                                                message: "Mật khẩu phải có ít nhất 6 ký tự!",
                                            },
                                            validate: (value) =>
                                                value === password || "Mật khẩu không khớp!",
                                        }}
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                    Nhập lại mật khẩu{" "}
                                                    <span className="text-[#F15A5A]">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            disabled={isLoading}
                                                            className={`${fieldState?.invalid && fieldState?.error
                                                                ? "border rounded-lg border-[#F15A5A]"
                                                                : "border-b rounded-lg border-[#D8DAE5]"
                                                                } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                            // className="bg-white rounded-none border-b border-x-0 border-t-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                            placeholder="Nhập lại mật khẩu"
                                                            type={
                                                                showPasswordConfirm
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            {...field}
                                                        />
                                                        {showPasswordConfirm ? (
                                                            <RiEyeLine
                                                                onClick={() => handleShowPassword("passwordConfirm")}
                                                                className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                                                            />
                                                        ) : (
                                                            <RiEyeOffLine
                                                                onClick={() => handleShowPassword("passwordConfirm")}
                                                                className="absolute top-[25%] right-4 3xl:size-6 size-5 cursor-pointer"
                                                            />
                                                        )}
                                                    </div>
                                                </FormControl>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="promoCode"
                                        render={({ field, fieldState }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                        Mã giới thiệu (nếu có)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            disabled={isLoading}
                                                            className={`${fieldState?.invalid && fieldState?.error
                                                                ? "border rounded-lg border-[#F15A5A]"
                                                                : "border-b rounded-lg border-[#D8DAE5]"
                                                                } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                            placeholder="Nhập mã giới thiệu (nếu có)"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="check"
                                            className='size-4 text-white border-[#9EA1AE] data-[state=checked]:border-[#2FB9BD] data-[state=checked]:bg-[#2FB9BD] data-[state=checked]:text-white'
                                            checked={checkPolicy}
                                            onCheckedChange={(checked: boolean) => setCheckPolicy(checked)}
                                        />
                                        <label
                                            htmlFor="check"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 caret-transparent"
                                        >
                                            Tôi đồng ý với điều khoản và chính sách
                                        </label>
                                    </div>
                                    <div className='flex flex-col items-center gap-2'>
                                        <Button
                                            type="submit"
                                            disabled={checkPolicy ? false : true}
                                            className='3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full 3xl:py-4 py-3 rounded-xl'
                                        >
                                            Tạo tài khoản
                                        </Button>
                                        <div className='flex items-center gap-1 text-sm'>
                                            <span>
                                                Bạn đã có tài khoản?
                                            </span>
                                            <span
                                                onClick={handleChangeStatus}
                                                className='cursor-pointer text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition-all'
                                            >
                                                Đăng nhập
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
