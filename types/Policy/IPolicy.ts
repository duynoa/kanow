interface IDataPolicy {
    car_deposit_policy: string,
    car_payment_policy: string,
    car_rental_policy: string,
    car_collateral_policy: string,
    car_insurance_policy: string,
    car_price_policy: string,
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
    number_deposit_car: number,
    percent_deposit: number,
    percent_insurance: number
}

export type {
    IDataPolicy
}