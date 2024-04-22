import { IAutomaker, IDataCardCar, IDataDetailCar, IDetailRentalCar, ITypesCar } from "../Cars/ICars";
import { IInfoPromotion } from "../Cars/IPromotions";
import { IReportCar } from "../Cars/IReportCar";
import { IDataPolicy } from "../Policy/IPolicy";

// initial Data page home
interface IInitialStateDataHome {
    listCardCarsForYou: IDataCardCar[];
    tabSearch: {
        tabId: string,
        type?: string,
    },
    loading: {
        isLoadingListCars: boolean
    }
}
// initial list car autonomous
interface IInitialStateListCarAutonomous {
    listCardCars: IDataCardCar[];
    page: number;
    isLoadingScroll: boolean;
    next: any;
    filter: {
        listTypesCar: ITypesCar[];
        listAutomaker: IAutomaker[];
    };
    dataParams: {
        company_car_search: string;
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
    limit: {
        limitFilterCars: number;
        limitAllCars: number;
    };
}

// initial detail car
interface IInitialStateDetailCar {
    dataDetailCar: IDataDetailCar;
    infoPromotion: {
        selectPromotion: string,
        activePromotion: IInfoPromotion | null,
    },
    listCarsRelated: IDataCardCar[],
    reportCar: {
        listReportCar: IReportCar[],
        selectReportCar: string,
        contentReportCar: string,
    },
    onSuccess: {
        onSuccessPage: boolean;
    },
}

// initial rental car
interface IInitialStateInfoRentalCar {
    detailRentalCar?: IDetailRentalCar
}

// initial payment car
interface IInitialStatePayment {
    detailRentalCar?: IDetailRentalCar,
    listPaymentMode: {
        id: number,
        image: string,
        name: string,
        note: string,
        type: number
    }[],
    payment: {
        idActivePaymentMethod: number | string,
        indexPaymentMethod: number
    }
}

// initial policy
interface IInitialStatePolicy {
    dataPolicy?: IDataPolicy
}

export type {
    IInitialStateDataHome,
    IInitialStateListCarAutonomous,
    IInitialStateDetailCar,
    IInitialStateInfoRentalCar,
    IInitialStatePayment,
    IInitialStatePolicy
}