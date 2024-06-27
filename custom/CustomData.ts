import { IDataDetailCar, IDetailRentalCar } from "@/types/Cars/ICars";
import { IInitialStateInfoRentalCar } from "@/types/Initial/IInitial";
import { IDataPolicy } from "@/types/Policy/IPolicy";
import { IArrayMyTripCar } from "@/types/Profile/IMyTrips";

// custom in list cars
const CustomDataListCars = (data: any) => {
    let customDataListCars = data?.data?.map((item: any) => ({
        id: item?.id,
        address: `${item?.district}, ${item?.province}`,
        image_car: item?.image_car?.map((image: any) => ({
            ...image,
            name: `${data?.base?.base}/${image.name}`,
        })),
        customer: {
            avatar: item?.customer?.avatar,
            fullname: item?.customer?.fullname,
            id: item?.customer?.id,
        },
        type: {
            delivery_car: item?.delivery_car === 1,
            book_car_flash: item?.book_car_flash === 1,
            // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
            mortgage: item?.mortgage === 0,
            transmission_search: item?.transmission,
        },
        favorite_car: item?.favourite_car,
        name_car: item?.name,
        point_star: item?.star,
        total_trip: item?.total_trip,
        price_before_promotion: item?.rent_cost,
        price_after_promotion: item?.promotion?.length > 0 ? item?.rent_cost - item?.promotion[0]?.price_promotion : 0,
        promotion: item?.promotion,
        location: item?.location,
    }));
    return { customDataListCars };
};

// data detail car
const CustomDataDetailCar = (res: any, numberDay?: number) => {
    let customDataDetailCar: IDataDetailCar = {
        id: res?.data?.id,
        address: `${res?.data?.district}, ${res?.data?.province}`,
        full_address: res?.data?.address,
        customer: {
            id: res?.data?.customer?.id,
            fullname: res?.data?.customer?.fullname,
            avatar: res?.data?.customer?.avatar,
            total_trip: res?.data?.customer?.total_trip,
            star_avg: res?.data?.customer?.star_avg,
        },
        image_car: res?.data?.image_car?.map((image: any) => ({
            ...image,
            name: `${res?.base?.base}/${image.name}`,
        })),
        type: {
            delivery_car: res?.data?.delivery_car === 1,
            book_car_flash: res?.data?.book_car_flash === 1,
            // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
            mortgage: res?.data?.mortgage === 0,
            transmission_search: res?.data?.transmission,
        },
        name_car: res?.data?.name,
        point_star: res?.data?.star,
        total_trip: res?.data?.total_trip,
        favorite_car: res?.data?.favourite_car,
        price: {
            // Tổng số km đi được trong ngày theo xe
            total_km_day: +res?.data?.total_km_day ? res?.data?.total_km_day : 1,
            // tiền trước khuyến mãi đầu
            price_before_promotion: res?.data?.price?.rent_cost_day,
            // tiền sau khuyến mãi đầu (nếu có lấy tiền gốc - tiền khuyến mãi trong mảng lấy cái đầu tiên)
            price_after_promotion:
                res?.data?.promotion?.length > 0
                    ? res?.data?.price?.rent_cost_day - res?.data?.promotion[0]?.price_promotion
                    : res?.data?.price?.rent_cost_day,
            // tiền gốc chưa có phí dịch vụ
            rent_cost: res?.data?.price?.rent_cost,
            // tiền gốc có phí dịch vụ
            rent_cost_day: res?.data?.price?.rent_cost_day,
            // tiền bảo hiểm
            price_insurance_day: res?.data?.price?.price_insurance_day,

            // *  ((giá gốc + bảo hiểm) * (tổng số ngày)) - (số tiền khuyến mãi)
            // *  số tiền khuyến mãi có 2 Option
            // ** option 1: khuyến mãi tính cho riêng từng ngày (bill = tổng ngày = tổng khuyến mãi)
            // ** option 2: chọn khuyến mãi từ mã tính cho tổng bill (bill = tổng bill - số tiền cố định của khuyến mãi)

            // tổng tạm tính
            temp_total_amount:
                (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) * (numberDay ? numberDay : 1),

            // thành tiền
            // số là ngày điền vào...
            total_amount:
                res?.data?.promotion?.length > 0
                    ? // (((isStateDetailCar?.dataDetailCar?.price?.rent_cost_day + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (numberDay ? numberDay : 1)) - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion)

                    (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) *
                    (numberDay ? numberDay : 1) -
                    res?.data?.promotion[0]?.price_promotion
                    : (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) *
                    (numberDay ? numberDay : 1),
            // total_amount:
            //     res?.data?.promotion?.length > 0
            //         ? (res?.data?.price?.rent_cost_day - res?.data?.promotion[0]?.price_promotion) *
            //         (numberDay ? numberDay : 1) +
            //         res?.data?.price?.price_insurance_day
            //         : (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) *
            //         (numberDay ? numberDay : 1),
            // % tiền đặt cọc
            percent_deposit: res?.data?.price?.percent_deposit,
            // tiền đặt cọc
            price_depoist:
                res?.data?.promotion?.length > 0
                    ? ((res?.data?.price?.rent_cost_day - res?.data?.promotion[0]?.price_promotion) *
                        (numberDay ? numberDay : 1) +
                        res?.data?.price?.price_insurance_day) *
                    (res?.data?.price?.percent_deposit / 100)
                    : (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) *
                    (numberDay ? numberDay : 1) *
                    (res?.data?.price?.percent_deposit / 100),
            // số ngày
            number_day: numberDay ? numberDay : 1,
            // number_day: res.data.price.number_day ? res.data.price.number_day : 1,
            // thanh toán khi nhận xe (Thành tiền - tiền cọc)
            cash_on_delivery:
                res?.data?.promotion?.length > 0
                    ? (+res?.data?.price?.rent_cost_day -
                        +res?.data?.promotion[0]?.price_promotion +
                        +res?.data?.price?.price_insurance_day) *
                    (numberDay ? numberDay : 1) -
                    (res?.data?.price?.rent_cost_day -
                        res?.data?.promotion[0]?.price_promotion +
                        res?.data?.price?.price_insurance_day) *
                    (numberDay ? numberDay : 1) *
                    (res?.data?.price?.percent_deposit / 100)
                    : (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) *
                    (numberDay ? numberDay : 1) -
                    (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) *
                    (numberDay ? numberDay : 1) *
                    (res?.data?.price?.percent_deposit / 100),
            max_money_discount: 0,
        },
        promotion: res?.data?.promotion,
        trait_car: {
            number_seat: res?.data?.number_seat,
            number_car: res?.data?.number_car,
            type_fuel: res?.data?.type_fuel,
            year_manu: res?.data?.year_manu,
        },
        describe_car: res?.data?.detail,
        other_amenities_car: res?.data?.other_amenities_car?.map((image: any) => ({
            ...image,
            image: `${res?.base?.base}/${image.image}`,
        })),
        review_car: res?.data?.review_car,
        collateral_car: {
            mortgage: res?.data?.mortgage,
            mortgage_policy_car: res?.data?.mortgage_policy_car,
            note_mortgage: res?.data?.note_mortgage,
        },
        surcharge_car: res?.data?.surcharge_car,
        surcharge_car_talent: res?.data?.surcharge_car_talent,
        // giờ nhận xe và giờ trả xe
        hour_back_car: res?.data?.hour_back_car,
        hour_receive_car: res?.data?.hour_receive_car,
        total_review_car: res?.data?.total_review_car,
    };
    return { customDataDetailCar };
};

