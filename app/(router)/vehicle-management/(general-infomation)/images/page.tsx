"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import { uuidv4 } from "@/lib/uuid";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { MdClear } from "react-icons/md";
type Props = {}

export default function VehicleImages(props: Props) {

    const form = useForm({
        defaultValues: {
            images: [],
            onDrag: false
        }
    })

    const refInput = useRef<HTMLInputElement>(null)

    const { dataDetail: { data, base }, idCar } = useVehicleManage()

    const findValue = form.getValues()

    useEffect(() => {
        if (data) {
            form.setValue("images", data?.image_car.map((i: any) => {
                return {
                    id: uuidv4(),
                    name: `${base.base}/${i.name}`
                }
            }))
            return
        }
        form.reset()
    }, [data])

    const onSubmit = async (value: any) => {
        console.log(value)
        toastCore.error('Chức năng đang phát triển')
    }



    return (
        <BackgroundUiVehicle className="flex flex-col gap-4 ">
            <div>
                <div className="flex md:flex-row flex-col justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Hình ảnh xe</h1>
                </div>
            </div>
            <Form {...form}>
                <div className="space-y-4" >
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field: { value, onChange, ...fieldProps }, fieldState }: any) => {
                            return (
                                <FormItem className="">
                                    <FormField
                                        control={form.control}
                                        name="onDrag"
                                        render={({ field, fieldState }) => {
                                            return (
                                                <FormItem className="flex items-center gap-4">
                                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                        Chọn hình ảnh
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="">
                                                            <Switch
                                                                className="data-[state=checked]:bg-[#2FB9BD] "
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </div>
                                                    </FormControl>

                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <FormDescription>
                                        <h1 className="text-xs text-gray-400">Cho phép kéo thả để sắp xếp thứ tự hình ảnh</h1>
                                    </FormDescription>
                                    <FormControl>
                                        <>
                                            <DragDropContext
                                                onDragEnd={result => {
                                                    const { destination, source, draggableId } = result;
                                                    console.log(draggableId);

                                                    if (!destination) return;
                                                    if (destination.index === source.index) return;
                                                    const newValue = Array.from(value);
                                                    const [removed] = newValue.splice(source.index, 1);
                                                    newValue.splice(destination.index, 0, removed);
                                                    console.log(newValue);

                                                    onChange(newValue);
                                                }}
                                            >
                                                <Droppable droppableId="droppable">
                                                    {provided => (
                                                        <div
                                                            className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                        >
                                                            <div className="col-span-1 h-[250px] relative my-1">
                                                                <Input {...fieldProps}
                                                                    onChange={(event: any) => {
                                                                        if (value?.some((x: any) => x?.name == event.target.files[0]?.name || x.name?.name == event.target.files[0]?.name)) {
                                                                            return
                                                                        }
                                                                        onChange([...value, { id: uuidv4(), name: event.target.files[0] }])
                                                                    }
                                                                    }
                                                                    accept="image/*, application/pdf"
                                                                    id={"vehicle-management-picture"}
                                                                    type="file"
                                                                    ref={refInput}
                                                                    multiple
                                                                    className="hidden" />
                                                                <Label
                                                                    htmlFor={"vehicle-management-picture"}
                                                                    className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                                >
                                                                    <IoMdAdd size={32} />
                                                                </Label>
                                                            </div>
                                                            {value && value.map((i: any, index: any) => {
                                                                return (
                                                                    <Draggable
                                                                        key={i.id}
                                                                        draggableId={`draggableId-${i.id}`}
                                                                        index={index}
                                                                        isDragDisabled={!findValue.onDrag}
                                                                    >
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                {...provided.dragHandleProps}
                                                                                {...provided.draggableProps}
                                                                                ref={provided.innerRef}
                                                                            >
                                                                                <div className={`${snapshot.isDragging && 'opacity-50'} relative w-full h-[250px]`}>
                                                                                    <Image
                                                                                        src={i.name instanceof File ? URL.createObjectURL(i.name) : i.name ?? ""}
                                                                                        width={1280}
                                                                                        height={1024}
                                                                                        alt="image"
                                                                                        className="w-full h-full object-cover rounded-md"
                                                                                    />
                                                                                    <div className={`bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                                                                                        <MdClear
                                                                                            onClick={() => {
                                                                                                const inputValue = refInput.current?.value;
                                                                                                if (inputValue) {
                                                                                                    refInput.current.value = '';
                                                                                                }
                                                                                                onChange(value?.filter((value: any) => value !== i))
                                                                                            }}
                                                                                            className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            })}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
                                        </>
                                    </FormControl>
                                </FormItem>
                            );
                        }}
                    />

                </div>
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonSaveForm title="Lưu hình ảnh" onClick={form.handleSubmit((values) => onSubmit(values))} />
                </div>
            </Form>
        </BackgroundUiVehicle >
    )
}