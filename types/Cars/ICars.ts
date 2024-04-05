// data card car
interface IDataCardCar {
    car_owner: {
        avatar: string;
        fullname: string;
        id: string;
    };
    id: string;
    address: string;
    image_car: {
        car_id: number;
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
    }[];
    customer: {
        avatar: string;
        fullname: string;
        id: string;
    };
    type: {
        delivery_car: boolean;
        book_car_flash: boolean;
        // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
        mortgage: boolean;
        transmission_search: string;
    };
    favorite_car: boolean;
    name_car: string;
    point_star: number;
    total_trip: number;
    price_before_promotion: number;
    price_after_promotion: number;
    promotion: {
        id: number;
        name: string;
        percent: number;
        price_promotion: number;
    }[];
}

// filter type(loại) car
interface ITypesCar {
    id: number;
    image: string;
    name: string;
    total_car: number;
}

// filter automaker(hãng) car
interface IAutomaker {
    id: number;
    image: string;
    name: string;
    total_car: number;
}

// detail car
interface IDataDetailCar {
    id: string;
    address: string;
    image_car: {
        car_id: number;
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
    }[];
    car_owner: {
        avatar: string;
        fullname: string;
        id: string;
    };
    type: {
        delivery_car: boolean;
        book_car_flash: boolean;
        // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
        mortgage: boolean;
        transmission_search: string;
    };
    favorite_car: boolean;
    name_car: string;
    point_star: number;
    total_trip: number;
    price: {
        price_before_promotion: number;
        price_after_promotion: number;

        // tiền gốc 
        rent_cost_day: number;
        // tiền bảo hiểm
        price_insurance_day: number;

        // tổng tạm tính (chưa tính % khuyến mãi)
        temp_total_amount: number;
        // thành tiền (đã tính tiền khuyến mãi)
        total_amount: number;

        max_money_discount: number;
        // tiền đặt cọc
        price_depoist: number,
        // số ngày
        number_day: number,
        // thanh toán khi nhận xe
        cash_on_delivery: number
    };
    promotion: {
        id: number;
        name: string;
        percent: number;
        price_promotion: number;
    }[];
    trait_car: {
        number_seat: number;
        number_car: string;
        type_fuel: string;
        year_manu: string;
    };
    describe_car: string;
    other_amenities_car: {
        id: number;
        name: string;
        image: string;
        created_at: string;
        updated_at: string;
        pilot: {
            car_id: number;
            other_amenities_car_id: number;
        };
    }[];
    info_review_car: {
        review_car: {
            id: number;
            star: number;
            avatar: string;
            content: string;
            customer_name: string;
            date: string;
        }[];
        star: number;
        total_review_car: number;
    };
    collateral_car: {
        mortgage: number;
        mortgage_policy_car: string;
        note_mortgage: string;
    };
    surcharge_car: {
        id: number;
        name: string;
        note: string;
        value: string;
        created_at: string;
        updated_at: string;
        pivot: {
            car_id: number;
            surcharge_car_id: number;
        };
    }[];
}

// detail rental car
interface IDetailRentalCar {
    base: string,
    id: number,
    car: {
        id: number,
        image: string,
        name: string,
        number_car: string,
        reference_no: string,
        note_mortgage: string,
    },
    date_time: {
        date: string,
        date_start: string,
        date_end: string,
    },
    customer: {
        id: number,
        fullname: string,
        avatar: string,
        total_star: number | null,
        total_trip: number,
        phone: string,
    },
    address: {
        district: string,
        province: string,
        full_address: string
    },
    surcharge_car: {
        id: number;
        name: string;
        note: string;
        value: string;
        created_at: string;
        updated_at: string;
        pivot: {
            car_id: number;
            surcharge_car_id: number;
        };
    }[],
    status: {
        statusCustom: number,
        status: number,
        color: string,
        name: string,
    },
    price: {
        // tiền gốc 
        rent_cost_day: number,
        // tiền bảo hiểm
        price_insurance_day: number,
        // tổng tạm tính
        temp_total_amount: number,
        // tiền đặt cọc
        price_depoist: number,
        // thành tiền
        total_amount: number,
        // số ngày
        number_day: number,
        // thành toán khi nhận xe
        cash_on_delivery: number
    },
}

export type {
    IDataCardCar,
    ITypesCar,
    IAutomaker,
    IDataDetailCar,
    IDetailRentalCar
};
