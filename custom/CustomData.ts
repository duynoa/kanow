import { IDataDetailCar } from "@/types/Cars/ICars";
import { IInitialStateInfoRentalCar } from "@/types/Initial/IInitial";

// custom in list cars
const CustomDataListCars = (data: any) => {
    let customDataListCars = data?.data?.map((item: any) => ({
        id: item?.id,
        address: `${item?.district}, ${item?.province}`,
        image_car: item?.image_car?.map((image: any) => ({
            ...image,
            name: `${data?.base?.base}/${image.name}`,
        })),
        car_owner: {
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
        price_after_promotion:
            item?.promotion?.length > 0
                ? item?.rent_cost - item?.promotion[0]?.price_promotion
                : 0,
        promotion: item?.promotion,
    }));
    return { customDataListCars };
};

// data detail car
const CustomDataDetailCar = (res: any) => {
    let customDataDetailCar: IDataDetailCar = {
        id: res?.data?.id,
        address: `${res?.data?.district}, ${res?.data?.province}`,
        image_car: res?.data?.image_car?.map((image: any) => ({
            ...image,
            name: `${res?.base?.base}/${image.name}`,
        })),
        car_owner: {
            avatar: res?.data?.customer?.avatar,
            fullname: res?.data?.customer?.fullname,
            id: res?.data?.customer?.id,
        },
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
            percent_deposit: res?.data?.price?.percent_deposit,
            // tiền trước khuyến mãi đầu 
            price_before_promotion: res?.data?.price?.rent_cost_day,
            // tiền sau khuyến mãi đầu (nếu có lấy tiền gốc - tiền khuyến mãi trong mảng lấy cái đầu tiên)
            price_after_promotion:
                res?.data?.promotion?.length > 0
                    ? res?.data?.price?.rent_cost_day -
                    res?.data?.promotion[0]?.price_promotion
                    : res?.data?.price?.rent_cost_day,
            // tiền gốc 
            rent_cost_day: res?.data?.price?.rent_cost_day,
            // tiền bảo hiểm
            price_insurance_day: res?.data?.price?.price_insurance_day,

            // *  ((giá gốc + bảo hiểm) * (tổng số ngày)) - (số tiền khuyến mãi)
            // *  số tiền khuyến mãi có 2 Option
            // ** option 1: khuyến mãi tính cho riêng từng ngày (bill = tổng ngày = tổng khuyến mãi)
            // ** option 2: chọn khuyến mãi từ mã tính cho tổng bill (bill = tổng bill - số tiền cố định của khuyến mãi)

            // tổng tạm thời
            temp_total_amount:
                (res?.data?.price?.rent_cost_day +
                    res?.data?.price?.price_insurance_day) *
                1,

            // thành tiền
            // số là ngày điền vào...
            total_amount:
                res?.data?.promotion?.length > 0
                    ?
                    (res?.data?.price?.rent_cost_day - res?.data?.promotion[0]?.price_promotion) * 1 + res?.data?.price?.price_insurance_day
                    :
                    res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day,

            // tiền đặt cọc
            price_depoist:
                res?.data?.promotion?.length > 0
                    ?
                    ((res?.data?.price?.rent_cost_day - res?.data?.promotion[0]?.price_promotion) * 1 + res?.data?.price?.price_insurance_day) * (res?.data?.price?.percent_deposit / 100)
                    :
                    (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) * (res?.data?.price?.percent_deposit / 100)
            ,
            // số ngày
            // number_day: +res?.data?.price?.number_day,
            number_day: 1,
            // thanh toán khi nhận xe (Thành tiền - tiền cọc)
            cash_on_delivery:
                res?.data?.promotion?.length > 0
                    ?
                    ((+res?.data?.price?.rent_cost_day - +res?.data?.promotion[0]?.price_promotion) * 1 + (+res?.data?.price?.price_insurance_day)) - (((res?.data?.price?.rent_cost_day - res?.data?.promotion[0]?.price_promotion) * 1 + res?.data?.price?.price_insurance_day) * (res?.data?.price?.percent_deposit / 100))
                    :
                    (res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) - ((res?.data?.price?.rent_cost_day + res?.data?.price?.price_insurance_day) * (res?.data?.price?.percent_deposit / 100)),
            // cash_on_delivery: (+res?.data?.price?.grand_total) - (+res?.data?.price?.depoist),
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
        other_amenities_car: res?.data?.other_amenities_car?.map(
            (image: any) => ({
                ...image,
                image: `${res?.base?.base}/${image.image}`,
            })
        ),
        info_review_car: {
            review_car: res?.data?.review_car,
            star: res?.data?.star,
            total_review_car: res?.data?.total_review_car,
        },
        collateral_car: {
            mortgage: res?.data?.mortgage,
            mortgage_policy_car: res?.data?.mortgage_policy_car,
            note_mortgage: res?.data?.note_mortgage,
        },
        surcharge_car: res?.data?.surcharge_car,
    };
    return { customDataDetailCar };
};

const CustomDataInfoRentalCar = (res: any) => {
    let customDataInfoRentalCar: any = {
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
        },
        customer: {
            id: res?.data?.customer?.id,
            fullname: res?.data?.customer?.fullname,
            avatar: res?.data?.customer?.avatar,
            total_star: res?.data?.customer?.total_star,
            total_trip: res?.data?.customer?.total_trip,
            phone: res?.data?.customer?.phone
        },
        address: {
            district: res?.data?.district,
            province: res?.data?.province,
            full_address: `${res?.data?.district}, ${res?.data?.province}`
        },
        surcharge_car: res?.data?.surcharge_car,
        status: {
            statusCustom: res?.data.status.status > 4 ? 4 : res.data.status.status,
            status: res?.data.status.status,
            color: res?.data.status.color,
            name: res?.data.status.name,
        },
        price: {
            // tiền gốc 
            rent_cost_day: +res?.data?.price?.rent_cost_day,
            // tiền bảo hiểm
            price_insurance_day: +res?.data?.price?.price_insurance_day,
            // tổng tạm tính
            temp_total_amount: +res?.data?.price?.total,
            // thành tiền
            total_amount: +res?.data?.price?.grand_total,
            // tiền đặt cọc
            price_depoist: +res?.data?.price?.depoist,
            // số ngày
            number_day: +res?.data?.price?.number_day,
            // thanh toán khi nhận xe (Thành tiền - tiền cọc)
            cash_on_delivery: (+res?.data?.price?.grand_total) - (+res?.data?.price?.depoist)
        },
    }
    return { customDataInfoRentalCar };
}

const CustomDataPolicy = (res: any) => {
    let customDataPolicy: any = {
        car_deposit_policy: res?.document_deposit,
        car_payment_policy: res?.document_payment,
        car_rental_policy: res?.documentation_policy_car,
        car_collateral_policy: res?.mortgage_policy_car,
        car_insurance_policy: res?.setting_insurance_car,
        car_price_policy: res?.setting_price_car,
        cancel_trip: res?.cancel_trip,
        number_deposit_car: +res?.number_deposit_car,
        percent_deposit: +res?.percent_deposit,
        percent_insurance: +res?.percent_insurance
    }
    return { customDataPolicy };
}

export {
    CustomDataListCars,
    CustomDataDetailCar,
    CustomDataInfoRentalCar,
    CustomDataPolicy
}
