import React from 'react'

type Props = {}

const GeneralGuide = (props: Props) => {
    return (
        <div className='flex flex-col gap-4 2xl:pb-20 pb-16'>
            <div className='3xl:text-4xl text-2xl text-[#000000] font-semibold'>
                Hướng dẫn chung
            </div>
            <div className='flex flex-col gap-2 mt-6'>
                <div className='2xl:text-2xl text-xl text-[#000000] font-medium'>
                    Gửi yêu cầu thuê xe
                </div>
                <div className='2xl:text-base text-sm text-[#000000] font-light space-y-2'>
                    Kanow hướng đến việc xây dựng một cộng đồng thuê xe với mong muốn mang lại sự tiện ích cho khách thuê xe và chủ xe. Chính vì vậy, khách thuê xe cần có trách nhiệm giữ gìn xe thuê, và trân trọng như chính xe của bạn. Nếu có phát sinh vấn đề hay bất cứ sự cố nào đối với xe trên chuyến đi của bạn, hãy mạnh dạn giải quyết với chủ xe một cách TRUNG THỰC và CÓ TRÁCH NHIỆM.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    Phê duyệt yêu cầu thuê xe
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    Kanow hướng đến việc xây dựng một cộng đồng văn minh, vì vậy hãy yêu quý và giữ vệ sinh những chiếc xe bạn thuê. Việc giao nhận và hoàn trả những chiếc xe SẠCH SẼ giúp cả hai bên kết thúc giao dịch một cách tốt đẹp và sẵn sàng cho những giao dịch tuyệt vời sau này.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    Nhận phản hồi &quot;Yêu cầu thuê xe&quot;
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    Kanow hướng đến việc xây dựng một cộng đồng văn minh, vì vậy hãy yêu quý và giữ vệ sinh những chiếc xe bạn thuê. Việc giao nhận và hoàn trả những chiếc xe SẠCH SẼ giúp cả hai bên kết thúc giao dịch một cách tốt đẹp và sẵn sàng cho những giao dịch tuyệt vời sau này.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    Tiến hành đặt cọc
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    Bất kì khi nào có phát sinh vấn đề trong quá trình thuê xe, chủ xe và khách thuê xe nên THÔNG BÁO ngay cho nhau, và sử dụng các điều khoản trong hợp đồng thuê xe hoặc các chính sách của Kanow được đăng trên website Kanow.vn để giải quyết nhanh chóng.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    Hoàn thành đặt xe
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    Các chủ xe có trách nhiệm đảm bảo xe của bạn có đầy đủ giấy tờ pháp lý và trong tình trạng AN TOÀN trước khi giao xe cho khách.
                    Khách thuê xe có trách nhiệm CHẤP HÀNH nghiêm chỉnh luật lệ giao thông và tuân thủ tất cả các điều luật hiện hành có liên quan trong thời gian thuê xe.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    Cuối cùng...
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    Nếu giữa hai bên chủ xe và khách thuê xe không thể tự giải quyết các vấn đề tranh chấp phát sinh, hãy liên hệ với bộ phận Chăm sóc Khách hàng của Kanow. Chúng tôi luôn bên cạnh để hỗ trợ bạn dàn xếp các vấn đề một cách tốt đẹp nhất, tuân theo các điều khoản, chính sách và quy chế hoạt động cả hai bên đã cam kết với Kanow.
                </div>
            </div>
        </div>
    )
}

export default GeneralGuide