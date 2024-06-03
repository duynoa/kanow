import { IDetailCareer, IDetailNewsEvents, IListCareer, IListNewsEvents } from "../Blog/IBlog";
import { IAutomaker, IDataCardCar, IDataDetailCar, IDetailRentalCar, ITypesCar } from "../Cars/ICars";
import { IInfoPromotion } from "../Cars/IPromotions";
import { IReportCar } from "../Cars/IReportCar";
import { INotification } from "../Notification/INotification";
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
    next: any;
    isLoadingScroll: boolean;
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

    loading: {
        isLoadingSubmitReview: boolean,
        isLoadingButton: boolean
    }
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

// initial notification
interface IInitialStateNotification {
    dataListNotifications: INotification[];
    dataItemNotification?: INotification;
    isLoading: {
        isLoadingNotification: boolean,
        isLoadingScroll: boolean,
    };
    dataNotify: any,
    page: number;
    next: any;
    limit: number
}

// initial Load success (hàm sự kiện kiểm soát để fetch api, loading,...)
interface IInitialStateLoadSuccess {
    loading: {
        isSuccessFetchApi: boolean;
        isLoadingButton: boolean;
    };
    success: any;
}

// initial Data ALL Review (quản lí draw review)
interface IInitialStateAllReview {
    listAllReviewCar: any[],
    loading: {
        isLoadingListReview: boolean,
        isLoadingButton: boolean
    },
    params: {
        page: number,
        limit: number,
        next: null | string
        total_review: number,
    }
}

// initial news event (trang tin tức & hoạt động)
interface IInitialStateNewsEvent {
    listNewsEvents: IListNewsEvents,
    loading: {
        isLoadingListNewsEvent: boolean,
        isLoadingButton: boolean
    },
    params: {
        page: number,
        limit: number,
        next: null | string,
        total_blog: number,
    }
}
interface IInitialStateListCarrer {
    listCarrer: any[],
    loading: {
        isLoadingListCarrer: boolean,
        isLoadingButton: boolean
    },
    params: {
        page: number,
        limit: number,
        next: null | string,
        total_blog: number,
    }
}

// interface detail new & event
interface IInitialStateDetailNewsEvents {
    dataDetail: IDetailNewsEvents,
    listNewsEventsRelated: IListNewsEvents,
    loading: {
        isLoadingDataDetail: boolean,
        isLoadingListNewsEventsRelated: boolean,
        isLoadingButton: boolean,
    },
}
interface IInitialStateDetailCareer {
    dataDetail: IDetailCareer,
    listCareerRelated: IListCareer,
    loading: {
        isLoadingDataDetail: boolean,
        isLoadingListCareerRelated: boolean,
        isLoadingButton: boolean,
    },
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
    IInitialStateNotification,
    IInitialStateLoadSuccess,
    IInitialStateAllReview,
    IInitialStateNewsEvent,
    IInitialStateListCarrer,
    IInitialStateDetailNewsEvents,
    IInitialStateDetailCareer
};
