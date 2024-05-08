export interface IArrayMyTripCar {
    id: number;
    address: any;
    car: {
        id: number;
        image: string;
        name: string;
        number_car: string;
        reference_no: string;
        note_mortgage: string;
    };
    customer: {
        id: number;
        fullname: string;
        avatar: string;
        total_star: number;
        total_trip: number;
        phone: string;
    };
    date: string;
    date_end: string;
    date_start: string;
    date_status: string;
    depoist: number;
    district: string;
    grand_total: number;
    price: {
        amount_km: number;
        deposit: number;
        grand_total: number;
        number_day: number;
        percent_deposit: string;
        price_insurance_day: number;
        promotion: number;
        rent_cost_day: number;
        total: number;
    };
    province: string;
    reference_no: string;
    status: {
        color: string;
        date_status: string;
        name: string;
        status: number;
    };
    surcharge_car: any;
    type: number;
}
export interface IDataFilterMyTrips {
    color: string;
    id: number | string;
    index: number;
    name: string;
}

export interface IMyTrips {
    pageMyTrips: number;
    pageMyTripsTalented: number;
    openFilter: boolean;
    isLoadingCar: boolean;
    dataMyTripsTalented: IArrayMyTripCar[];
    dataMyTrips: IArrayMyTripCar[];
    limit: number;
    tab: string;
    nextMyTrips: any;
    nextMyTripsTalented: any;
    totalDrivingCar: number;
    totalTalentedCar: number;
    isLoadingScroll: boolean;
    daTafilter: IDataFilterMyTrips[];
}
