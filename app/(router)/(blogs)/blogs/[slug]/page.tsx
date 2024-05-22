import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const DetailBlog = (props: Props) => {
    const dataFake = [
        {
            "id": 3,
            "name": "BMW 320i 2018",
            "number_car": "51K12345",
            "year_manu": "2018",
            "number_seat": 4,
            "type": 1,
            "type_talent": 0,
            "car": {
                "rent_cost": 1200000,
                "book_car_flash": 0,
                "from_book_car_flash": 0,
                "to_book_car_flash": 0,
                "delivery_car": 0,
                "km_delivery_car": 0,
                "fee_km_delivery_car": 0,
                "free_km_delivery_car": 0,
                "total_km_day": 0,
                "rules": null
            },
            "car_talent": [],
            "status": {
                "id": 1,
                "name": "Đang hoạt động",
                "color": "#81c868"
            },
            "transmission": "Số tự động",
            "transmission_id": 2,
            "type_fuel": "Xăng",
            "type_fuel_id": 1,
            "fuel_consumption": null,
            "detail": "<div>BMW 320i cho thu&ecirc; tự l&aacute;i, c&oacute; t&agrave;i, xe hoa.</div>\r\n<div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe Vin Fast Fadil số tự động xe mới đăng k&yacute; th&aacute;ng 4/2022.</div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe gia đ&igrave;nh mới đẹp, bản cao cấp. Nội thất sạch sẽ, bảo dưỡng thường xuy&ecirc;n.</div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe rộng r&atilde;i, an to&agrave;n, tiện nghi động cơ 1.4 mạnh mẽ khỏe khoắn.</div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe c&oacute; cảm biến m&agrave; camera l&ugrave;i, camera h&agrave;nh tr&igrave;nh.</div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">\r\n<div>BMW 320i cho thu&ecirc; tự l&aacute;i, c&oacute; t&agrave;i, xe hoa.</div>\r\n<div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe Vin Fast Fadil số tự động xe mới đăng k&yacute; th&aacute;ng 4/2022.</div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe gia đ&igrave;nh mới đẹp, bản cao cấp. Nội thất sạch sẽ, bảo dưỡng thường xuy&ecirc;n.</div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe rộng r&atilde;i, an to&agrave;n, tiện nghi động cơ 1.4 mạnh mẽ khỏe khoắn.</div>\r\n<div class=\"3xl:text-base text-sm text-[#585F71]\">Xe c&oacute; cảm biến m&agrave; camera l&ugrave;i, camera h&agrave;nh tr&igrave;nh.</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"ddict_btn\" style=\"top: 141px; left: 366.734px;\"><img src=\"chrome-extension://bpggmmljdiliancllaapiggllnkbjocb/logo/48.png\" /></div>",
            "rules": null,
            "rent_cost": 1200000,
            "address": null,
            "district": "Quận Bình Thạnh",
            "province": " Hồ Chí Minh",
            "discount": 0,
            "percent_discount": 0,
            "book_car_flash": 0,
            "from_book_car_flash": 0,
            "to_book_car_flash": 0,
            "delivery_car": 0,
            "km_delivery_car": 0,
            "fee_km_delivery_car": 0,
            "free_km_delivery_car": 0,
            "total_km_day": 0,
            "location": {
                "address": null,
                "district": "Quận Bình Thạnh",
                "province": " Hồ Chí Minh",
                "district_id": 553,
                "province_id": 50,
                "wards_id": 8712,
                "latitude": null,
                "longitude": null,
                "distance": null
            },
            "mortgage": 0,
            "note_mortgage": null,
            "total_trip": 0,
            "star": null,
            "total_review_car": 0,
            "review_car": [],
            "image_car": [
                {
                    "id": 69,
                    "name": "car/3/ltqxiYDpZL___cqfEit_zvmAbT3Pzn2Lnkw.jpg",
                    "car_id": 3,
                    "type": 1,
                    "position": 0,
                    "created_at": "2024-03-20T07:16:22.000000Z",
                    "updated_at": "2024-03-20T07:16:22.000000Z"
                },
                {
                    "id": 70,
                    "name": "car/3/g9HzCHz3Rm___O9lzeEEfBLVPLZek4s0orQ.jpg",
                    "car_id": 3,
                    "type": 1,
                    "position": 0,
                    "created_at": "2024-03-20T07:16:22.000000Z",
                    "updated_at": "2024-03-20T07:16:22.000000Z"
                },
                {
                    "id": 71,
                    "name": "car/3/LX0HMAWrDK___0LCvIWiYX-DrIFECR_Kr5A.jpg",
                    "car_id": 3,
                    "type": 1,
                    "position": 0,
                    "created_at": "2024-03-20T07:16:35.000000Z",
                    "updated_at": "2024-03-20T07:16:35.000000Z"
                }
            ],
            "company_car": {
                "id": 4,
                "name": "Mercedes",
                "image": "company_car/4/tnmkM2D8qh___Mercedes.png",
                "note": null,
                "created_at": "2024-02-29T01:52:41.000000Z",
                "updated_at": "2024-02-29T01:52:41.000000Z"
            },
            "type_car": {
                "id": 1,
                "name": "4 chỗ (Sedan)",
                "image": "type_car/1/j7R2kZcgfD___4-sedan-v2.png",
                "note": null,
                "created_at": "2024-02-29T02:59:07.000000Z",
                "updated_at": "2024-02-29T02:59:20.000000Z"
            },
            "promotion": [],
            "other_amenities_car": [
                {
                    "id": 3,
                    "name": "Bluetooth",
                    "image": "other_amenities_car/3/IJXdVnJAUm___bluetooth-v2.png",
                    "created_at": "2024-02-29T09:43:32.000000Z",
                    "updated_at": "2024-02-29T09:44:01.000000Z",
                    "pivot": {
                        "car_id": 3,
                        "other_amenities_car_id": 3
                    }
                },
                {
                    "id": 4,
                    "name": "Camera lùi",
                    "image": "other_amenities_car/4/GFmOI6YELz___reverse_camera-v2.png",
                    "created_at": "2024-02-29T09:44:23.000000Z",
                    "updated_at": "2024-02-29T09:44:23.000000Z",
                    "pivot": {
                        "car_id": 3,
                        "other_amenities_car_id": 4
                    }
                },
                {
                    "id": 5,
                    "name": "Cảm biến va chạm",
                    "image": "other_amenities_car/5/1QuBcVlebA___impact_sensor-v2.png",
                    "created_at": "2024-02-29T09:44:37.000000Z",
                    "updated_at": "2024-02-29T09:44:37.000000Z",
                    "pivot": {
                        "car_id": 3,
                        "other_amenities_car_id": 5
                    }
                },
                {
                    "id": 6,
                    "name": "Khe cắm USB",
                    "image": "other_amenities_car/6/6PC50HsJQ3___usb-v2.png",
                    "created_at": "2024-02-29T09:44:50.000000Z",
                    "updated_at": "2024-02-29T09:44:50.000000Z",
                    "pivot": {
                        "car_id": 3,
                        "other_amenities_car_id": 6
                    }
                },
                {
                    "id": 7,
                    "name": "Lốp dự phòng",
                    "image": "other_amenities_car/7/7CIiw2VOzV___spare_tire-v2.png",
                    "created_at": "2024-02-29T09:44:59.000000Z",
                    "updated_at": "2024-02-29T09:44:59.000000Z",
                    "pivot": {
                        "car_id": 3,
                        "other_amenities_car_id": 7
                    }
                },
                {
                    "id": 8,
                    "name": "ETC",
                    "image": "other_amenities_car/8/dlfHZgjNYN___etc-v2.png",
                    "created_at": "2024-02-29T09:45:11.000000Z",
                    "updated_at": "2024-02-29T09:45:11.000000Z",
                    "pivot": {
                        "car_id": 3,
                        "other_amenities_car_id": 8
                    }
                }
            ],
            "customer": {
                "id": 4,
                "fullname": "lê chí công",
                "avatar": "https://system.kanow.vn/upload/clients/4/17091143140_0df6356a-60a8-4547-a12e-5576242a304d.webp"
            },
            "favourite_car": false,
            "cancel_trip": null,
            "surcharge_car": [],
            "surcharge_car_new": [],
            "surcharge_car_talent": [],
            "documentation_policy_car": null,
            "mortgage_policy_car": null,
            "setting_price_car": null,
            "setting_insurance_car": null,
            "document_deposit": null,
            "document_payment": null,
            "car_setting": {
                "cancel_trip": null,
                "documentation_policy_car": null,
                "mortgage_policy_car": null,
                "setting_price_car": null,
                "setting_insurance_car": null,
                "document_deposit": null,
                "document_payment": null,
                "total_km_car_talent": null,
                "setting_service_car_talent": null,
                "setting_shuttle_car_talent": null
            },
            "price": {
                "rent_cost": 1200000,
                "rent_cost_day": 1377600,
                "price_insurance_day": 0,
                "percent_service": 14.8,
                "percent_insurance": 0,
                "percent_deposit": 0,
                "number_deposit_car": 0
            },
            "arrNotDay": null,
            "hour_receive_car": [],
            "hour_back_car": []
        },
        {
            "id": 2,
            "name": "MERCEDES C200 2019",
            "number_car": "51K.56789",
            "year_manu": "2019",
            "number_seat": 4,
            "type": 1,
            "type_talent": 1,
            "car": {
                "rent_cost": 1000000,
                "book_car_flash": 0,
                "from_book_car_flash": 0,
                "to_book_car_flash": 0,
                "delivery_car": 1,
                "km_delivery_car": 10,
                "fee_km_delivery_car": 5000,
                "free_km_delivery_car": 5,
                "total_km_day": 0,
                "rules": null
            },
            "car_talent": {
                "rent_cost": 1100000,
                "book_car_flash": 0,
                "from_book_car_flash": 0,
                "to_book_car_flash": 0,
                "delivery_car": 1,
                "km_delivery_car": 0,
                "fee_km_delivery_car": 0,
                "free_km_delivery_car": 0,
                "total_km_day": 800,
                "rules": ""
            },
            "status": {
                "id": 1,
                "name": "Đang hoạt động",
                "color": "#81c868"
            },
            "transmission": "Số tự động",
            "transmission_id": 2,
            "type_fuel": "Xăng",
            "type_fuel_id": 1,
            "fuel_consumption": null,
            "detail": "<div>Mercedes C200 Exculive 2021, kiểu dáng sang trọng , xe gia đình , sạch sẽ</div>",
            "rules": null,
            "rent_cost": 1000000,
            "address": "270 Đường Tôn Thất Thuyết, phường 3, Quận 4, Thành phố Hồ Chí Minh, Việt Nam",
            "district": "Quận 4",
            "province": " Hồ Chí Minh",
            "discount": 0,
            "percent_discount": 0,
            "book_car_flash": 0,
            "from_book_car_flash": 0,
            "to_book_car_flash": 0,
            "delivery_car": 1,
            "km_delivery_car": 10,
            "fee_km_delivery_car": 5000,
            "free_km_delivery_car": 5,
            "total_km_day": 0,
            "location": {
                "address": "270 Đường Tôn Thất Thuyết, phường 3, Quận 4, Thành phố Hồ Chí Minh, Việt Nam",
                "district": "Quận 4",
                "province": " Hồ Chí Minh",
                "district_id": 561,
                "province_id": 50,
                "wards_id": 8850,
                "latitude": 10.7532,
                "longitude": 106.696,
                "distance": null
            },
            "mortgage": 1,
            "note_mortgage": "Thế chấp 15.000.000 hoặc xe máy",
            "total_trip": 2,
            "star": null,
            "total_review_car": 0,
            "review_car": [],
            "image_car": [
                {
                    "id": 63,
                    "name": "car/2/7RhA7CE4P0___cboni3PwKwFf2Ihq09YX0g.jpg",
                    "car_id": 2,
                    "type": 1,
                    "position": 0,
                    "created_at": "2024-03-20T02:20:20.000000Z",
                    "updated_at": "2024-03-20T02:20:20.000000Z"
                },
                {
                    "id": 64,
                    "name": "car/2/SLkRpvL4ri___KxDR1knZUECbHWRSlsGezA.jpg",
                    "car_id": 2,
                    "type": 1,
                    "position": 0,
                    "created_at": "2024-03-20T02:20:20.000000Z",
                    "updated_at": "2024-03-20T02:20:20.000000Z"
                },
                {
                    "id": 65,
                    "name": "car/2/G2kNzsFDz6___ZJITO82hBtD4CJkwSqzmww.jpg",
                    "car_id": 2,
                    "type": 1,
                    "position": 0,
                    "created_at": "2024-03-20T02:20:20.000000Z",
                    "updated_at": "2024-03-20T02:20:20.000000Z"
                }
            ],
            "company_car": {
                "id": 4,
                "name": "Mercedes",
                "image": "company_car/4/tnmkM2D8qh___Mercedes.png",
                "note": null,
                "created_at": "2024-02-29T01:52:41.000000Z",
                "updated_at": "2024-02-29T01:52:41.000000Z"
            },
            "type_car": {
                "id": 1,
                "name": "4 chỗ (Sedan)",
                "image": "type_car/1/j7R2kZcgfD___4-sedan-v2.png",
                "note": null,
                "created_at": "2024-02-29T02:59:07.000000Z",
                "updated_at": "2024-02-29T02:59:20.000000Z"
            },
            "promotion": [
                {
                    "id": 6,
                    "name": "Tất cả chuyến",
                    "percent": 10,
                    "type": 2,
                    "price_promotion": 120000
                }
            ],
            "other_amenities_car": [
                {
                    "id": 3,
                    "name": "Bluetooth",
                    "image": "other_amenities_car/3/IJXdVnJAUm___bluetooth-v2.png",
                    "created_at": "2024-02-29T09:43:32.000000Z",
                    "updated_at": "2024-02-29T09:44:01.000000Z",
                    "pivot": {
                        "car_id": 2,
                        "other_amenities_car_id": 3
                    }
                },
                {
                    "id": 4,
                    "name": "Camera lùi",
                    "image": "other_amenities_car/4/GFmOI6YELz___reverse_camera-v2.png",
                    "created_at": "2024-02-29T09:44:23.000000Z",
                    "updated_at": "2024-02-29T09:44:23.000000Z",
                    "pivot": {
                        "car_id": 2,
                        "other_amenities_car_id": 4
                    }
                },
                {
                    "id": 5,
                    "name": "Cảm biến va chạm",
                    "image": "other_amenities_car/5/1QuBcVlebA___impact_sensor-v2.png",
                    "created_at": "2024-02-29T09:44:37.000000Z",
                    "updated_at": "2024-02-29T09:44:37.000000Z",
                    "pivot": {
                        "car_id": 2,
                        "other_amenities_car_id": 5
                    }
                },
                {
                    "id": 6,
                    "name": "Khe cắm USB",
                    "image": "other_amenities_car/6/6PC50HsJQ3___usb-v2.png",
                    "created_at": "2024-02-29T09:44:50.000000Z",
                    "updated_at": "2024-02-29T09:44:50.000000Z",
                    "pivot": {
                        "car_id": 2,
                        "other_amenities_car_id": 6
                    }
                },
                {
                    "id": 7,
                    "name": "Lốp dự phòng",
                    "image": "other_amenities_car/7/7CIiw2VOzV___spare_tire-v2.png",
                    "created_at": "2024-02-29T09:44:59.000000Z",
                    "updated_at": "2024-02-29T09:44:59.000000Z",
                    "pivot": {
                        "car_id": 2,
                        "other_amenities_car_id": 7
                    }
                },
                {
                    "id": 8,
                    "name": "ETC",
                    "image": "other_amenities_car/8/dlfHZgjNYN___etc-v2.png",
                    "created_at": "2024-02-29T09:45:11.000000Z",
                    "updated_at": "2024-02-29T09:45:11.000000Z",
                    "pivot": {
                        "car_id": 2,
                        "other_amenities_car_id": 8
                    }
                }
            ],
            "customer": {
                "id": 4,
                "fullname": "lê chí công",
                "avatar": "https://system.kanow.vn/upload/clients/4/17091143140_0df6356a-60a8-4547-a12e-5576242a304d.webp"
            },
            "favourite_car": false,
            "cancel_trip": null,
            "surcharge_car": [
                {
                    "id": 1,
                    "name": "Phí vượt hạn",
                    "note": null,
                    "value": 26000
                },
                {
                    "id": 2,
                    "name": "Phí quá giờ",
                    "note": "Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 5 tiếng. Phụ phí thêm 1 ngày thuê",
                    "value": 61000
                },
                {
                    "id": 4,
                    "name": "Phí khử mùi",
                    "note": "Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi...)",
                    "value": 501500
                },
                {
                    "id": 3,
                    "name": "Phí vệ sinh",
                    "note": "Phụ phí phát sinh khi hoàn trả xe không đảm bảo vệ sịnh (nhiều vết bẩn, bùn cát, sìn lầy...)",
                    "value": 150500
                }
            ],
            "surcharge_car_new": [
                {
                    "id": 1,
                    "name": "Phí vượt hạn",
                    "note": null,
                    "value": 26000
                },
                {
                    "id": 2,
                    "name": "Phí quá giờ",
                    "note": "Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 5 tiếng. Phụ phí thêm 1 ngày thuê",
                    "value": 61000
                },
                {
                    "id": 4,
                    "name": "Phí khử mùi",
                    "note": "Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi...)",
                    "value": 501500
                },
                {
                    "id": 3,
                    "name": "Phí vệ sinh",
                    "note": "Phụ phí phát sinh khi hoàn trả xe không đảm bảo vệ sịnh (nhiều vết bẩn, bùn cát, sìn lầy...)",
                    "value": 150500
                }
            ],
            "documentation_policy_car": null,
            "mortgage_policy_car": null,
            "setting_price_car": null,
            "setting_insurance_car": null,
            "document_deposit": null,
            "document_payment": null,
            "car_setting": {
                "cancel_trip": null,
                "documentation_policy_car": null,
                "mortgage_policy_car": null,
                "setting_price_car": null,
                "setting_insurance_car": null,
                "document_deposit": null,
                "document_payment": null,
                "total_km_car_talent": null,
                "setting_service_car_talent": null,
                "setting_shuttle_car_talent": null
            },
            "price": {
                "rent_cost": 1000000,
                "rent_cost_day": 1148000,
                "price_insurance_day": 0,
                "percent_service": 14.8,
                "percent_insurance": 0,
                "percent_deposit": 0,
                "number_deposit_car": 0
            },
            "arrNotDay": null,
            "hour_receive_car": [
                {
                    "id": 17,
                    "car_id": 2,
                    "hour_start": "06:00",
                    "hour_end": "10:00",
                    "type": 1,
                    "created_at": "2024-05-08T01:54:07.000000Z",
                    "updated_at": "2024-05-08T01:54:07.000000Z"
                }
            ],
            "hour_back_car": [
                {
                    "id": 18,
                    "car_id": 2,
                    "hour_start": "11:00",
                    "hour_end": "23:00",
                    "type": 2,
                    "created_at": "2024-05-08T01:54:07.000000Z",
                    "updated_at": "2024-05-08T01:54:07.000000Z"
                }
            ]
        }
    ]

    return (
        <div className='flex flex-col pb-20 lg:gap-20 md:gap-16 gap-10 custom-container'>
            <div className="lg:mt-20 md:mt-16 mt-10 w-full lg:h-[50vh] md:h-[50dvh] h-[30dvh] bg-[url('/policy/banner_supercar.jpg')] bg-cover bg-center rounded-xl flex justify-center items-center" />

            <div className='flex flex-col gap-4 custom-container'>
                <div className='3xl:text-4xl text-2xl text-[#000000] font-semibold'>
                    Quy trình giải quyết khiếu nại
                </div>
                <div className='flex flex-col gap-2 mt-6'>
                    <div className='2xl:text-base text-sm text-[#000000] font-light space-y-2'>
                        <div className='flex flex-col gap-3'>
                            <span>
                                Công ty và Chủ xe có trách nhiệm tiếp nhận các khiếu nại và hỗ trợ Khách hàng liên quan đến các giao dịch được kết nối thông qua Sàn giao dịch. Các khiếu nại liên quan đến việc cung cấp, sử dụng dịch vụ thuê xe trên Sàn giao dịch do Công ty chịu trách nhiệm độc lập giải quyết trên cơ sở quy định của pháp luật, Điều khoản và Điều kiện sử dụng dịch vụ, các thông báo, quy chế đã công bố với Thành viên (Khách hàng và Chủ xe). Khi phát sinh tranh chấp, Công ty đề cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy của Thành viên vào chất lượng dịch vụ của Sàn giao dịch. Khách hàng có thể thực hiện theo các bước sau:
                            </span>

                            <div className='space-x-1'>
                                <span className='font-semibold'>Bước 1:</span>
                                <span>Khách hàng khiếu nại về dịch vụ qua số điện thoại 1900 9217 hoặc gửi mail cho Bộ phận Chăm sóc Khách hàng tại địa chỉ support@Kanow.vn. Thời gian để Công ty tiếp nhận khiếu nại là 3 ngày kể từ ngày sử dụng dịch vụ hoặc từ ngày phát sinh sự việc.</span>
                            </div>

                            <div className='flex flex-col'>
                                <div className='space-x-1'>
                                    <span className='font-semibold'>Bước 2:</span>
                                    <span>
                                        Trong thời hạn (3) ngày làm việc kể từ khi tiếp nhận thông tin khiếu nại của Khách hàng, Bộ phận Chăm sóc Khách hàng xác nhận thông tin khiếu nại, tiến hành phân loại thông tin và thông báo cho Khách hàng:
                                    </span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span>
                                        2a. Ghi nhận các yêu cầu và các khiếu nại có liên quan đến Công ty và trong thời hạn khiếu nại.
                                    </span>
                                    <span>
                                        2b. Từ chối các yêu cầu, các khiếu nại không có liên quan đến Công ty và hết thời hạn khiếu nại.
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <div className='space-x-1'>
                                    <span className='font-semibold'>Bước 3:</span>
                                    <span>Giải quyết vấn đề</span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        Bộ phận Chăm sóc Khách hàng sẽ tiến hành xác minh, kiểm chứng và phân tích tính chất và mức độ của nội dung khiếu nại, phạm vi khiếu nại và trách nhiệm xử lý để phối hợp với Chủ xe và Bên cung cấp dịch vụ thứ 3 đưa ra biện pháp cụ thể để hỗ trợ Khách hàng giải quyết tranh chấp đó.
                                    </div>
                                    <div >
                                        3a. Chuyển các vấn đề có liên quan trực tiếp đến Công ty cho các Bộ phận có liên quan kiểm tra và đối chiếu.
                                    </div>
                                    <div>
                                        3b. Chuyển các vấn đề có liên quan cho Chủ xe giải quyết.
                                    </div>
                                    <div>
                                        Trong thời hạn ba (3) ngày làm việc kể từ khi tiếp nhận thông báo về khiếu nại, Chủ xe có trách nhiệm phối hợp với Kanow để giải quyết, xử lý khiếu nại. Chủ xe sẽ thông báo cho Khách hàng biện pháp xử lý hoặc ủy quyền thông báo cho Công ty.
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='space-x-1'>
                                    <span className='font-semibold'>Bước 4:</span>
                                    <span>
                                        Đóng khiếu nại
                                    </span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        {"4a. Khách hàng đồng ý với các phản hồi của Bộ phận Chăm sóc Khách hàng -> Kết thúc khiếu nại. Khách hàng không đồng ý -> Quay lại bước 3"}
                                    </div>
                                    <div>
                                        {"4b. Theo dõi các giải quyết khiếu nại của Chủ xe -> Kết thúc khiếu nại khi Khách hàng và Chủ xe đã thỏa thuận xong."}
                                    </div>
                                    <div>
                                        Khi nhận được thông báo về biện pháp xử lý từ Chủ xe nhưng Khách hàng không đồng ý thì Công ty sẽ chủ trì việc thương lượng, hòa giải giữa Khách hàng và Chủ xe để đi đến kết quả giải quyết phù hợp với cả hai bên. Trong trường hợp Khách hàng và Chủ xe không đi đến thỏa thuận chung hoặc Khách hàng không đồng ý với những biện pháp giải quyết cuối cùng của Chủ xe và/hoặc nằm ngoài khả năng và thẩm quyền của Công ty thì Khách hàng hoặc C hủ xe có thể nhờ đến Cơ quan Nhà nước có thẩm quyền can thiệp và giải quyết theo Pháp luật nhằm đảm bảo lợi ích hợp pháp của các bên.
                                    </div>
                                    <div>
                                        Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu.
                                    </div>
                                    <div>
                                        Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình. Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm. Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-8 gap-6'>
                <div className='3xl:text-4xl text-3xl font-medium'>
                    Bài viết liên quan
                </div>

                <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-8 gap-6 justify-start w-full h-full'>
                    <Link
                        // key={card.id}
                        id={`card-34432`}
                        className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                        href={`/blog/2321`}
                    >
                        <div className='w-full 3xl:h-[230px] xxl:h-auto xl:h-[180px] h-[180px] relative'>
                            <Image
                                width={600}
                                height={600}
                                alt="image_card"
                                src={'/card/card_car1.png'}
                                className='w-full h-full object-cover rounded-xl'
                            />
                        </div>
                        <div className='3xl:text-xl 2xl:text-lg xxl:text-lg xl:text-base lg:text-base md:text-xl text-xl  text-[#272D37] font-semibold group-hover:text-[#272D37]/80 duration-500 transition ease-in-out line-clamp-2'>
                            Thuê Xe Ô Tô Tự Lái: Tự Do Trải Nghiệm Lễ Giáng Sinh Đáng Nhớ
                        </div>
                        <div className='3xl:text-base 2xl:text-[15px] xxl:text-[15px] xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out line-clamp-4'>
                            {/* <span dangerouslySetInnerHTML={{ __html: `${e?.content ? e?.content : ''}` }} className="whitespace-break-spaces"></span> */}
                            Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Chủ xe cung cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ. Chúng tôi cũng đề nghị Chủ xe cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng như có những hành vi phù hợp đối với Khách hàng. Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật. Các bên bao gồm Khách hàng và Chủ xe sẽ phải có trách nhiệm tích cực trong việc giải quyết khiếu nại. Chủ xe cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng. Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết khiếu nại giữ Khách hàng và Chủ xe. Công ty cũng có trách nhiệm cung cấp những thông tin liên quan đến Khách hàng và Chủ xe nếu được Chủ xe hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu.
                            Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình. Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm. Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Chủ xe đó trên Sàn giao dịch đồng thời yêu cầu Chủ xe bồi hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DetailBlog