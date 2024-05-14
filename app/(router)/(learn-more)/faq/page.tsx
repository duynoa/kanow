import React from 'react'

type Props = {}

const PolicyRegulations = (props: Props) => {
    return (
        <div className='flex flex-col gap-4 2xl:pb-20 pb-16'>
            <div className='3xl:text-4xl text-2xl text-[#000000] font-semibold'>
                Câu hỏi thường gặp
            </div>

            <div className='flex flex-col gap-2 mt-6'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    1. Thuê xe tháng hay thuê xe chạy Grab
                </div>
                <div className='2xl:text-lg text-base text-[#000000] font-normal'>
                    Mục đích lâu dài của Kanow là hướng đến việc xây dựng cộng đồng chia sẻ xe ô tô văn minh và uy tín tại Việt Nam. Vì thế, để đảm bảo các giao dịch thuê xe trong cộng đồng được diễn ra một cách thuận lợi và thành công tốt đẹp thì việc quy định trách nhiệm của các bên trong tuân thủ các chính sách của Kanow và các điều khoản cam kết là rất quan trọng.
                </div>
                <div className='2xl:text-base text-sm text-[#000000] font-light space-y-2'>
                    <div>
                        A. Trách nhiệm của chủ xe
                        <br />
                        - Giao xe và toàn bộ giấy tờ liên quan đến xe đúng thời gian và trong tình trạng an toàn, vệ sinh sạch sẽ nhằm đảm bảo chất lượng dịch vụ.
                        <br />
                        - Các giấy tờ xe liên quan bao gồm: giấy đăng ký xe (bản photo công chứng), giấy kiểm định, giấy bảo hiểm xe (bản photo công chứng hoặc bản gốc).
                        <br />
                        - Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe.
                    </div>

                    <div>
                        B. Trách nhiệm khách thuê xe
                        <br />
                        - Kiểm tra kỹ xe trước khi nhận và trước khi hoàn trả xe. Kí xác nhận biên bản bàn giao về tình trạng xe khi nhận và khi hoàn trả.
                        <br />
                        - Thanh toán đầy đủ tiền thuê xe cho Chủ xe khi nhận xe.
                        <br />
                        - Tại thời điểm nhận xe khách hàng xuất trình đầy đủ các giấy tờ liên quan cho chủ xe: GPLX, CCCD (chụp hình đối chiếu) Hoặc Hộ chiếu (passport) bản gốc giữ lại. Đặt cọc tài sản thế chấp tiền mặt(15 triệu hoặc theo thỏa thuận với chủ xe) hoặc xe máy có giá trị tương đương 15 triệu trở lên (xe máy và cavet gốc) trước khi nhận xe.
                        <br />
                        - Đối với trường hợp chủ xe hỗ trợ chính sách miễn thế chấp: Khách hàng không cần để lại tài sản (xe máy hoặc 15triệu tiền mặt) khi thuê xe của chủ xe. Trường hợp phát sinh các chi phí khác (nếu có) trong quá trình thuê xe, khách hàng vui lòng thanh toán trực tiếp cho chủ xe khi làm thủ tục trả xe.
                        <br />
                        - Tuân thủ quy định và thời gian trả xe như 2 bên đã thỏa thuận.
                        <br />
                        - Chịu trách nhiệm đền bù mọi thất thoát về phụ tùng, phụ kiện của xe, đền bù 100% theo giá phụ tùng chính hãng nếu phát hiện phụ tùng bị tráo đổi, chịu 100% chi phí sửa chữa xe nếu có xảy ra hỏng hóc tùy theo mức độ hư tổn của xe, chi phí các ngày xe nghỉ không chạy được do lỗi của khách thuê xe (giá được tính bằng giá thuê trong hợp đồng) và các khoản phí vệ sinh xe nếu có.
                    </div>

                    <div>
                        C. Trách nhiệm và khuyến nghị của Kanow
                        <br />
                        - Kanow khuyến nghị Chủ xe và Khách thuê xe cần thực hiện việc giao kết bằng văn bản &quot;Hợp đồng cho thuê xe tự lái&quot; cũng như kí kết &quot;Biên bản bàn giao xe&quot; nhằm đảm bảo quyền lợi của cả 2 bên trong trường hợp phát sinh tranh chấp.
                        <br />
                        - Chủ xe có thể tham khảo sử dụng mẫu &quot;Hợp đồng thuê xe tự lái&quot; và &quot;Biên bản bàn giao xe&quot; của Kanow (vui lòng cung cấp email cho bộ phận CSKH của Kanow để nhận thông tin).
                        <br />
                        - Chủ xe và khách thuê xe tự chịu toàn bộ trách nhiệm dân sự và hình sự nếu có phát sinh tranh chấp giữa hai bên nếu có. Kanow chỉ đóng vai trò hỗ trợ hai bên dàn xếp các vấn đề một cách tốt đẹp nhất, tuân theo các điều khoản, chính sách và quy chế hoạt động cả hai bên đã cam kết với Kanow.
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    2. Thuê xe có tài?
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    <div>
                        Hiện tại, Kanow chỉ đóng vai trò là sàn giao dịch thương mại điện tử về cho thuê xe ô tô, là cầu nối giữa các chủ xe và khách hàng có nhu cầu thuê xe. Về cơ bản, mọi thủ tục và toàn bộ các vấn đề phát sinh liên quan đến giao dịch cho thuê xe giữa chủ xe và khách thuê sẽ do hai bên tự thỏa thuận, kí hợp đồng và chịu trách nhiệm với nhau.
                        <br />
                        Trong trường hợp có xảy ra sự cố ngoài ý muốn như xe bị cầm cố, thế chấp, bị bắt khi được dùng để vận chuyển ma túy, hàng quốc cấm hoặc gây ra tai nạn, Kanow sẽ cố gắng hỗ trợ tốt nhất các chủ xe trong khả năng của mình, giới hạn ở việc hướng dẫn chủ xe các thủ tục cần thiết để trình báo với cơ quan công an và các cơ quan có thẩm quyền, cung cấp các thông tin nếu có liên quan đến thành viên thuê xe hoặc các thông tin khác nếu có yêu cầu từ cơ quan chức năng, và tiến hành khóa vĩnh viễn tài khoản thành viên vi phạm.
                        <br />
                        Để bảo vệ tốt nhất tài sản của mình và giảm thiểu tối đa các rủi ro có thể xảy ra, các chủ xe cần ràng buộc chặt chẽ về mặt pháp lí bằng việc giao kết bằng văn bản &quot;Hợp đồng cho thuê xe tự lái&quot;, &quot;Biên bản bàn giao xe&quot; (có thể tham khảo sử dụng mẫu hợp đồng và biên bản bàn giao do Kanow đề xuất hoặc có thể sử dụng mẫu riêng của nhà xe), xác minh đầy đủ thông tin và các giấy tờ cá nhân của khách thuê, giữ lại tài sản đặt cọc và các giấy tờ cần thiết (và tuyệt đối không giao cà vẹt xe bản chính cho khách thuê). Các chủ xe cũng cần trang bị cho xe thiết bị định vị GPS để có thể theo dõi và kiểm tra vị trí xe thường xuyên nhằm có các phương án xử lí kịp thời.
                        <br />
                        Thời gian tới, nhằm bảo vệ một cách toàn diện nhất quyền lợi của các chủ xe cũng như khách thuê, Kanow đang xúc tiến làm việc với các đối tác bảo hiểm để triển khai các sản phẩm bảo hiểm đối với dịch vụ thuê xe tự lái theo ngày, áp dụng cho tất cả các giao dịch cho thuê được thực hiện thông qua ứng dụng Kanow.
                        <br />
                        Kanow hy vọng sẽ sớm hoàn thiện và triển khai gói giải pháp này trong thời gian sớm nhất
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    3. Ưu đãi khi giới thiệu bạn bè hoặc thuê xe nhiều lần
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    <div>
                        A. Dành cho khách thuê xe
                        <br />
                        Bạn là khách thuê xe, sau khi đã đặt cọc và đặt xe thành công, bạn có thể hủy chuyến đi đã đặt bằng cách gửi “Yêu cầu hủy chuyến” thông qua trang web kanow.vn hoặc ứng dụng Kanow, và lựa chọn lý do hủy chuyến.
                        <br />
                        Nếu thật sự muốn hủy chuyến, bạn nên lưu ý thực hiện việc này càng sớm càng tốt vì Kanow sẽ tiến hành hoàn trả số tiền đặt cọc cho bạn tùy thuộc vào thời điểm bạn gửi yêu cầu hủy chuyến. Số tiền đặt cọc Kanow sẽ hoàn trả cho bạn được tính như sau
                        <br />
                        <div className='border border-[#C6C6C6] rounded-xl my-4'>
                            <div className='grid grid-cols-3 grid-rows-4'>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm font-medium'>
                                    Thời điểm Huỷ Chuyến
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm font-medium'>
                                    Phí huỷ chuyến
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm font-medium'>
                                    Số tiền cọc trả
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    Trong vòng một giờ sau khi đặt cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    0% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm'>
                                    100% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    &gt; 7 ngày trước khởi hành
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    30% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm'>
                                    70% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    {"<= 7 ngày trước chuyến đi"}
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    100% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm'>
                                    0% Tiền cọc
                                </div>
                                <div className='col-span-3 row-span-1 p-3 text-sm font-normal'>
                                    {"Trường hợp phát sinh Phí hủy chuyến, Kanow sẽ trừ vào tiền đặt cọc của Quý khách hàng và sẽ thanh toán lại khoản tiền này cho Đối tác chủ xe (và ngược lại, trường hợp Đối tác chủ xe hủy chuyến được đến phát sinh Phí hủy chuyến, Kanow sẽ hoàn trả lại 100% tiền cọc và tiền phí hủy chuyến được đền bù cho Quý khách trong 1 - 3 ngày làm việc)."}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        B. Dành cho Chủ xe
                        <br />
                        Nếu bạn là chủ xe, trong trường hợp bạn muốn hủy chuyến sau khi khách hàng đã đặt xe thành công, bạn có thể thực hiện thao tác hủy chuyến trên ứng dụng Kanow.
                        <br />
                        Nhằm gia tăng sự cam kết của chủ xe cũng như đảm bảo quyền lợi của khách thuê, trường hợp chủ xe hủy chuyến (vì lí do không giao đúng xe / không giao xe đúng thời gian), nếu như không thỏa thuận được hoặc không có sự đồng ý từ phía khách thuê, thì chủ xe phải bồi thường phí hủy chuyến cho khách thuê số tiền bằng đúng số tiền mà khách thuê đã đặt cọc thông qua Công ty Cổ phần Kanow Asia.
                        <br />
                        <div className='border border-[#C6C6C6] rounded-xl my-4'>
                            <div className='grid grid-cols-3 grid-rows-4'>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm font-medium'>
                                    Thời điểm Huỷ Chuyến
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm font-medium'>
                                    Phí huỷ chuyến
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm font-medium'>
                                    Đánh giá hệ thống
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    Trong vòng một giờ sau khi đặt cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    0% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm'>
                                    100% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    &gt; 7 ngày trước khởi hành
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    30% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm'>
                                    70% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    {"<= 7 ngày trước chuyến đi"}
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-l-0 text-center p-4 text-sm'>
                                    100% Tiền cọc
                                </div>
                                <div className='col-span-1 row-span-1 border border-[#C6C6C6] border-t-0 border-x-0 text-center p-4 text-sm'>
                                    0% Tiền cọc
                                </div>
                                <div className='col-span-3 row-span-1 p-3 text-sm font-normal'>
                                    {"Trường hợp phát sinh Phí hủy chuyến, Kanow sẽ trừ vào tài khoản của Quý đối tác và sẽ thanh toán lại khoản tiền này cho khách hàng (và ngược lại, trường hợp khách hàng hủy chuyến dẫn đến phát sinh Phí hủy chuyến, Kanow sẽ cộng tiền phí vào tài khoản Quý đối tác)."}
                                </div>
                            </div>
                        </div>
                        Phí hủy chuyến sẽ được trừ vào tài khoản của bạn trên Kanow. Trong trường hợp số dư tài khoản của bạn nhỏ hơn số tiền phí hủy chuyến, phần chênh lệch sẽ được ghi âm vào tài khoản và sẽ cấn trừ vào thu nhập của bạn cho các chuyến xe tiếp theo.
                        <br />
                        Bên cạnh việc chịu phí, các chủ xe thực hiện hủy chuyến nhiều lần sẽ bị tạm khóa tài khoản thành viên trên ứng dụng Kanow.
                        <br />
                        {"Bộ phận CSKH của Kanow sẽ liên hệ với khách thuê xe thông báo về tình hình chuyến đi bị hủy, và tiến hành hoàn trả lại 100% tiền cọc và tiền phí hủy chuyến được đền bù (nếu có) cho khách thuê."}
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    4. Bảo hiểm 2 chiều khi thuê xe trên Mioto?
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    <div>
                        A. Dành cho khách thuê xe
                        <br />
                        Trên ứng dụng Kanow, mỗi dòng xe sẽ được cho thuê tại các mức giá khác nhau tùy thuộc vào sự quyết định của các chủ xe và được niêm yết công khai.
                        <br />
                        Về cơ bản, cơ cấu giá của một chuyến đi được tính bao gồm các thành phần:
                        <br />
                        - Đơn giá thuê: Là giá thuê niêm yết bởi chủ xe mà bạn dễ dàng nhìn thấy trong phần thông tin xe. Giá thuê trên Kanow được tính theo đơn vị nhỏ nhất là ngày. Chủ xe có thể điều chỉnh giá thuê khác nhau cho từng ngày, chính vì vậy, chi phí thuê xe của bạn có thể tăng hoặc giảm tùy vào thời điểm bạn thuê xe. Thông thường, giá thuê sẽ cao hơn trong dịp cuối tuần và các ngày lễ, tết.
                        <br />
                        - Chiết khấu: một số chủ xe có chính sách chiết khấu cho các chuyến xe kéo dài 1 tuần hoặc 1 tháng (mức chiết khấu bình quân từ 5-20% tùy vào quyết định của chủ xe). Vì thế, nếu bạn có nhu cầu thuê xe du lịch hay công tác dài ngày, hãy ưu tiên lựa chọn các chủ xe này để có được mức giá tốt hơn.
                        <br />
                        - Chi phí vận chuyển: nếu bạn không có nhiều thời gian để đến trực tiếp địa diểm của chủ xe để nhận xe, bạn có thể lựa chọn các chủ xe có cung cấp thêm dịch vụ giao xe tận nơi. Chi phí giao nhận xe bình quân từ 5,000-15,000VND/km tùy vào quyết định của chủ xe được thể hiện tại phần thông tin xe và sẽ được cộng vào chi phí thuê xe của bạn.
                        <br />
                        - Mã khuyến mãi: là mã giảm giá mà Kanow gửi tặng đến các thành viên của mình cho trong các đợt khuyến mãi, hoặc dành cho các thành viên thân thiết giao dịch thường xuyên trên ứng dụng Kanow. Mã khuyến mãi này sẽ được trừ trực tiếp vào chi phí thuê xe của bạn.
                        <br />
                        Bảng tóm tắt:
                        <br />
                        <div className='border border-[#C6C6C6] rounded-xl my-4'>
                            <div className='grid grid-rows-4'>
                                <div className='row-span-1 px-4 py-4 text-sm border-b border-[#C6C6C6] font-normal'>
                                    Phí thuê xe = Đơn giá thuê ngày * Số ngày (Giá các ngày có thể thay đổi)
                                </div>
                                <div className='row-span-1 px-4 py-4 text-sm border-b border-[#C6C6C6] font-normal'>
                                    Chiết khấu = % Chiết khấu * Phí thuê xe
                                </div>
                                <div className='row-span-1 px-4 py-4 text-sm border-b border-[#C6C6C6] font-normal'>
                                    Phí vận chuyển = Đơn giá vận chuyển * Số km
                                </div>
                                <div className='row-span-1 px-4 py-4 text-sm font-normal'>
                                    Khuyến mãi = % Khuyến mãi x (Phí thuê xe – Chiết khấu + Phí vận chuyển)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        B. Dành cho Chủ xe
                        <br />
                        Các chủ xe của Kanow được quyền thiết lập giá thuê xe hàng ngày cho tháng hiện hành và tối đa 3 tháng kế tiếp. Bạn có thể sử dụng giá đề xuất của Kanow hoặc có thể tùy chỉnh giá cho thuê theo mong muốn của bạn.
                        <br />
                        - Giá đề xuất của Kanow: được định vị thấp hơn 10% so với giá thuê xe bình quân trên thị trường. Mức giá này được tiến hành khảo sát hàng tháng bởi bộ phận phát triển thị trường của Kanow đối với từng dòng xe khác nhau.
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    5. Chính sách thanh toán?
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    <div>
                        Sau khi nhận được sự đồng ý cho thuê xe từ phía chủ xe, tại bước cuối cùng, bạn cần phải đặt cọc trước cho Kanow 30% tổng chi phí chuyến đi. Bạn có thể chọn lựa hình thức thanh toán chuyển khoản qua ngân hàng trực tuyến hoặc sử dụng thẻ Visa.
                        Phần còn lại 70% bạn có thể thanh toán trực tiếp cho chủ xe ngay khi nhận được xe.
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    6. Chính sách thời gian giao nhận?
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    <div>
                        Thời gian thuê xe mặc định trong hệ thống được thiết lập từ 9h tối đến 8h tối ngày kế tiếp. Tuy nhiên, khách hàng cũng có thể tùy chỉnh lựa chọn thời gian thuê xe theo nhu cầu của mình, trong vòng 24 tiếng sẽ được tính 1 ngày.
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='2xl:text-2xl text-xl  text-[#000000] font-medium'>
                    7. Chính sách kết thúc sớm chuyến đi?
                </div>
                <div className='2xl:text-base text-sm  text-[#000000] font-light space-y-2'>
                    <div>
                        Trong trường hợp bạn muốn kết thúc sớm chuyến đi của mình khi vẫn chưa đến thời hạn trả xe, để có thể được hoàn lại tiền cho các ngày chưa sử dụng, bạn nên trao đổi trước với chủ xe và cần phải nhận được sự đồng ý từ phía chủ xe. Số tiền được hoàn lại sẽ do bạn và chủ xe tự thỏa thuận với nhau. Lưu ý rằng, bạn sẽ không được hoàn lại số tiền bạn đã đặt cọc cho Kanow.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PolicyRegulations