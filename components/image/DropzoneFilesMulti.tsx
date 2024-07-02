import { useResize } from "@/hooks/useResize";
import { toastCore } from "@/lib/toast";
import Image from "next/image";
import React, { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // Import các thành phần từ react-beautiful-dnd
import { FileRejection, useDropzone } from "react-dropzone";
import { HiPlus } from "react-icons/hi";
import { MdClear } from "react-icons/md";

interface DropzoneImageProps {
    className?: string;
    files: any[];
    setFiles: React.Dispatch<React.SetStateAction<any[]>>;
    onDrag?: boolean;
}

const DropzoneFilesMulti: React.FC<DropzoneImageProps> = ({ className, files, setFiles, onDrag }) => {
    const { isVisibleMobile, isVisibleTablet } = useResize()

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (files.length + acceptedFiles.length > 10) {
                toastCore.error("Tối đa chỉ được 10 file", { style: { padding: "16px" } });
                return;
            }
            const newFiles = acceptedFiles
                .slice(0, 10 - files.length)
                .filter((file) => !files.some((existingFile) => existingFile.name === file.name));

            newFiles.forEach((file: any) => {
                const reader = new FileReader();
                reader.onload = () => {
                    file.preview = reader.result as string;
                    setFiles((prevFiles) => [...prevFiles, file]);
                };
                reader.readAsDataURL(file);
            });

            if (!newFiles.length) {
                toastCore.error("Tối đa chỉ được 10 file", {
                    style: { padding: "16px", boxShadow: "5px 10px #888888;" },
                });
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
        maxFiles: 10,
        onDrop,
    });

    const removeFile = (name: string) => {
        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((file) => (file.name || file.nameDefault) !== name);
            revokeObjectURLs(updatedFiles);
            return updatedFiles;
        });
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
                        {files.map((i, index) => (
                            <Draggable
                                disableInteractiveElementBlocking={true}
                                key={i.name}
                                draggableId={`draggableId-${i.name}`}
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
                                                src={i instanceof File ? URL.createObjectURL(i) : i.name ?? ""}
                                                width={1280}
                                                height={1024}
                                                alt="image"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                            <div
                                                className={`bg-white rounded-full z-[1000] rounded-fit cursor-pointer absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                                                {(isVisibleMobile || isVisibleTablet) ?
                                                    <MdClear
                                                        onTouchStart={(event) => {
                                                            removeFile(i.name)
                                                        }}
                                                        className="text-red-500 z-[1000] bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer  md:text-[26px] text-xl"
                                                    />
                                                    :
                                                    <MdClear
                                                        onClick={(event) => {
                                                            removeFile(i.name)
                                                        }}
                                                        className="text-red-500 z-[1000] bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer  md:text-[26px] text-xl"
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DropzoneFilesMulti;
