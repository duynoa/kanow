import { useResize } from "@/hooks/useResize";
import { toastCore } from "@/lib/toast";
import { changeCheckFileImage } from "@/utils/fnChange/changeFile";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // Import các thành phần từ react-beautiful-dnd
import { FileRejection, useDropzone } from "react-dropzone";
import { HiPlus } from "react-icons/hi";
import { MdClear } from "react-icons/md";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
interface DropzoneImageProps {
    className?: string;
    files: any[];
    setFiles: any;
    onDrag?: boolean;
    maxFile?: number;
}

const DropzoneFilesMulti: React.FC<DropzoneImageProps> = ({ className, files, setFiles, onDrag, maxFile = 10 }) => {
    const { isVisibleMobile, isVisibleTablet } = useResize()
    const [loading, setLoading] = useState<boolean>(false); // State để theo dõi trạng thái loading
    const [processing, setProcessing] = useState<number>(0);

    const onDrop = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            setLoading(true);
            if (files.length + acceptedFiles?.length > maxFile) {
                toastCore.error(`Tối đa chỉ được ${maxFile} file`, { style: { padding: "16px" } });
                return;
            }

            const newFiles = acceptedFiles.slice(0, maxFile - files?.length)

            // const convertedFiles = await Promise.all(
            //     newFiles.map(async (file: any) => {
            //         const newFile = await changeCheckFileImage(file, files)
            //         return newFile
            //     })
            // )
            const convertedFiles = await Promise.all(
                newFiles.map(async (file: any) => {
                    setProcessing(0);

                    const newFile = await changeCheckFileImage(file, files, undefined, (progress) => {
                        setProcessing(progress);
                    });
                    return newFile;
                })
            );


            setLoading(false);

            setFiles([...files, ...convertedFiles]);

            if (!newFiles.length) {
                toastCore.error(`Tối đa chỉ được ${maxFile} file`, { style: { padding: "16px" } });
            }

        },
        [files, setFiles]
    );


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
            "image/heic": [],
            "video/mp4": [],
            "audio/mp3": [],
        },
        maxFiles: maxFile,
        onDrop,
    });

    const removeFile = (name: string) => {
        const updatedFiles = files.filter((file: any) => (file?.name || file?.nameDefault) !== name);
        revokeObjectURLs(updatedFiles);
        setFiles(updatedFiles);
    };

    const revokeObjectURLs = (files: any) => {
        files.forEach((file: any) => {
            if (file.preview) {
                const img = document.createElement("img");
                img.src = file.preview;
                img.onload = () => {
                    URL.revokeObjectURL(file.preview);
                };
            }
        });
    };


    return (
        <DragDropContext
            onDragEnd={result => {
                const { destination, source, draggableId } = result;
                if (!destination) return;
                if (destination.index === source.index) return;
                const newValue = Array.from(files);
                const [removed] = newValue.splice(source.index, 1);
                newValue.splice(destination.index, 0, removed);
                setFiles(newValue);
            }}
        >
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div className="col-span-1 h-[250px] relative my-1">
                            <div {...getRootProps({ className })}>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <div className="text-base text-[#B2B2B2] py-2 px-4">Thả tệp tin vào đây ...</div>
                                ) : (
                                    <HiPlus className="text-xl group-hover:text-[#1677FF] transition-all duration-300" />
                                )}
                            </div>
                        </div>
                        {files?.map((i, index) => (
                            <Draggable
                                disableInteractiveElementBlocking={true}
                                key={i?.name}
                                draggableId={`draggableId-${i?.name}`}
                                index={index}
                                isDragDisabled={!onDrag}

                            >
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className=""
                                    >
                                        <div className={`${snapshot.isDragging && 'opacity-50'} relative  w-full h-[250px]`}>
                                            <Image
                                                src={i instanceof File ? URL.createObjectURL(i) : i?.name ?? ""}
                                                width={1280}
                                                height={1024}
                                                alt="image"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                            <div
                                                className={`bg-white rounded-full z-[1000] rounded-fit cursor-pointer absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                                                {(isVisibleMobile || isVisibleTablet) ?
                                                    <MdClear
                                                        onTouchStart={(event) => { removeFile(i?.name) }}
                                                        className="text-red-500 z-[1000] bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer  md:text-[26px] text-xl"
                                                    />
                                                    :
                                                    <MdClear
                                                        onClick={(event) => { removeFile(i?.name) }}
                                                        className="text-red-500 z-[1000] bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer  md:text-[26px] text-xl"
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {loading && (
                            <Skeleton className="col-span-1 flex justify-center text-sm items-center h-[250px] text-black">
                                <div className="flex flex-col gap-1">
                                    Hình ảnh đang được xử lý...
                                    <div className="flex items-center gap-2">
                                        <Progress value={processing} className="w-full h-2 bg-gray-400" />
                                        {processing}%
                                    </div>
                                </div>
                            </Skeleton>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DropzoneFilesMulti;
