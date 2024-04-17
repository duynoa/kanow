import {
    IInitialStateDetailCar,
    IInitialStateInfoRentalCar,
    IInitialStatePayment,
    IInitialStatePolicy
} from '@/types/Initial/IInitial';
import { addDays, setHours, setMinutes } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

// data detail car tự lái
interface IStateDetailCar {
    isStateDetailCar: IInitialStateDetailCar;
    shouldFetchData: boolean;
    setShouldFetchData: (shouldFetchData: boolean) => void;
    queryKeyIsStateDetailCar: (key: Partial<IInitialStateDetailCar>) => void;
}

const isStateDetailCar: IInitialStateDetailCar = {
    dataDetailCar: {
        id: "",
        address: "",
        full_address: "",
        image_car: [],
        car_owner: {
            avatar: "",
            fullname: "",
            id: "",
        },
        type: {
            delivery_car: false,
            book_car_flash: false,
            mortgage: false,
            transmission_search: "",
        },
        favorite_car: false,
        name_car: "",
        point_star: 0,
        total_trip: 0,
        price: {
            percent_deposit: 0,
            price_before_promotion: 0,
            price_after_promotion: 0,

            rent_cost: 0,
            rent_cost_day: 0,
            price_insurance_day: 0,
            temp_total_amount: 0,
            total_amount: 0,

            max_money_discount: 0,
            // tiền đặt cọc
            price_depoist: 0,
            // số ngày
            number_day: 0,
            // thanh toán khi nhận xe
            cash_on_delivery: 0
        },
        promotion: [],
        trait_car: {
            number_seat: 0,
            number_car: "",
            type_fuel: "",
            year_manu: "",
        },
        describe_car: "",
        other_amenities_car: [],
        info_review_car: {
            review_car: [],
            star: 0,
            total_review_car: 0,
        },
        collateral_car: {
            mortgage: 0,
            mortgage_policy_car: "",
            note_mortgage: "",
        },
        surcharge_car: [],
        hour_back_car: [],
        hour_receive_car: []
    },
    infoPromotion: {
        selectPromotion: "0",
        activePromotion: null,
    },
    listCarsRelated: [],
    reportCar: {
        listReportCar: [],
        selectReportCar: "",
        contentReportCar: ""
    },
    onSuccess: {
        onSuccessPage: false
    },
};

export const useDataDetailCar = create<IStateDetailCar>((set) => ({
    isStateDetailCar,
    shouldFetchData: false,
    queryKeyIsStateDetailCar: (key) => set((state) => ({
        isStateDetailCar: {
            ...state.isStateDetailCar,
            ...key
        }
    }
    )),
    setShouldFetchData: (shouldFetchData: boolean) => set((state) => ({ ...state, shouldFetchData: shouldFetchData })),
}));

// data request rental Car
interface IStateRentalCar {
    isStateInfoRentalCar: IInitialStateInfoRentalCar;
    queryKeyIsStateInfoRentalCar: (key: any) => void;
}

export const useDataInfoRentalCar = create<IStateRentalCar>((set) => ({
    isStateInfoRentalCar: {
        detailRentalCar: undefined,
    },
    queryKeyIsStateInfoRentalCar: (key: any) => set((state) => ({
        ...state,
        isStateInfoRentalCar: {
            ...state.isStateInfoRentalCar,
            ...key,
        },
    })),
}));

// data policy (?)
interface IStatePolicy {
    isStatePolicy: IInitialStatePolicy;
    queryKeyIsStatePolicy: (key: any) => void;
}

export const useDataPolicy = create<IStatePolicy>((set) => ({
    isStatePolicy: {
        dataPolicy: undefined
    },
    queryKeyIsStatePolicy: (key: any) => set((state) => ({
        ...state,
        isStatePolicy: {
            ...state.isStatePolicy,
            ...key,
        },
    })),
}));

// data Payment method mode
interface IStatePaymentRental {
    isStatePaymentRental: IInitialStatePayment;
    queryKeyIsStatePaymentRental: (key: any) => void;
}

export const useDataPaymentRental = create<IStatePaymentRental>((set) => ({
    isStatePaymentRental: {
        listPaymentMode: [],
        payment: {
            idActivePaymentMethod: 0,
            indexPaymentMethod: 0
        }
    },
    queryKeyIsStatePaymentRental: (key: any) => set((state) => ({
        ...state,
        isStatePaymentRental: {
            ...state.isStatePaymentRental,
            ...key,
        },
    })),
}));