const CustomDataInfoRentalCar = (res: any) => {
    let customDataInfoRentalCar: IDetailRentalCar = {
        base: res?.base?.base,
        id: res?.data?.id,
        car: {
            id: res?.data?.car?.id,
            image: `${res?.base?.base}/${res?.data?.car?.image}`,
            name: res?.data?.car?.name,
            number_car: res?.data?.car?.number_car,
            reference_no: res?.data?.reference_no,
            note_mortgage: res?.data?.car?.note_mortgage,
        },
        date_time: {
            date: res?.data?.date,
            date_start: res?.data?.date_start,
            date_end: res?.data?.date_end,
            date_status: res?.data?.date_status
        },
        customer: {
            id: res?.data?.customer?.id,
            fullname: res?.data?.customer?.fullname,
            avatar: res?.data?.customer?.avatar,
            total_star: res?.data?.customer?.total_star,
            total_trip: res?.data?.customer?.total_trip,
            phone: res?.data?.customer?.phone,
        },
        customer_renter: {
            id: res?.data?.customer_renter?.id,
            fullname: res?.data?.customer_renter?.fullname,
            avatar: res?.data?.customer_renter?.avatar,
            phone: res?.data?.customer_renter?.phone,
            total_trip: res?.data?.customer_renter?.total_trip,
            total_star: res?.data?.customer_renter?.total_star,
            driving_liscense: {
                id: res?.data?.customer_renter?.driving_liscense?.id,
                number_liscense: res?.data?.customer_renter?.driving_liscense?.number_liscense,
                fullname: res?.data?.customer_renter?.driving_liscense?.fullname,
                birthday: res?.data?.customer_renter?.driving_liscense?.birthday,
                image: res?.data?.customer_renter?.driving_liscense?.image,
                customer_id: res?.data?.customer_renter?.driving_liscense?.customer_id,
                created_at: res?.data?.customer_renter?.driving_liscense?.created_at,
                updated_at: res?.data?.customer_renter?.driving_liscense?.updated_at,
                status: res?.data?.customer_renter?.driving_liscense?.status
            }
        },
        address: {
            district: res?.data?.district,
            province: res?.data?.province,
            // full_address: res?.data?.address,
            full_address: `${res?.data?.district}, ${res?.data?.province}`,
        },
        surcharge_car: res?.data?.surcharge_car,
        status: {
            statusCustom: res?.data?.status?.status > 4 ? 4 : res?.data?.status?.status,
            status: res?.data?.status?.status,
            color: res?.data?.status?.color,
            name: res?.data?.status?.name,
            note: res?.data?.status?.note,
        },
        price: {
            // Tổng số km đi được trong ngày theo xe
            total_km_day: +res?.data?.total_km_day,
            // tiền gốc
            rent_cost_day: +res?.data?.price?.rent_cost_day,
            // tiền bảo hiểm
            price_insurance_day: +res?.data?.price?.price_insurance_day,
            // tổng tạm tính
            // temp_total_amount: +res?.data?.price?.total,
            temp_total_amount: +res?.data?.price?.total_all,
            // thành tiền
            total_amount: +res?.data?.price?.grand_total,
            // tiền đặt cọc
            price_depoist: +res?.data?.price?.depoist,
            // số ngày
            number_day: +res?.data?.price?.number_day,
            // thanh toán khi nhận xe (Thành tiền - tiền cọc)
            cash_on_delivery: +res?.data?.price?.grand_total - +res?.data?.price?.depoist,
            // số km
            amount_km: +res?.data?.price?.amount_km,
            // khuyến mãi
            promotion: +res?.data?.price?.promotion,
        },
        price_owner: {
            rent_cost_day: res?.data?.price_owner?.rent_cost_day,
            number_day: res?.data?.price_owner?.number_day,
            rent_cost: res?.data?.price_owner?.rent_cost,
            amount_km: res?.data?.price_owner?.amount_km,
            price_service_owner: res?.data?.price_owner?.price_service_owner,
            revenue_customer: res?.data?.price_owner?.revenue_customer,
            payment_recevie: res?.data?.price_owner?.payment_recevie,
            // data này tự tính lấy (revenue_customer - payment_recevie)
            amount_receive_owner: res?.data?.price_owner?.revenue_customer - res?.data?.price_owner?.payment_recevie,
        },
        policy: {
            rent_cost_owner: res?.data?.rent_cost_owner,
            fee_service_owner: res?.data?.fee_service_owner
        },
        note: res?.data?.note,
        type: {
            delivery_car: res?.data?.delivery_car === 1,
            book_car_flash: res?.data?.book_car_flash === 1,
            // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
            mortgage: res?.data?.car?.mortgage === 0,
            transmission_search: res?.data?.transmission,
        },
        review: res?.data?.review,
        review_owner: res?.data?.review_owner,
    };
    return { customDataInfoRentalCar };
};

