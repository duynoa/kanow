export interface IDataCardCar {
    id: string,
    address: string,
    image_car: {
        car_id: number,
        created_at: string,
        id: number,
        name: string,
        updated_at: string
    }[],
    customer: {
        avatar: string,
        fullname: string,
        id: string,
    },
    type: {
        delivery_car: boolean,
        book_car_flash: boolean,
        // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
        mortgage: boolean,
        transmission_search: string,
    },
    favourite_car: boolean,
    name_car: string,
    point_star: number,
    total_trip: number,
    price_before_promotion: number,
    price_after_promotion: number,
    promotion: []
}

export interface ITypesCar {
    id: number,
    image: string,
    name: string,
    total_car: number
}
export interface IAutomaker {
    id: number,
    image: string,
    name: string,
    total_car: number
}

export interface IInitialStateSearchCar {
    listCardCars: IDataCardCar[],
    page: number,
    isLoadingScroll: boolean,
    next: any,
    filter: {
        listTypesCar: ITypesCar[],
        listAutomaker: IAutomaker[],
    },
    dataParams: {
        company_car_search: string,
        type_car_search: number[],
        tram_search: number,
        discount_search: number,
        transmission_search: string,
        book_car_flash: number,
        delivery_car: number,
        mortgage: number,
        star_search: number,
    },
    onSuccess: {
        onSuccessPage: boolean
    },
    limit: {
        limitFilterCars: number,
        limitAllCars: number,
    }
}

export interface IDataDetailCar {
    id: string,
    address: string,
    image_car: {
        car_id: number,
        created_at: string,
        id: number,
        name: string,
        updated_at: string
    }[],
    car_owner: {
        avatar: string,
        fullname: string,
        id: string,
    },
    type: {
        delivery_car: boolean,
        book_car_flash: boolean,
        // thế chấp bị ngược với các tag bình thường thế chấp là 0 còn lại là 1
        mortgage: boolean,
        transmission_search: string,
    },
    favourite_car: boolean,
    name_car: string,
    point_star: number,
    total_trip: number,
    price: {
        price_before_promotion: number,
        price_after_promotion: number,
    }
    promotion: {
        id: number,
        name: string,
        percent: number,
        price_promotion: number,
    }[],
    trait_car: {
        number_seat: number,
        number_car: string,
        type_fuel: string,
        year_manu: string,
    },
    describe_car: string,
    other_amenities_car: {
        id: number,
        name: string,
        image: string,
        created_at: string,
        updated_at: string,
        pilot: {
            car_id: number,
            other_amenities_car_id: number
        }
    }[],
    info_review_car: {
        review_car: {
            id: number,
            star: number,
            avatar: string,
            content: string,
            customer_name: string,
            date: string,
        }[],
        star: number,
        total_review_car: number
    },
    collateral_car: {
        mortgage: number,
        mortgage_policy_car: string,
        note_mortgage: string
    },
    surcharge_car: {
        id: number,
        name: string,
        note: string,
        value: string,
        created_at: string,
        updated_at: string,
        pivot: {
            car_id: number,
            surcharge_car_id: number
        }
    }[],
    cancel_trip: {
        title_cancel_trip: string,
        compensation_refund: string,
        note_cancel_trip: string,
        policy_cancel_trip: {
            id: number,
            guest_cancel: string,
            name: string,
            owen_cancel: string
        }[]
    },
    policy: {
        car_rental_policy: string,
        car_collateral_policy: string,
        car_insurance_policy:string,
        car_price_policy:string,
    }
}

export interface IInitialStateDetailCar {
    dataDetailCar: IDataDetailCar,
    onSuccess: {
        onSuccessPage: boolean
    }
}