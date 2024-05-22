'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { uuidv4 } from '@/lib/uuid'

import { IoArrowForwardOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import BlurImage from '@/components/image/BlurImage'
import PaginationCustom from '@/components/pagination/PaginationCustom'

type Props = {}

const Career = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const dataCarRelated = [
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car1.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car2.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ Đáng Nhớ Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car2.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car2.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car1.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car2.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car2.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car1.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car2.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car1.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car1.png",
            type: "Thông báo",
        },
        {
            id: uuidv4(),
            title: "Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ",
            description: "Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình.Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.",
            image: "/card/card_car2.png",
            type: "Thông báo",
        },
    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) {
        return null;
    }

    return (
        <div className='custom-container flex flex-col gap-8 xl:py-10 py-6'>
            <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-6 gap-4 justify-start h-full w-full'>
                {
                    dataCarRelated.length > 0 && dataCarRelated?.map((item) => (
                        <Link
                            key={`news-${item.id}`}
                            className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 group hover:scale-[1.02] transition duration-200 ease-in-out'
                            href={`/news-events/${item.id}?${ConvertToSlug(item?.title)}`}
                            prefetch={false}
                        >
                            <div className='w-full 3xl:h-[220px] xxl:h-[180px] xl:h-[180px] h-[180px] relative overflow-hidden rounded-xl'>
                                <Image
                                    width={600}
                                    height={600}
                                    alt="image_card"
                                    src={item.image}
                                    className='w-full h-full object-fill rounded-xl group-hover:scale-[1.05] duration-200 ease-in-out transition'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                    {item.type || ""}
                                </div>
                                <div className='3xl:text-xl 2xl:text-[17px] xxl:text-[17px] xl:text-base lg:text-base md:text-xl text-xl  text-[#272D37] font-semibold group-hover:text-[#272D37]/70 duration-500 transition ease-in-out line-clamp-2'>
                                    {item.title}
                                </div>
                                <div className='3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out line-clamp-3'>
                                    {/* <span dangerouslySetInnerHTML={{ __html: `${e?.description ? e?.description : ''}` }} className="whitespace-break-spaces"></span> */}
                                    {item.description}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>

            <PaginationCustom data={dataCarRelated} />
        </div>
    )
}

export default Career