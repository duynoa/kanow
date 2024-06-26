// data card car
interface IDataCardCar {
    customer: {
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
    location: {
        address: string,
        distance: string,
        district: string,
        latitude: number,
        longitude: number,
        province: string
    }
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
    full_address: string;
    image_car: {
        car_id: number;
        created_at: string;
        id: number;
        name: string;
        updated_at: string;
    }[];
    customer: {
        id: number,
        fullname: string,
        avatar: string,
        total_trip: number,
        star_avg: number
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
        // Tổng số km đi được theo xe
        total_km_day: number,
        // tiền trước khuyến mãi show ra giao diện
        price_before_promotion: number;
        // tiền sau khuyến mãi show ra giao diện
        price_after_promotion: number;

        // tiền gốc chưa có phí dịch vụ
        rent_cost: number;
        // tiền gốc có phí dịch vụ 
        rent_cost_day: number;
        // tiền bảo hiểm
        price_insurance_day: number;

        // tổng tạm tính (chưa tính % khuyến mãi)
        temp_total_amount: number;
        // thành tiền (đã tính tiền khuyến mãi)
        total_amount: number;

        max_money_discount: number;
        // tiền đặt cọc
        price_depoist?: number,
        // % tiền đặt cọc
        percent_deposit: number;
        // số ngày
        number_day?: number,
        // thanh toán khi nhận xe
        cash_on_delivery?: number
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
    review_car: {
        id: number;
        star: number;
        avatar: string;
        content: string;
        customer_name: string;
        date: string;
        template_content: {
            id: number,
            content: string,
            review_car_id: number,
        }[]
    }[];
    total_review_car: number;
    collateral_car: {
        mortgage: number;
        mortgage_policy_car: string;
        note_mortgage: string;
    };
    surcharge_car: {
        id: number;
        name: string;
        note: string;
        value: number;
        created_at: string;
        updated_at: string;
        pivot: {
            car_id: number;
            surcharge_car_id: number;
        };
    }[];
    hour_back_car: {
        car_id: number,
        created_at: string,
        hour_end: string,
        hour_start: string,
        id: number,
        type: number,
        updated_at: string,
    }[],
    hour_receive_car: {
        car_id: number,
        created_at: string,
        hour_end: string,
        hour_start: string,
        id: number,
        type: number,
        updated_at: string,
    }[]
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
    customer_renter: {
        id: number,
        fullname: string,
        avatar: string,
        phone: string,
        total_trip: number,
        total_star: number,
        driving_liscense: {
            id: number,
            number_liscense: string,
            fullname: string,
            birthday: string,
            image: string,
            customer_id: number,
            created_at: string,
            updated_at: string,
            status: number
        }
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
        value: number;
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
        note: string
    },
    price: {
        // Tổng số km đi được theo xe
        total_km_day: number,
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
        cash_on_delivery: number,
        // số km
        amount_km: number,
        // khuyến mãi
        promotion: number,
    },
    price_owner: {
        rent_cost_day: number,
        number_day: number,
        rent_cost: number,
        amount_km: number,
        price_service_owner: number,
        revenue_customer: number,
        payment_recevie: number,
        amount_receive_owner: number
    },
    policy: {
        rent_cost_owner: string,
        fee_service_owner: string
    },
    note: string,
    type: {
        delivery_car: boolean;
        book_car_flash: boolean;
        // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
        mortgage: boolean;
        transmission_search: string;
    },
    review: {
        id: number,
        content: string,
        star: number,
        fullname: string,
        avatar: string,
        created_at: string,
        template_content: {
            id: number,
            review_car_id: number,
            content: string
        }[]
    },
    review_owner: {
        id: number,
        content: string,
        star: number,
        fullname: string,
        avatar: string,
        created_at: string,
        template_content: {
            id: number,
            review_car_id: number,
            content: string
        }[]
    },
}

export type {
    IDataCardCar,
    ITypesCar,
    IAutomaker,
    IDataDetailCar,
    IDetailRentalCar
};