const CustomDataPolicy = (res: any) => {
    let customDataPolicy: IDataPolicy = {
        cancel_trip: res?.cancel_trip,
        car_talent: res?.car_talent,
        document_deposit: res?.document_deposit,
        document_payment: res?.document_payment,
        document_license: res?.document_license,
        documentation_policy_car: res?.documentation_policy_car,
        mortgage_policy_car: res?.mortgage_policy_car,
        setting_insurance_car: res?.setting_insurance_car,
        setting_price_car: res?.setting_price_car,
        number_deposit_car: res?.number_deposit_car,
        percent_deposit: res?.percent_deposit,
        percent_insurance: res?.percent_insurance,
        getListPriceMonth: res?.getListPriceMonth?.map((item: any) => {
            return {
                label: item.name,
                value: item.id,
                selected: item.selected
            }
        })

    };
    return { customDataPolicy };
};

const CustomDataMyTripCar = (data: any) => {
    let customDataMyTripCar = data?.data?.map((i: IArrayMyTripCar) => ({
        ...i,
        id: i?.id,
        car: {
            ...i?.car,
            image: `${data?.base?.base}/${i?.car?.image}`,
        },
    }));
    return { customDataMyTripCar };
};

const CustomDataMyCar = (data: any) => {
    let customDataMyCar = data?.data?.map((item: any) => ({
        id: item?.id,
        address: `${item?.district}, ${item?.province}`,
        image_car: item?.image_car?.map((image: any) => ({
            ...image,
            name: `${data?.base?.base}/${image.name}`,
        })),
        customer: {
            avatar: item?.customer?.avatar,
            fullname: item?.customer?.fullname,
            id: item?.customer?.id,
        },
        car: item.car,
        car_talent: item.car_talent,
        status: item?.status,
        name_car: item?.name,
        point_star: item?.star,
        total_trip: item?.total_trip,
        price: item?.price,
    }));
    return { customDataMyCar };
};

export {
    CustomDataListCars,
    CustomDataDetailCar,
    CustomDataInfoRentalCar,
    CustomDataPolicy,
    CustomDataMyTripCar,
    CustomDataMyCar,
};
