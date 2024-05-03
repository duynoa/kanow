import { IAutomaker, IDataCardCar, IDataDetailCar, IDetailRentalCar, ITypesCar } from "../Cars/ICars";
import { IInfoPromotion } from "../Cars/IPromotions";
import { IReportCar } from "../Cars/IReportCar";
import { IDataPolicy } from "../Policy/IPolicy";

// initial Data page home
interface IInitialStateDataHome {
    listCardCarsForYou: IDataCardCar[];
    tabSearch: {
        tabId: string,
        type: string,
        tab: number,
    },
    loading: {
        isLoadingListCars: boolean;
    };
}
// initial list cars autonomous
interface IInitialStateListCarAutonomous {
    listCardCars: IDataCardCar[];
    page: number;
    isLoadingScroll: boolean;
    next: any;
    filter: {
        listTypesCar: ITypesCar[];
        listAutomaker: IAutomaker[];
        listModelCars: any[];
    };
    dataParams: {
        company_car_search: string;
        model_car_search: any[];
        type_car_search: number[];
        tram_search: number;
        discount_search: number;
        transmission_search: string;
        book_car_flash: number;
        delivery_car: number;
        mortgage: number;
        star_search: number;
    };
    onSuccess: {
        onSuccessPage: boolean;
    };
    loading: {
        isLoadingDialogFilterListCars: boolean;
        isLoadingResetFilter: boolean;
    };
    limit: {
        limitFilterCars: number;
        limitAllCars: number;
    };
}

// initial list cars driver
interface IInitialStateListCarsDriver {
    listCardCars: IDataCardCar[];
    page: number;
    isLoadingScroll: boolean;
    next: any;
    filter: {
        listTypesCar: ITypesCar[];
        listAutomaker: IAutomaker[];
        listModelCars: any[]
    };
    dataParams: {
        company_car_search: string;
        model_car_search: any[];
        type_car_search: number[];
        tram_search: number;
        discount_search: number;
        transmission_search: string;
        book_car_flash: number;
        delivery_car: number;
        mortgage: number;
        star_search: number;
    };
    onSuccess: {
        onSuccessPage: boolean;
    };
    loading: {
        isLoadingDialogFilterListCars: boolean;
        isLoadingResetFilter: boolean;
    };
    limit: {
        limitFilterCars: number;
        limitAllCars: number;
    };
}

// initial detail car
interface IInitialStateDetailCar {
    dataDetailCar: IDataDetailCar;
    infoPromotion: {
        selectPromotion: string;
        activePromotion: IInfoPromotion | null;
    };
    listCarsRelated: IDataCardCar[];
    reportCar: {
        listReportCar: IReportCar[];
        selectReportCar: string;
        contentReportCar: string;
    };
    onSuccess: {
        onSuccessPage: boolean;
    };
    map: {
        coordinates: {
            latCurrent: Number,
            lngCurrent: Number,
            lat: Number,
            lng: Number,
            latTo: Number,
            lngTo: Number,
        },
        valueAddressPickup: any,
        valueAddressDestination: {
            id: string,
            valueAddress: string
        }[],
        indexAddressDestination: number,
        totalDistance: number,
        options: any,
        dataSubmit: any
    }
}

// initial rental car
interface IInitialStateInfoRentalCar {
    detailRentalCar?: IDetailRentalCar;
}

// initial payment car
interface IInitialStatePayment {
    detailRentalCar?: IDetailRentalCar;
    listPaymentMode: {
        id: number;
        image: string;
        name: string;
        note: string;
        type: number;
    }[];
    payment: {
        idActivePaymentMethod: number | string;
        indexPaymentMethod: number;
    };
}

// initial policy
interface IInitialStatePolicy {
    dataPolicy?: IDataPolicy;
}

// ininitial profile xe của tôi
interface IInitialStateProfileMyCar {
    dataMyCar: any[];
    page: number;
    next: any;
    limit: number;
    isLoadingScroll: boolean;
    isLoadingCar: boolean;
    tab: number | string;
}

export type {
    IInitialStateDataHome,
    IInitialStateListCarAutonomous,
    IInitialStateListCarsDriver,
    IInitialStateDetailCar,
    IInitialStateInfoRentalCar,
    IInitialStatePayment,
    IInitialStatePolicy,
    IInitialStateProfileMyCar,
};
