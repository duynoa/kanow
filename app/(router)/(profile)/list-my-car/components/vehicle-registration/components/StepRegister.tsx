import { uuidv4 } from "@/lib/uuid";
import { id } from "date-fns/locale";

export const StepRegister = () => {
    const step = [
        {
            id: uuidv4(),
            name: 'Điền thông tin xe',
        },
        {
            id: uuidv4(),
            name: 'Tải hình ảnh xe'
        },
        {
            id: uuidv4(),
            name: 'Kanow tư vấn chủ xe & phê duyệt'
        },
        {
            id: uuidv4(),
            name: 'Bắt đầu cho thuê'
        }
    ]
    return (
        <div className="px-4">
            <div className="">
                {step.map((item, index) => (
                    <div key={item.id} className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border-[#2FB9BD] border-2 rounded-full text-[#2FB9BD] font-medium bg-[#2FB9BD]/10">
                                    {index + 1}

                                </div>
                            </div>
                            {index < step.length - 1 && <div className="w-[2px] h-full bg-[#2FB9BD]/50" />}
                        </div>
                        <div className="pt-1 pb-7">
                            <p className="mb-2 text-base font-semibold">{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};