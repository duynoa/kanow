import { IDataDetailCar } from "@/types/Cars/ICars";

// custom in list cars
export const CustomDataListCars = (data: any) => {
    let customData = data?.data?.map((item: any) => ({
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
        favorite: item?.favourite_car,
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
    return { customData };
};

// data detail car
export const CustomDataDetailCar = (res: any) => {
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
        favourite_car: res?.data?.favourite_car,

        price: {
            price_before_promotion: res?.data?.rent_cost,
            price_after_promotion:
                res?.data?.promotion?.length > 0
                    ? res?.data?.rent_cost -
                      res?.data?.promotion[0]?.price_promotion
                    : 0,
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
        cancel_trip: res?.data?.cancel_trip,
        policy: {
            car_rental_policy: res?.data?.documentation_policy_car,
            car_collateral_policy: res?.data?.mortgage_policy_car,
            car_insurance_policy: res?.data?.setting_insurance_car,
            car_price_policy: res?.data?.setting_price_car,
        },
    };
    return { customDataDetailCar };
};
