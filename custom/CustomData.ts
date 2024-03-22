// custom detail car
export const CustomDataListCars = (data: any) => {
    let customData = data?.data?.map((item: any) => ({
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
            transmission: item?.transmission,
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
