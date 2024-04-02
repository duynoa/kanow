import { useEffect, useState } from "react";

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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Checkbox } from "../ui/checkbox";
import useAuthenticationAPI from "@/services/auth/auth.services";
import { useAuth } from "@/hooks/useAuth";
import { toastCore } from "@/lib/toast";
import { useCookie } from "@/hooks/useCookie";
import { Label } from "../ui/label";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { FormatPhoneNumber } from "../format/FormatNumber";
import { useDialogLogin } from "@/hooks/useOpenDialog";
import { useResize } from "@/hooks/useResize";
import { usePathname } from "next/navigation";

type Props = {};

export function DialogLogin({ }: Props) {
    const { setCookie, removeCookie } = useCookie()
    const { openDialogLogin, setOpenDialogLogin, statusModal, setStatusModal } = useDialogLogin()
    const { apiLogin, apiInfoUser, apiSignup, apiOtpSignup } = useAuthenticationAPI();
    const { setInformationUser } = useAuth()
    const { isVisibleTablet } = useResize()

    const [timeOtp, setTimeOtp] = useState(0)

    const pathname = usePathname()

    const [checkPolicy, setCheckPolicy] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

    const form = useForm({
        defaultValues: {
            phoneNumber: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            promoCode: "",
        },
    });

    const password = form.watch("password", "");

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: any, type: any) => {
        let formData = new FormData();
        if (type == 'login') {
            //api đăng nhập
            formData.append("phone", values.phoneNumber);
            formData.append("password", values.password);
            const { data } = await apiLogin(formData);

            if (data?.token) {
                if (pathname === "/search-car") {
                    window.location.reload()
                } else {
                    toastCore.success(data?.message);
                }

                setCookie("token_kanow", data?.token, { expires: 7 });
                const { data: information } = await apiInfoUser();

                if (information?.result) {
                    setInformationUser(information?.info);
                }
                setOpenDialogLogin(false)
            } else {
                removeCookie("token_kanow")
                toastCore.error(data?.message);
            }
        } else if (type == 'signup') {
            //api đăng ký thì sẽ gửi otp
            formData.append("phone", values.phoneNumber);
            const { data } = await apiOtpSignup(formData)
            if (data?.result) {
                setStatusModal('otp')
                setTimeOtp(data?.time)
            } else {
                toastCore.error(data?.message);
            }
        } else if (type == 'otp') {
            //api nhập mã otp xong thì đăng ký
            formData.append("phone", values.phoneNumber);
            formData.append("fullname", values.fullName);
            formData.append("password", values.password);
            formData.append("key_code", values.promoCode);
            const { data: dataSigup } = await apiSignup(formData);
            if (dataSigup?.token) {
                setCookie("token_kanow", dataSigup?.token, { expires: 7 });
                toastCore.success(dataSigup?.message);
                setOpenDialogLogin(false)
            } else {
                removeCookie("token_kanow")
                toastCore.error(dataSigup?.message);
            }
        }


    };

    const handleForgotOtp = async () => {
        let formData = new FormData();
        formData.append("phone", form.getValues("phoneNumber"));
        if (timeOtp == 0) {
            const { data } = await apiOtpSignup(formData)
            if (data?.result) {
                setTimeOtp(data?.time)
                toastCore.error(data?.message);
            } else {
                toastCore.error(data?.message);
            }
        } else {
            toastCore.error("Vui lòng chờ sau" + " " + timeOtp + " " + "giây để gửi lại OTP");
        }
    }

    useEffect(() => {
        form.reset()
    }, [openDialogLogin])

    const handleShowPassword = (type: string) => {
        if (type === "password") {
            setShowPassword(!showPassword);
        } else {
            setShowPasswordConfirm(!showPasswordConfirm);
        }
    };

    const handleChangeStatus = () => {
        if (statusModal === "login") {
            setStatusModal("signup");
            setShowPassword(false);
            setShowPasswordConfirm(false);
            form.reset();
        } else if (statusModal === "signup") {
            setStatusModal("login");
            setShowPassword(false);
            setShowPasswordConfirm(false);
            form.reset();
        }
    };

    useEffect(() => {
        // Nếu thời gian còn lại là 0 hoặc nhỏ hơn 0, không cập nhật thêm
        if (timeOtp <= 0) return;

        // Tạo một interval để giảm thời gian mỗi giây
        const timer = setInterval(() => {
            setTimeOtp((prevTime) => prevTime - 1);
        }, 1000);

        // Xóa interval khi component bị unmount
        return () => clearInterval(timer);
    }, [timeOtp]); // Đảm bảo useEffect chỉ chạy khi timeLeft thay đổi

    const handleOpenChangeModal = (type: string) => {
        if (type === 'login') {
            setOpenDialogLogin(!openDialogLogin)

            // dùng setTimeout để quản lí flow modal 
            setTimeout(() => {
                setStatusModal('login')
            }, 200);
        } else if (type === 'signup') {
            setOpenDialogLogin(!openDialogLogin)
            setTimeout(() => {
                setStatusModal('login')
            }, 200);
        }
    }

    return (
        <Dialog modal open={openDialogLogin} onOpenChange={() => handleOpenChangeModal(statusModal)}>
            <DialogOverlay />
            <DialogContent className={`${statusModal == 'otp' ? 'lg:max-w-[400px] max-w-[45%]' : "lg:max-w-[520px] max-w-[95%]"} max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                <DialogClose
                    onClick={() => handleOpenChangeModal(statusModal)}
                    className="size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className="flex items-center justify-center w-full 3xl:mt-6 mt-3">
                    <DialogTitle className={`${statusModal === "otp" ? "" : "capitalize"} text-2xl`}>
                        {statusModal === "login" && "Đăng nhập"}
                        {statusModal === "signup" && "Đăng ký"}
                        {statusModal === "otp" && "Nhập mã OTP"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values: any) => onSubmit(values, statusModal))}
                        className="space-y-4"
                    >
                        {
                            statusModal === "login" && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        rules={{
                                            required: "Vui lòng nhập số điện thoại!",
                                            minLength: {
                                                value: 10,
                                                message: "Số điện thoại phải có ít nhất 10 số!"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: "Số điện thoại không được dài hơn 10 số!"
                                            }
                                        }}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                        Số điện thoại <span className="text-[#F15A5A]">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
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
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
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
                                                value: 8,
                                                message: "Mật khẩu phải có ít nhất 8 ký tự!",
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
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex w-full justify-end">
                                        <div className="w-fit text-sm font-semibold cursor-pointer caret-transparent text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition-all">
                                            Quên mật khẩu?
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full 3xl:py-4 py-3 rounded-xl"
                                        >
                                            Đăng nhập
                                        </Button>
                                        <div className="flex items-center gap-1 text-sm">
                                            <span>Bạn chưa là thành viên?</span>
                                            <span
                                                onClick={handleChangeStatus}
                                                className="cursor-pointer text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition-all"
                                            >
                                                Đăng ký ngay
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            statusModal === "signup" && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        rules={{
                                            required: "Vui lòng nhập số điện thoại!",
                                            minLength: {
                                                value: 10,
                                                message: "Số điện thoại phải có ít nhất 10 số!"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: "Số điện thoại không được dài hơn 10 số!"
                                            }
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
                                                            type="number"
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
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        rules={{
                                            required: "Nhập họ và tên!",
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
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
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
                                                value: 8,
                                                message: "Mật khẩu phải có ít nhất 8 ký tự!",
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
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
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
                                                value: 8,
                                                message: "Mật khẩu phải có ít nhất 8 ký tự!",
                                            },
                                            validate: (value) => value === password || "Mật khẩu không khớp!",
                                        }}
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                    Nhập lại mật khẩu <span className="text-[#F15A5A]">*</span>
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
                                                            type={showPasswordConfirm ? "text" : "password"}
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
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
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
                                            id="ok"
                                            className="size-4 text-white border-[#9EA1AE] data-[state=checked]:border-[#2FB9BD] data-[state=checked]:bg-[#2FB9BD] data-[state=checked]:text-white"
                                            checked={checkPolicy}
                                            onCheckedChange={(checked: boolean) => setCheckPolicy(checked)}
                                        />
                                        <Label
                                            htmlFor="ok"
                                            onClick={() => setCheckPolicy(!checkPolicy)}
                                            className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 caret-transparent"
                                        >
                                            Tôi đồng ý với điều khoản và chính sách
                                            <span className="text-[#F15A5A]">*</span>
                                        </Label>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Button
                                            type="submit"
                                            disabled={checkPolicy ? false : true}
                                            className="3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full 3xl:py-4 py-3 rounded-xl"
                                        >
                                            Tạo tài khoản
                                        </Button>
                                        <div className="flex items-center gap-1 text-sm">
                                            <span>Bạn đã có tài khoản?</span>
                                            <span
                                                onClick={handleChangeStatus}
                                                className="cursor-pointer text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition-all"
                                            >
                                                Đăng nhập
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            statusModal == 'otp' && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="promoCode"
                                        rules={{
                                            minLength: 4,
                                            required: true
                                        }}
                                        render={({ field, fieldState }) => {
                                            const num = form.getValues("phoneNumber");
                                            return (
                                                <FormItem>
                                                    <div className="flex-col gap-2">
                                                        <FormLabel className="text-sm font-semibold text-gray-400 dark:text-secondary/70">
                                                            Vui lòng nhập mã OTP gồm 4 số được gửi tới số điện thoại: <span className="text-[#2FB9BD]">{FormatPhoneNumber(num)}</span>
                                                        </FormLabel>
                                                        <div className="text-[#2FB9BD] text-center py-2">{timeOtp}</div>
                                                    </div>
                                                    <FormControl className="">
                                                        <InputOTP maxLength={4} className="w-full" {...field}>
                                                            <InputOTPGroup className="mx-auto gap-2 w-fit">
                                                                <InputOTPSlot className="border ring-[#2FB9BD]" index={0} />
                                                                <InputOTPSlot className="border ring-[#2FB9BD]" index={1} />
                                                                <InputOTPSlot className="border ring-[#2FB9BD]" index={2} />
                                                                <InputOTPSlot className="border ring-[#2FB9BD]" index={3} />
                                                            </InputOTPGroup>

                                                        </InputOTP>
                                                    </FormControl>

                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <button
                                        onClick={handleForgotOtp}
                                        type="button"
                                        className="text-base text-red-500 hover:bg-transparent bg-white w-full py-2 rounded-base"
                                    >
                                        Gửi lại mã OTP
                                    </button>
                                    <Button
                                        type="submit"
                                        className="3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full 3xl:py-3 py-2 rounded-xl"
                                    >
                                        Xác nhận
                                    </Button>
                                </>
                            )
                        }
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
