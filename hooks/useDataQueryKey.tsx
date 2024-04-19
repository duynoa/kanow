import {
    IInitialStateDetailCar,
    IInitialStateInfoRentalCar,
    IInitialStateListCarAutonomous,
    IInitialStatePayment,
    IInitialStatePolicy
} from '@/types/Initial/IInitial';
import { addDays, setHours, setMinutes } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

// data list car tự lái
interface isStateListCarAutonomous {
    isStateListCarAutonomous: IInitialStateListCarAutonomous;
    queryKeyIsStateListCarAutonomous: (key: Partial<IInitialStateListCarAutonomous>) => void;
}

const isStateListCarAutonomous: IInitialStateListCarAutonomous = {
    listCardCars: [],
    isLoadingScroll: false,
    page: 1,
    next: null,
    filter: {
        listTypesCar: [],
        listAutomaker: []
    },
    dataParams: {
        company_car_search: "0",
        transmission_search: "0",
        type_car_search: [],
        tram_search: 0,
        discount_search: 0,
        book_car_flash: 0,
        delivery_car: 0,
        mortgage: 0,
        star_search: 0,
    },
    onSuccess: {
        onSuccessPage: false
    },
    limit: {
        limitFilterCars: 50,
        limitAllCars: 8,
    }
};

export const useDataListCarAutonomous = create<isStateListCarAutonomous>((set) => ({
    isStateListCarAutonomous,
    queryKeyIsStateListCarAutonomous: (key) => set((state) => ({
        isStateListCarAutonomous: {
            ...state.isStateListCarAutonomous,
            ...key
        }
    }
    )),
}));
// data detail car tự lái
interface IStateDetailCar {
    isStateDetailCar: IInitialStateDetailCar;
    isLoadingSkeletonDetailCar: boolean;
    setIsLoadingSkeletonDetailCar: (isLoadingSkeletonDetailCar: boolean) => void;
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
    isLoadingSkeletonDetailCar: false,
    queryKeyIsStateDetailCar: (key) => set((state) => ({
        isStateDetailCar: {
            ...state.isStateDetailCar,
            ...key
        }
    }
    )),
    setIsLoadingSkeletonDetailCar: (isLoadingSkeletonDetailCar: boolean) => set((state) => ({ ...state, isLoadingSkeletonDetailCar: isLoadingSkeletonDetailCar })),
}));

// data request rental Car
interface IStateRentalCar {
    isStateInfoRentalCar: IInitialStateInfoRentalCar;
    isLoadingSkeletonIntroRentalCar: boolean;
    queryKeyIsStateInfoRentalCar: (key: any) => void;
    setIsLoadingSkeletonIntroRentalCar: (isLoadingSkeletonIntroRentalCar: boolean) => void;
}

export const useDataInfoRentalCar = create<IStateRentalCar>((set) => ({
    isStateInfoRentalCar: {
        detailRentalCar: undefined,
    },
    isLoadingSkeletonIntroRentalCar: false,
    queryKeyIsStateInfoRentalCar: (key: any) => set((state) => ({
        ...state,
        isStateInfoRentalCar: {
            ...state.isStateInfoRentalCar,
            ...key,
        },
    })),
    setIsLoadingSkeletonIntroRentalCar: (isLoadingSkeletonIntroRentalCar: boolean) => set((state) => ({ ...state, isLoadingSkeletonIntroRentalCar: isLoadingSkeletonIntroRentalCar })),
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
