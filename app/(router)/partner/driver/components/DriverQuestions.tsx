import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowUp } from 'react-icons/io';

type Props = {}

const DriverQuestions = (props: Props) => {
    const listQuestions = [
        {
            id: uuidv4(),
            title: "Khi xảy ra va chạm thì cách thức xử lý và chi phí sửa chữa tính như thế nào?",
            description: 'Công ty có quy chế hỗ trợ sửa chữa khi va chạm giao thông, tùy theo nguyên nhân (chủ quan, khách quan, hỗn hợp) và tinh thần hợp tác giải quyết của Tài xế.Với sự cố nhỏ (va chạm, xước, móp…): Tài xế tự thanh toán.Với các sự cố lớn (giữ xe): Phải có Chuyên viên của bộ phận chuyên môn đi cùng để xác nhận chi phí và xử lý lấy xe ra theo từng trường hợp. Tài xế thanh toán khoản tiền theo xác nhận của Chuyên viên.'
        },
        {
            id: uuidv4(),
            title: "Nếu tôi gặp tai nạn thì công ty có hỗ trợ gì không?",
            description: 'Nếu tài xế gặp sự cố giao thông khi đang di chuyển trên đường tài xế ngay lập tức báo bộ phận chức năng để được hướng dẫn/hỗ trợ xử lý kịp thời. Đồng thời tài xế liên hệ với TT Hỗ trợ Tài xế Kanow 1900 252 228 và ĐTĐX/CVVHB xin hướng dẫn hỗ trợ nếu không tự xử lý được.'
        },
        {
            id: uuidv4(),
            title: "Tôi có lương cứng không? Chính sách thưởng theo chuyến và theo năm như thế nào?",
            description: 'Tài xế Kanow không có lương cứng. Thu nhập sẽ dựa trên doanh thu của chuyến đi và thưởng doanh thu hoạt động của tài xế. Các khoản thưởng khác sẽ dựa theo hiệu quả kinh doanh của công ty.'
        },
        {
            id: uuidv4(),
            title: "Tôi có thể chia sẻ tài khoản chạy chung với người khác được không?",
            description: 'Tuyệt đối không chia sẻ tài khoản cho người khác chạy chung, nếu tài xế có hành vi chia sẻ tài khoản cho người khác sẽ bị khóa tài khoản và bị ngừng hợp tác vĩnh viễn'
        },
        {
            id: uuidv4(),
            title: "Tôi mới thi bằng lái xe có giấy hẹn thì có thể đăng ký chạy xe không?",
            description: 'Tài xế đăng ký tài khoản Kanow bắt buộc mang toàn bộ giấy tờ bản gốc để nhân viên kiểm tra và đăng ký tài khoản. Kanow sẽ không thu giữ giấy tờ cá nhân nào của tài xế sau đó.'
        },
        {
            id: uuidv4(),
            title: "TX đã nạp tiền nhưng ví trên chưa nhận được hoặc KH đã thanh toán nhưng ví dưới chưa nhận được",
            description: 'TX vui lòng kiểm tra lại với ngân hàng. Trường hợp đã kiểm tra vẫn chưa được vui lòng báo về TT Hỗ trợ Tài xế Kanow 1900 252 228 để được hỗ trợ.'
        },
    ]

    return (
        <div id="section-questions" className='py-20'>
            <div className='custom-container flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <div className='text-center 3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010]'>
                        Câu hỏi thường gặp
                    </div>
                    <div className='text-center 3xl:text-base text-sm text-[#585F71]'>
                        Các câu hỏi thường gặp khi làm tài xế KANOW
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <Accordion type="multiple" className="lg:w-[70%] md:w-[90%] w-full space-y-6">
                        {
                            listQuestions && listQuestions.map((question, index) => (
                                <AccordionItem key={question.id} value={`item-${index}`} className='custom-accordion border border-[#B4B8C5] rounded-2xl'>
                                    <AccordionTrigger
                                        onClick={() => { }}
                                        className="focus-visible:outline-none w-full p-6 rounded-l-md"
                                    >
                                        <div className='flex items-center justify-between w-full'>
                                            <div className='xl:text-xl text-lg text-[#3E424E] font-semibold'>
                                                {question.title ? question.title : ''}
                                            </div>
                                            <div className="3xl:min-w-[30px] min-w-[20px]">
                                                <IoIosArrowUp className={`3xl:text-2xl text-xl accordionChevron text-[#06282D] shrink-0 transition-transform duration-200`} />
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 pb-6 xl:text-base text-sm'>
                                        {question.description ? question.description : ''}
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default DriverQuestions