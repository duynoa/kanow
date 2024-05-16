interface IDataPolicy {
    document_deposit: string,
    document_payment: string,
    documentation_policy_car: string,
    mortgage_policy_car: string,
    setting_insurance_car: string,
    setting_price_car: string,
    cancel_trip: {
        title_cancel_trip: string;
        compensation_refund: string;
        note_cancel_trip: string;
        policy_cancel_trip: {
            id: number;
            guest_cancel: string;
            name: string;
            owen_cancel: string;
        }[];
    },
    car_talent: {
        setting_hour_night_car_talent: string,
        setting_insurance_car_talent: string,
        setting_number_hour_day_car_talent: string,
        setting_price_car_talent: string,
        setting_service_car_talent: string,
        setting_shuttle_car_talent: string,
        total_km_car_talent: string,
    },
    getListPriceMonth: {
        id: number,
        name: string,
        selected: boolean
    }[],
    document_license: string,
    number_deposit_car: number,
    percent_deposit: number,
    percent_insurance: number
}

export type {
    IDataPolicy
}