import React from 'react'

type Props = {}

const SecurityInfo = (props: Props) => {
    return (
        <div className='flex flex-col gap-4 2xl:pb-20 pb-16'>
            <div className='3xl:text-4xl text-2xl text-[#000000] font-semibold'>
                Chính sách bảo mật
            </div>
            <div className='flex flex-col gap-2 mt-6'>
                <div className='2xl:text-2xl text-xl text-[#000000] font-medium'>
                    1. Giới thiệu
                </div>
                <div className='2xl:text-base text-sm text-[#000000] font-light space-y-2'>
                    <div className='flex flex-col gap-2'>
                        <span>
                            Chào mừng bạn đến với nền tảng Kanow.vn (bao gồm website và ứng dụng di động) được được vận hành bởi Công ty TNHH Kanow. Kanow thông báo đến bạn và cần sự đồng ý và cho phép của bạn để xử lý, thu thập và lưu trữ dữ liệu của bạn nhằm mục đích cung cấp các dịch vụ cho bạn trong suốt quá trình sử dụng Website và Ứng dụng di động, chúng tôi cam kết nghiêm túc thực hiện trách nhiệm của mình liên quan đến bảo mật thông tin cá nhân và tôn trọng quyền riêng tư của tất cả người dùng trên nền tảng.
                        </span>

                        <span>
                            Kanow là một sàn giao dịch thương mại điện tử (“Sàn TMĐT) đã được đăng ký với Bộ Công Thương. Người dùng trên sàn bao gồm người bán (chủ xe), người mua (khách thuê) và các bên khác sử dụng dịch vụ của chúng tôi.
                        </span>

                        <span>
                            {`"Dữ Liệu Cá Nhân" có nghĩa là dữ liệu, dù đúng hay không, về một cá nhân mà thông qua đó có thể xác định được danh tính, hoặc từ dữ liệu đó và thông tin khác mà một tổ chức có hoặc có khả năng tiếp cận. Các ví dụ thường gặp về dữ liệu cá nhân có thể gồm có tên, số chứng minh nhân dân/căn cước công dân, mã số thuế, giấy phép lái xe và thông tin liên hệ.`}
                        </span>

                        <span>
                            {`Chính sách bảo mật này ("Chính sách bảo mật" hay "Chính sách") được thiết kế để giúp bạn hiểu được cách thức chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân mà bạn đã cung cấp cho chúng tôi và/hoặc lưu giữ về bạn, cho dù là hiện nay hoặc trong tương lai, cũng như để giúp bạn đưa ra quyết định sáng suốt trước khi cung cấp cho chúng tôi bất kỳ dữ liệu cá nhân nào của bạn.`}
                        </span>

                        <span>
                            Bằng việc sử dụng Các Dịch Vụ, đăng ký tài khoản với chúng tôi hoặc truy cập Nền tảng, bạn xác nhận và đồng ý rằng bạn chấp nhận các phương pháp, yêu cầu, và/hoặc chính sách được mô tả trong Chính sách bảo mật này, và theo đây bạn đồng ý cho phép chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn như mô tả trong đây. Việc cho phép này sẽ có hiệu lực và bắt đầu từ thời điểm bạn đồng ý cho đến khi bạn quyết định rút lại sự đồng ý hoặc tự động kết thúc trong các trường hợp theo quy định của pháp luật.
                        </span>

                        <span>
                            Nếu bạn không đồng ý cho phép xử lý dữ liệu của bạn theo quy định này, vui lòng không sử dụng các dịch vụ của chúng tôi hoặc truy cập nền tảng của chúng tôi hoặc thông báo ngay cho chúng tôi về việc không đồng ý của bạn trong trương hợp bạn đã đồng ý trước đó.
                        </span>

                        <span>
                            Nếu có bất kỳ thay đổi nào về Chính sách bảo mật của mình, chúng tôi sẽ thông báo cho bạn bao gồm cả thông qua việc đăng tải những thay đổi đó hoặc Chính sách bảo mật sửa đổi trên Nền tảng của chúng tôi. Trong phạm vi pháp luật cho phép, việc tiếp tục sử dụng các Dịch Vụ hoặc Nền Tảng, bao gồm giao dịch của bạn, được xem là bạn đã công nhận và đồng ý với các thay đổi trong Chính Sách Bảo Mật này.
                        </span>

                        <span>
                            Chính sách này áp dụng cùng với các thông báo, điều khoản hợp đồng, điều khoản chấp thuận khác áp dụng liên quan đến việc chúng tôi thu thập, lưu trữ, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn và không nhằm ghi đè những thông báo hoặc các điều khoản đó trừ khi chúng tôi có tuyên bố ràng khác.
                        </span>

                        <span>
                            Chính sách này được áp dụng cho tất cả người dùng đang sử dụng Dịch vụ/Nền tảng trừ khi có tuyên bố rõ ràng ngược lại.
                        </span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl text-[#000000] font-medium'>
                    2. Khi nào Kanow sẽ thu thập dữ liệu cá nhân?
                </div>
                <div className='2xl:text-base text-sm text-[#000000] font-light space-y-2'>
                    <div className='flex flex-col gap-2'>
                        <span>
                            Chúng tôi sẽ/có thể thu thập dữ liệu cá nhân về bạn:
                        </span>

                        <div>
                            <ul className="list-disc list-inside">
                                <li>Khi bạn đăng ký và/hoặc sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi</li>
                                <li>Khi bạn gửi bất kỳ biểu mẫu nào, bao gồm đơn đăng ký hoặc các mẫu đơn khác liên quan đến bất kỳ sản phẩm và dịch vụ nào của chúng tôi, bằng hình thức trực tuyến hay dưới hình thức khác</li>
                                <li>Khi bạn ký kết bất kỳ thỏa thuận nào hoặc cung cấp các tài liệu hoặc thông tin khác liên quan đến tương tác giữa bạn với chúng tôi/khách hàng của chúng tôi, hoặc khi bạn sử dụng các sản phẩm và dịch vụ của chúng tôi</li>
                                <li>Khi bạn tương tác với chúng tôi, chẳng hạn như thông qua các cuộc gọi điện thoại (có thể được ghi âm lại), thư từ, fax, gặp gỡ trực tiếp, các nền ứng dụng truyền thông xã hội và email</li>
                                <li>Khi bạn sử dụng các dịch vụ điện tử của chúng tôi, hoặc tương tác với chúng tôi qua Nền tảng hoặc Trang Web hoặc Các Dịch Vụ của chúng tôi. Trường hợp này bao gồm thông qua tập tin cookie mà chúng tôi có thể triển khai khi bạn tương tác với các Nền tảng hoặc Trang Web của chúng tôi</li>
                                <li>Khi bạn liên kết tài khoản Kanow với tài khoản mạng xã hội của bạn hoặc các tài khoản bên ngoài khác hoặc sử dụng các tính năng mạng xã hội khác, phù hợp với các chính sách của nhà cung cấp</li>
                                <li>Khi bạn thực hiện các giao dịch thông qua Dịch vụ của chúng tôi</li>
                                <li>Khi bạn cung cấp ý kiến phản hồi hoặc gửi khiếu nại cho chúng tôi</li>
                                <li>Khi bạn đăng ký tham gia một cuộc thi</li>
                                <li>Khi bạn gửi dữ liệu cá nhân của bạn cho chúng tôi vì bất kỳ lý do gì.</li>
                            </ul>
                            <span>
                                Các trường hợp trên không nhằm mục đích liệt kê đầy đủ các trường hợp và chỉ đưa ra một số trường hợp phổ biến về thời điểm dữ liệu cá nhân của bạn có thể bị thu thập.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl text-[#000000] font-medium'>
                    3. Phạm vi, mục đích thu thập và sử dụng thông tin
                </div>
                <div className='2xl:text-base text-sm text-[#000000] font-light space-y-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='underline underline-offset-2 font-semibold'>
                            Phạm vi thu thập
                        </div>

                        <div className='space-x-2'>
                            <span className='font-semibold'>Đối với Người bán/chủ xe:</span>
                            <span>Họ tên, email, chứng minh nhân dân/căn cước công dân, mã số thuế, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ sinh sống, tài khoản ngân hàng và thông tin thanh toán, các hình ảnh và thông tin về sản phẩm muốn đăng tải trên nền tảng.</span>
                        </div>

                        <div className='space-x-2'>
                            <span className='font-semibold'>Đối với Người mua/khách thuê:</span>
                            <span>Họ tên, email, chứng minh nhân dân/căn cước công dân, giấy phép lái xe ô tô, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ sinh sống, tài khoản ngân hàng và thông tin thanh toán.</span>
                        </div>

                        <div>
                            Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình. Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho Kanow về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
                        </div>

                        <div>
                            Bạn đồng ý không cung cấp cho chúng tôi bất cứ thông tin nào không chính xác hoặc gây hiểu nhầm và bạn đồng ý sẽ thông báo cho chúng tôi về bất cứ thông tin nào không chính xác hoặc khi có sự thay đổi thông tin.
                        </div>

                        <div>
                            Nếu bạn đăng nhập để trở thành người dùng các Nền tảng của chúng tôi sử dụng tài khoản mạng xã hội của Bạn (“Tài khoản Mạng Xã hội”), liên kết tài khoản của bạn với Tài khoản Mạng Xã hội của bạn hoặc sử dụng bất cứ tính năng mạng xã hội nào, chúng tôi có quyền truy cập thông tin về bạn mà bạn đã cung cấp một cách tự nguyên cho nhà cung cấp dịch vụ Tài khoản Mạng Xã hội của bạn và tuân theo các chính sách của các nhà cung cấp dịch vụ này, và chúng tôi sẽ quản lý và sử dụng các dữ liệu cá nhân này của bạn theo các quy định của Chính sách này tại mọi thời điểm.
                        </div>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <div className='underline underline-offset-2 font-semibold'>
                            Mục đích thu thập và sử dụng thông tin
                        </div>

                        <div>
                            Kanow thu thập thông tin thành viên để:
                        </div>

                        <div>
                            <ul className="list-disc list-inside">
                                <li>Xác minh danh tính của bạn và để quản lý tài khoản trực tuyến mà bạn có thể đã thiết lập với chúng tôi</li>
                                <li>Liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên website nhằm đảm bảo quyền lợi cho cho người tiêu dùng</li>
                                <li>Hỗ trợ việc đặt xe và cung cấp xe cho Khách hàng</li>
                                <li>Cung cấp các dịch vụ đến thành viên</li>
                                <li>Để xử lý các đơn đặt hàng bạn gửi qua Nền tảng</li>
                                <li>Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và Kanow bao gồm nhưng không giới hạn: chương trình khuyến mại, khảo sát ý kiến, tiếp thị và quảng cáo sản phẩm</li>
                                <li>Liên lạc với bạn để xử lý và trả lời các truy vấn, phản hồi, khiếu nại hoặc tranh chấp của bạn, cho dù trực tiếp hoặc thông qua bất kỳ nhà cung cấp dịch vụ khách hàng được thuê ở bên ngoài nào</li>
                                <li>Để lập số liệu thống kê và nghiên cứu đáp ứng yêu cầu báo cáo và/hoặc duy trì sổ sách nội bộ hoặc theo quy định</li>
                                <li>Để thực hiện quy trình tìm hiểu và xác minh hoặc các hoạt động sàng lọc khác (bao gồm nhưng không giới hạn kiểm tra lý lịch) tuân thủ các nghĩa vụ theo quy định pháp luật hoặc cơ quan nhà nước có thẩm quyền hoặc các thủ tục kiểm soát rủi ro của chúng tôi, có thể được pháp luật yêu cầu hoặc có thể đã được chúng tôi áp dụng</li>
                                <li>Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc các hoạt động giả mạo thành viên</li>
                                <li>Để ngăn chặn hoặc điều tra bất kỳ hoạt động gian lận thực tế hoặc bị nghi ngờ nào đối với Điều khoản dịch vụ của chúng tôi, gian lận, các hành vi phi pháp, thiếu sót hay hành vi sai trái nào, cho dù có liên quan đến việc bạn sử dụng Các Dịch Vụ của chúng tôi hay không hay bất kỳ vấn đề nào phát sinh từ quan hệ của bạn với chúng tôi;Phạm vi sử dụng thông tin</li>
                                <li>Để bảo vệ quyền lợi của công ty và những đối tác của công ty: Chúng tôi chỉ đưa ra những thông tin cá nhân của khách hàng khi chắc chắn rằng những thông tin đó có thể bảo vệ được quyền lợi, tài sản của công ty chúng tôi và những đối tác liên quan. Những thông tin này sẽ được tiết lộ một cách hợp pháp theo Pháp luật Việt Nam.</li>
                                <li>Trong trường hợp có yêu cầu của pháp luật: Kanow có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi có yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan thuế, cơ quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của thành viên. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của thành viên.</li>
                            </ul>
                            <span>
                                Các trường hợp trên không nhằm mục đích liệt kê đầy đủ các trường hợp và chỉ đưa ra một số trường hợp phổ biến về thời điểm dữ liệu cá nhân của bạn có thể bị thu thập.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecurityInfo