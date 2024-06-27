import {
    IInitialStateDataHome,
    IInitialStateDetailCar,
    IInitialStateDetailCareer,
    IInitialStateDetailNewsEvents,
    IInitialStateInfoRentalCar,
    IInitialStateListCarAutonomous,
    IInitialStateListCarrer,
    IInitialStateListCarsDriver,
    IInitialStateNewsEvent,
    IInitialStatePayment,
    IInitialStatePolicy,
    IInitialStateProfileMyCar
} from '@/types/Initial/IInitial';
import { addDays, setHours, setMinutes } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

// data trang chủ
interface isStateDataHome {
    isStateDataHome: IInitialStateDataHome;
    queryKeyIsStateDataHome: (key: Partial<IInitialStateDataHome>) => void;
}

const isStateDataHome: IInitialStateDataHome = {
    listCardCarsForYou: [],
    tabSearch: {
        tabId: "0",
        type: "",
        tab: 1,
    },
    loading: {
        isLoadingListCars: false
    }
};

export const useDataHome = create<isStateDataHome>((set) => ({
    isStateDataHome,
    queryKeyIsStateDataHome: (key) => set((state) => ({
        isStateDataHome: {
            ...state.isStateDataHome,
            ...key
        }
    }
    )),
}));

// data list car tự lái (type === 1)
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
        listAutomaker: [],
        listModelCars: [],
    },
    dataParams: {
        company_car_search: "0",
        model_car_search: [],
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
    loading: {
        isLoadingDialogFilterListCars: false,
        isLoadingResetFilter: false,
    },
    limit: {
        limitFilterCars: 50,
        limitAllCars: 20,
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
        customer: {
            avatar: "",
            fullname: "",
            id: 0,
            star_avg: 0,
            total_trip: 0,
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
            total_km_day: 0,
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
        review_car: [],
        total_review_car: 0,
        collateral_car: {
            mortgage: 0,
            mortgage_policy_car: "",
            note_mortgage: "",
        },
        surcharge_car: [],
        surcharge_car_talent: [],
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
    map: {
        coordinates: {
            latCurrent: 0,
            lngCurrent: 0,
            lat: 0,
            lng: 0,
            latTo: 0,
            lngTo: 0,
        },
        valueAddressPickup: "",
        valueAddressDestination: [
            {
                id: "1",
                valueAddress: ""
            }
        ],
        indexAddressDestination: 0,
        totalDistance: 0,
        options: {},
        dataSubmit: {}
    }
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

// data list car có tài xế (type === 2)
interface isStateListCarsDriver {
    isStateListCarsDriver: IInitialStateListCarsDriver;
    queryKeyIsStateListCarsDriver: (key: Partial<IInitialStateListCarsDriver>) => void;
}

const isStateListCarsDriver: IInitialStateListCarsDriver = {
    listCardCars: [],
    isLoadingScroll: false,
    page: 1,
    next: null,
    filter: {
        listTypesCar: [],
        listAutomaker: [],
        listModelCars: [],
    },
    dataParams: {
        company_car_search: "0",
        model_car_search: [],
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
    loading: {
        isLoadingDialogFilterListCars: false,
        isLoadingResetFilter: false,
    },
    limit: {
        limitFilterCars: 50,
        limitAllCars: 20,
    }
};

export const useDataListCarsDriver = create<isStateListCarsDriver>((set) => ({
    isStateListCarsDriver,
    queryKeyIsStateListCarsDriver: (key) => set((state) => ({
        isStateListCarsDriver: {
            ...state.isStateListCarsDriver,
            ...key
        }
    }
    )),
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
        loading: {
            isLoadingSubmitReview: false,
            isLoadingButton: false
        }
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
        },
    },
    queryKeyIsStatePaymentRental: (key: any) => set((state) => ({
        ...state,
        isStatePaymentRental: {
            ...state.isStatePaymentRental,
            ...key,
        },
    })),
}));


// State profile xe của tôi
interface IStateProfileMyCar {
    isStateProfileMyCar: IInitialStateProfileMyCar;
    queryKeyIsStateProfileMyCar: (key: any) => void;
}

export const useDataProfileMyCar = create<IStateProfileMyCar>((set) => ({
    isStateProfileMyCar: {
        isLoadingCar: false,
        isLoadingScroll: false,
        limit: 8,
        page: 1,
        dataMyCar: [],
        next: "",
        tab: 1
    },
    queryKeyIsStateProfileMyCar: (key: any) => set((state) => ({
        ...state,
        isStateProfileMyCar: {
            ...state.isStateProfileMyCar,
            ...key,
        },
    })),
}));


// data event & news
interface IStateNewsEvents {
    isStateNewsEvents: IInitialStateNewsEvent;
    queryKeyIsStateNewsEvents: (key: any) => void;
}

export const useDataNewsEvents = create<IStateNewsEvents>((set) => ({
    isStateNewsEvents: {
        listNewsEvents: [],
        loading: {
            isLoadingListNewsEvent: false,
            isLoadingButton: false
        },
        params: {
            page: 1,
            limit: 11,
            next: null,
            total_blog: 0,
        },
    },
    queryKeyIsStateNewsEvents: (key: any) => set((state) => ({
        ...state,
        isStateNewsEvents: {
            ...state.isStateNewsEvents,
            ...key,
        },
    })),
}));

// data listCarrer
interface IStateListCarrer {
    isStateListCarrer: IInitialStateListCarrer;
    queryKeyIsStateListCarrer: (key: any) => void;
}

export const useDataListCarrer = create<IStateListCarrer>((set) => ({
    isStateListCarrer: {
        listCarrer: [],
        loading: {
            isLoadingListCarrer: false,
            isLoadingButton: false
        },
        params: {
            page: 1,
            limit: 8,
            next: null,
            total_blog: 0,
        },
    },
    queryKeyIsStateListCarrer: (key: any) => set((state) => ({
        ...state,
        isStateListCarrer: {
            ...state.isStateListCarrer,
            ...key,
        },
    })),
}));
// data Detail New & Event
interface IStateDetailNewsEvents {
    isStateDetailNewsEvents: IInitialStateDetailNewsEvents;
    queryKeyIsStateDetailNewsEvents: (key: any) => void;
}

export const useDataDetailNewsEvents = create<IStateDetailNewsEvents>((set) => ({
    isStateDetailNewsEvents: {
        dataDetail: {
            id: 0,
            title: "",
            descption: "",
            content: "",
            image: "",
            created_at: "",
        },
        listNewsEventsRelated: [],
        loading: {
            isLoadingDataDetail: false,
            isLoadingListNewsEventsRelated: false,
            isLoadingButton: false,
        },
    },
    queryKeyIsStateDetailNewsEvents: (key: any) => set((state) => ({
        ...state,
        isStateDetailNewsEvents: {
            ...state.isStateDetailNewsEvents,
            ...key,
        },
    })),
}));
// data Detail Career
interface IStateDetailCareer {
    isStateDetailCareer: IInitialStateDetailCareer;
    queryKeyIsStateDetailCareer: (key: any) => void;
}

export const useDataDetailCareer = create<IStateDetailCareer>((set) => ({
    isStateDetailCareer: {
        dataDetail: {
            id: 0,
            title: "",
            infomation: {
                salary: "",
                experience: "",
                working_form: "",
                degree: "",
                gender: "",
                quantity: "",
                address: ""
            },
            descption: "",
            content: "",
            job_requirement: "",
            your_benefit: "",
            created_at: "",
        },
        listCareerRelated: [],
        loading: {
            isLoadingDataDetail: false,
            isLoadingListCareerRelated: false,
            isLoadingButton: false,
        },
    },
    queryKeyIsStateDetailCareer: (key: any) => set((state) => ({
        ...state,
        isStateDetailCareer: {
            ...state.isStateDetailCareer,
            ...key,
        },
    })),
}));

// data my wallet
interface IStateMyWallet {
    isStateMyWallet: any;
    // isStateMyWallet: IInitialStateMyWallet;
    queryKeyIsStateMyWallet: (key: any) => void;
}

export const useDataMyWallet = create<IStateMyWallet>((set) => ({
    isStateMyWallet: {
        selectedMonth: "",
        listSyntheticTransaction: undefined
    },
    queryKeyIsStateMyWallet: (key: any) => set((state) => ({
        ...state,
        isStateMyWallet: {
            ...state.isStateMyWallet,
            ...key,
        },
    })),
}));
