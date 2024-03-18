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
            title: "Kanow có xử lý cho vải thun áo thun không?",
            description: 'Chúng tôi có dịch vụ xử lý rút tuyệt đối với 2 quy trình: giặt + sấy, trước khi cắt hàng để vải đảm bảo chất lượng hàng hoá'
        },
        {
            id: uuidv4(),
            title: "Kanow có xử lý cho vải thun áo thun không?",
            description: 'Chúng tôi có dịch vụ xử lý rút tuyệt đối với 2 quy trình: giặt + sấy, trước khi cắt hàng để vải đảm bảo chất lượng hàng hoá'
        },
        {
            id: uuidv4(),
            title: "Kanow có xử lý cho vải thun áo thun không?",
            description: 'Chúng tôi có dịch vụ xử lý rút tuyệt đối với 2 quy trình: giặt + sấy, trước khi cắt hàng để vải đảm bảo chất lượng hàng hoá'
        },
        {
            id: uuidv4(),
            title: "Kanow có xử lý cho vải thun áo thun không?",
            description: 'Chúng tôi có dịch vụ xử lý rút tuyệt đối với 2 quy trình: giặt + sấy, trước khi cắt hàng để vải đảm bảo chất lượng hàng hoá'
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