"use client"
import DropzoneFilesMulti from "@/components/image/DropzoneFilesMulti";
import { Switch } from "@/components/ui/switch";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import { uuidv4 } from "@/lib/uuid";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { useEffect, useState } from "react";
type Props = {}

export default function VehicleImages(props: Props) {

    const { apiUpdateCar } = apiVehicleCommon()

    const [images, setImages] = useState<any[]>([]);

    const [onDrag, setOnDrag] = useState<boolean>(false)

    const { dataDetail: { data, base }, idCar } = useVehicleManage()

    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    useEffect(() => {
        if (!Array.isArray(data) && data) {
            const img = data?.image_car.map((i: any) => {
                return {
                    id: uuidv4(),
                    name: `${base.base}/${i.name}`,
                    nameDefault: i.name
                }
            })
            setImages(img)
            return
        }
        setImages([])
    }, [data])



    const onSubmit = async () => {
        queryKeyIsStateLoadSuccess({
            loading: {
                ...isStateLoadSuccess.loading,
                isLoadingButton: true
            }
        })

        let formData = new FormData()

        formData.append('car_id', idCar)

        images.filter((i: any) => i?.nameDefault).forEach((i: any, index: number) => {
            formData.append(`image_old[${index}]`, i?.nameDefault)
        })

        images.filter((i: any) => !i?.nameDefault).forEach((i: any, index: number) => {
            formData.append(`image[${index}]`, i?.name)
        })

        try {
            const { data: db } = await apiUpdateCar(formData)
            if (db.result) {
                toastCore.success('Lưu thông tin thành công')
                return
            }
            toastCore.error(db.message)
        } catch (error) {

        }
        finally {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButton: false
                }
            })
        }
    }


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4 ">
            <div className="flex md:flex-row flex-col justify-between">
                <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Hình ảnh xe</h1>
            </div>
            <div>
                <div className="flex md:flex-row flex-col justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Hình ảnh xe</h1>
                </div>
            </div>
            <div className="space-y-4" >
                <div className="flex items-center gap-4">
                    <div className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                        Chọn hình ảnh
                    </div>
                    <div className="">
                        <Switch
                            className="data-[state=checked]:bg-[#2FB9BD] "
                            checked={onDrag}
                            onCheckedChange={(e) => setOnDrag(e)}
                        />
                    </div>
                </div>
                <h1 className="text-xs text-gray-400">Cho phép kéo thả để sắp xếp thứ tự hình ảnh</h1>
                <div className="">
                    <DropzoneFilesMulti
                        files={images}
                        onDrag={onDrag}
                        setFiles={setImages}
                        className={`border-[#BEBFC2]/80 h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                    />
                </div>
            </div>
        </BackgroundUiVehicle >
    )
}