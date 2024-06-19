import { IInfoPromotion } from "@/types/Cars/IPromotions";
import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { addDays, getHours, setHours, setMinutes } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

// dialog login
interface IOpenDialogLogin {
    openDialogLogin: boolean;
    statusModal: string
    setStatusModal: (type: any) => void
    setOpenDialogLogin: (key: any) => void;
}

export const useDialogLogin = create<IOpenDialogLogin>((set) => ({
    openDialogLogin: false,
    statusModal: "login",
    setStatusModal: (type: string) => set((state) => ({ statusModal: type })),
    setOpenDialogLogin: (key: boolean) => set((state) => ({ openDialogLogin: key })),
}));

// dialog promotion
interface IOpenDialogPromotion {
    openDialogPromotion: boolean;
    isLoadingDataPromotions: boolean;
    dataPromotions: IInfoPromotion[];
    setOpenDialogPromotion: (key: boolean) => void;
    setIsLoadingDataPromotion: (key: boolean) => void;
    setDataPromotions: (dataPromotions: IInfoPromotion[]) => void
}

export const useDialogPromotion = create<IOpenDialogPromotion>((set) => ({
    openDialogPromotion: false,
    dataPromotions: [],
    isLoadingDataPromotions: false,
    setOpenDialogPromotion: (key: boolean) => set((state) => ({ openDialogPromotion: key })),
    setIsLoadingDataPromotion: (key: boolean) => set((state) => ({ isLoadingDataPromotions: key })),
    setDataPromotions: (key: IInfoPromotion[]) => set((state) => ({ dataPromotions: key })),
}));

// dialog calendar
interface IOpenDialogCalendar {
    dateReal: DateRange | undefined;
    dateTemp: DateRange | undefined;
    dateStart: Date | undefined;
    dateEnd: Date | undefined;
    numberDay: number
    openDialogCalendar: boolean;
    typeCarCalendar: string;
    statusDate: number;
    validateDateSubmit: boolean;
    dataCalendar: any[];
    flagSubmit: boolean;
    currentSlideIndex: number,
    setDateReal: (dateReal: DateRange | undefined) => void;
    setDateTemp: (dateTemp: DateRange | undefined) => void;
    setDateStart: (dateStart: Date | undefined) => void;
    setDateEnd: (dateEnd: Date | undefined) => void;
    setOpenDialogCalendar: (key: any) => void
    setTypeCarCalendar: (key: any, typeCarCalendar?: string) => void
    setNumberDay: (numberDay: number) => void;
    setFlagSubmit: (flagSubmit: boolean) => void;
    setStatusDate: (statusDate: number) => void;
    setValidateDateSubmit: (validateDateSubmit: boolean) => void;
    setDataCalendar: (dataCalenndar: any[]) => void;
    setCurrentSlideIndex: (currentSlideIndex: number) => void;
}

const defaultDateRange: DateRange = {
    from: setMinutes(setHours(new Date(), getHours(new Date()) + 2), 0),
    // from: setMinutes(setHours(new Date(), 8), 0),
    to: setMinutes(setHours(addDays(new Date(), 1), 8), 0),
};

export const useDialogCalendar = create<IOpenDialogCalendar>((set) => ({
    openDialogCalendar: false,
    dateReal: defaultDateRange,
    dateTemp: undefined, // trong chi tiết xe có tài
    dateStart: undefined, // show dateStart ở trang chủ và trang danh sách xe
    dateEnd: undefined, // show dateEnd ở trang chủ và trang danh sách xe
    numberDay: 1, // số ngày tính ra được
    flagSubmit: false, // cờ để submit
    statusDate: 0,
    typeCarCalendar: "",
    validateDateSubmit: false,
    dataCalendar: [],
    currentSlideIndex: 0,
    setCurrentSlideIndex: (key: number) => set((state) => ({ ...state, currentSlideIndex: key })),
    setOpenDialogCalendar: (key: any) => set((state) => ({ ...state, openDialogCalendar: key })),
    setTypeCarCalendar: (typeCarCalendar?: string) => set((state) => ({ ...state, typeCarCalendar: typeCarCalendar })),
    setDateReal: (dateReal: DateRange | undefined) => set((state) => ({ ...state, dateReal })),
    setDateTemp: (dateTemp: DateRange | undefined) => set((state) => ({ ...state, dateTemp })),
    setDateStart: (dateStart: Date | undefined) => set((state) => ({ ...state, dateStart: dateStart })),
    setDateEnd: (dateEnd: Date | undefined) => set((state) => ({ ...state, dateEnd: dateEnd })),
    setFlagSubmit: (flagSubmit: boolean) => set((state) => ({ ...state, flagSubmit: flagSubmit })),
    setNumberDay: (numberDay: number) => set((state) => ({ ...state, numberDay: numberDay })),
    setStatusDate: (statusDate: number) => set((state) => ({ ...state, statusDate: statusDate })),
    setValidateDateSubmit: (validateDateSubmit: boolean) => set((state) => ({ ...state, validateDateSubmit: validateDateSubmit })),
    setDataCalendar: (dataCalendar: any[]) => set((state) => ({ ...state, dataCalendar: dataCalendar })),
}))

// dialog filter list car
interface IOpenDialogFilterListCars {
    openDialogFilterListCars: boolean;
    setOpenDialogFilterListCars: (key: any, type?: string) => void;
    type?: string;
}

export const useDialogFilterListCars = create<IOpenDialogFilterListCars>((set) => ({
    openDialogFilterListCars: false,
    type: "",
    setOpenDialogFilterListCars: (key: any, type?: string) => set((state) => ({ openDialogFilterListCars: key, type: type })),
}));

// dialog question policy (onClick icon ?)
interface IOpenDialogAnswerPolicy {
    openDialogAnswerPolicy: boolean;
    setOpenDialogAnswerPolicy: (key: any, type?: string) => void;
    type?: string;
}

export const useDialogAnswerPolicy = create<IOpenDialogAnswerPolicy>((set) => ({
    openDialogAnswerPolicy: false,
    type: "",
    setOpenDialogAnswerPolicy: (key: any, type?: string) => set((state) => ({ openDialogAnswerPolicy: key, type: type })),
}));

// dialog report (báo cáo xe)
interface IOpenDialogReportCar {
    openDialogReportCar: boolean;
    type?: string;
    dataListReportCar: any[];
    setOpenDialogReportCar: (key: any, type?: string) => void;
    setDataListReportCar: (dataListReportCar: any[]) => void
}

export const useDialogReportCar = create<IOpenDialogReportCar>((set) => ({
    openDialogReportCar: false,
    type: "",
    dataListReportCar: [],
    setOpenDialogReportCar: (key: any, type?: string) => set((state) => ({ openDialogReportCar: key, type: type })),
    setDataListReportCar: (key: any[]) => set((state) => ({ dataListReportCar: key })),
}));

// dialog request car rental (dialog xác nhận gửi xe)
interface IOpenDialogRequestCarRental {
    type?: string;
    openDialogRequestCarRental: boolean;
    isLoadingButtonRequest: boolean
    dataListRequestCarRental?: IInitialStateDetailCar;
    setOpenDialogRequestCarRental: (key: boolean, type?: string) => void;
    setIsLoadingButtonRequest: (key: any) => void;
    setDataListRequestCarRental: (dataListRequestCarRental?: IInitialStateDetailCar) => void
}

export const useDialogRequestCarRental = create<IOpenDialogRequestCarRental>((set) => ({
    type: "",
    openDialogRequestCarRental: false,
    isLoadingButtonRequest: false,
    dataListRequestCarRental: undefined,
    setOpenDialogRequestCarRental: (key: boolean, type?: string) => set((state) => ({ openDialogRequestCarRental: key, type: type })),
    setIsLoadingButtonRequest: (isLoadingButtonRequest: boolean) => set((state) => ({ isLoadingButtonRequest: isLoadingButtonRequest })),
    setDataListRequestCarRental: (key: any) => set((state) => ({ dataListRequestCarRental: key })),
}));

// dialog validate (dialog các validate)
interface IOpenDialogValidate {
    openDialogValidate: boolean;
    type?: string;
    dataValidate?: any;
    setOpenDialogValidate: (key: any, type?: string) => void;
    setDataValidate: (dataValidate?: any) => void
}

export const useDialogValidate = create<IOpenDialogValidate>((set) => ({
    openDialogValidate: false,
    type: "",
    dataValidate: undefined,
    setOpenDialogValidate: (key: any, type?: string) => set((state) => ({ openDialogValidate: key, type: type })),
    setDataValidate: (key: any) => set((state) => ({ dataValidate: key })),
}));

// dialog cancel car (huỷ xe)
interface IOpenDialogCancelCar {
    type?: string;
    dataInfo?: any;
    dataListReasonsCancel: any[];
    openDialogCancelCar: boolean;
    isLoadingDialogCancelCar: boolean;
    isLoadingButtonSubmit: boolean;
    setDataInfo: (dataInfo?: any) => void;
    setOpenDialogCancelCar: (key: boolean, type?: string) => void;
    setDataListReasonsCancel: (dataListReasonsCancel: any[]) => void;
    setIsLoadingDialogCancelCar: (key: boolean) => void;
    setIsLoadingButtonSubmit: (isLoadingButtonSubmit: boolean) => void;
}

export const useDialogCancelCar = create<IOpenDialogCancelCar>((set) => ({
    type: "",
    dataInfo: {},
    dataListReasonsCancel: [],
    openDialogCancelCar: false,
    isLoadingDialogCancelCar: false,
    isLoadingButtonSubmit: false,
    setDataInfo: (key: any) => set((state) => ({ dataInfo: key })),
    setOpenDialogCancelCar: (key: boolean, type?: string) => set((state) => ({ openDialogCancelCar: key, type: type })),
    setDataListReasonsCancel: (key: any[]) => set((state) => ({ dataListReasonsCancel: key })),
    setIsLoadingDialogCancelCar: (key: boolean) => set((state) => ({ isLoadingDialogCancelCar: key })),
    setIsLoadingButtonSubmit: (isLoadingButtonSubmit: boolean) => set((state) => ({ isLoadingButtonSubmit: isLoadingButtonSubmit })),
}));

// dialog address filter
interface IOpenDialogAddress {
    type: string,
    indexAddressDestination: number,
    openDialogAddress: boolean;
    valueAddressPickup: any,
    valueAddressDestination: {
        id: string,
        valueAddress: string
    }[],
    coordinates: {
        latCurrent: Number,
        lngCurrent: Number,
        lat: Number,
        lng: Number,
        latTo: Number,
        lngTo: Number,
    },
    openBoxSearch: boolean;
    setOpenBoxSearch: (key: any) => void;
    setType: (type: string) => void;
    setIndexAddressDestination: (indexAddressDestination: number) => void;
    setOpenDialogAddress: (key: any) => void;
    setValueAddressPickup: (value: any) => void
    setValueAddressDestination: (value: any[]) => void
    setCoordinates: (value: any) => void
}

export const useDialogAddress = create<IOpenDialogAddress>((set) => ({
    type: "",
    indexAddressDestination: 0,
    openDialogAddress: false,
    valueAddressPickup: "",
    valueAddressDestination: [
        {
            id: "1",
            valueAddress: ""
        }
    ],
    openBoxSearch: false,
    coordinates: {
        latCurrent: 0,
        lngCurrent: 0,
        lat: 0,
        lng: 0,
        latTo: 0,
        lngTo: 0,
    },

    setType: (type: string) => set((state) => ({ ...state, type: type })),
    setIndexAddressDestination: (index: number) => set((state) => ({ ...state, indexAddressDestination: index })),
    setOpenBoxSearch: (key: boolean) => set((state) => ({ openBoxSearch: key })),
    setCoordinates: (value: any) => set((state) => ({
        ...state,
        coordinates: {
            ...state.coordinates,
            ...value
        }
    })),
    setOpenDialogAddress: (key: any) => set((state) => ({ ...state, openDialogAddress: key })),
    setValueAddressPickup: (value: any) => set((state) => ({ ...state, valueAddressPickup: value })),
    setValueAddressDestination: (value: any[]) => set((state) => ({ ...state, valueAddressDestination: value })),

}));

// Dialog lộ trình 2 chiều
interface IOpenDialogRouteAddress {
    valueTwoAddress: string,
    itemValuePickup: any,
    itemValueDestination: any,
    dataTotalAddress: any,
    openDialogRouteAddress: boolean;
    flagCloseModalRouteAddress: boolean,
    setOpenDialogRouteAddress: (key: any) => void;
    setItemValuePickup: (itemValuePickup: any) => void;
    setItemValueDestination: (itemValueDestination: any) => void;
    setValueTwoAddress: (valueTwoAddress: any) => void
    setDataTotalAddress: (dataTotalAddress: any) => void
    setFlagCloseModalRouteAddress: (value: any) => void
}

export const useDialogRouteAddress = create<IOpenDialogRouteAddress>((set) => ({
    valueTwoAddress: "",
    openDialogRouteAddress: false,
    itemValuePickup: {},
    itemValueDestination: {},
    dataTotalAddress: {},
    flagCloseModalRouteAddress: false,
    setFlagCloseModalRouteAddress: (value: boolean) => set((state) => ({ ...state, flagCloseModalRouteAddress: value })),
    setOpenDialogRouteAddress: (key: any) => set((state) => ({ ...state, openDialogRouteAddress: key })),
    setItemValuePickup: (itemValuePickup: any) => set((state) => ({ ...state, itemValuePickup: itemValuePickup })),
    setItemValueDestination: (itemValueDestination: any) => set((state) => ({ ...state, itemValueDestination: itemValueDestination })),
    setValueTwoAddress: (valueTwoAddress: any) => set((state) => ({ ...state, valueTwoAddress: valueTwoAddress })),
    setDataTotalAddress: (dataTotalAddress: any) => set((state) => ({ ...state, dataTotalAddress: dataTotalAddress })),
}));

// dialog đăng ký xe cho thuê ở trang menu dropdow
interface IOpenDialogRegisterOwnerDriver {
    type?: string
    openDialogRegisterOwnerDriver: boolean;
    setOpenDialogRegisterOwnerDriver: (key: any, type?: string) => void;
}

export const useDialogRegisterOwnerDriver = create<IOpenDialogRegisterOwnerDriver>((set) => ({
    openDialogRegisterOwnerDriver: false,
    setOpenDialogRegisterOwnerDriver: (key: any, type?: string) => set((state) => ({ openDialogRegisterOwnerDriver: key, type: type })),
    type: "",
}));

// Dialog bộ lọc xe của tôi, chuyến của tôi
interface IOpenDialogFilterCar {
    type?: string;
    defaultValue?: any;
    valueFilter?: any;
    dataFilter: any[];
    openDialogFilterCar: boolean;
    setValueFilter: (key: any) => void;
    setDefaultValue: (key: any) => void;
    setOpenDialogFilterCar: (key: any, type?: string) => void;
    setDataFilter: (key: any) => void;
}

export const useDialogFilterMyCar = create<IOpenDialogFilterCar>((set) => ({
    openDialogFilterCar: false,
    defaultValue: "",
    setValueFilter: (value: any) => set((state) => ({ valueFilter: value, defaultValue: value })),
    setDefaultValue: (value: any) => set((state) => ({ defaultValue: value })),
    setOpenDialogFilterCar: (key: any, type?: string) => set((state) => ({ openDialogFilterCar: key, type: type })),
    dataFilter: [],
    valueFilter: "-1",
    setDataFilter: (key: any) => set((state) => ({ dataFilter: key })),
}))

// dialog Submit (calendar trong trang quản lí xe)
interface IOpenDialogSubmit {
    openDialogSubmit: boolean;
    typeDialogSubmit: string;
    typeCar: string;
    dataItem: any;
    setOpenDialogSubmit: (key: any) => void;
    setTypeDialogSubmit: (type: string) => void;
    setTypeCar: (typeCar: string) => void;
    setDataItem: (dataItem: string) => void;
}

export const useDialogSubmit = create<IOpenDialogSubmit>((set) => ({
    openDialogSubmit: false,
    typeDialogSubmit: "",
    typeCar: "",
    dataItem: undefined,
    setOpenDialogSubmit: (key: any) => set((state) => ({ openDialogSubmit: key })),
    setTypeDialogSubmit: (typeDialogSubmit: string) => set((state) => ({ typeDialogSubmit: typeDialogSubmit })),
    setTypeCar: (typeCar: string) => set((state) => ({ typeCar: typeCar })),
    setDataItem: (dataItem: any) => set((state) => ({ dataItem: dataItem })),
}));

// dialog review car (Chủ xe || Khách thuê xe)
interface IOpenDialogReviewCar {
    openDialogReviewCar: boolean;
    isLoadingDialogReviewCar: boolean;
    typeDialogReviewCar: string;
    listContentReview?: any[];
    setOpenDialogReviewCar: (key: boolean) => void;
    setIsLoadingDialogReviewCar: (key: boolean) => void;
    setTypeDialogReviewCar: (typeDialogReviewCar: string) => void;
    setListContentReview: (listContentReview: string) => void;
}

export const useDialogReviewCar = create<IOpenDialogReviewCar>((set) => ({
    openDialogReviewCar: false,
    isLoadingDialogReviewCar: false,
    typeDialogReviewCar: "",
    listContentReview: [],
    setOpenDialogReviewCar: (key: boolean) => set((state) => ({ openDialogReviewCar: key })),
    setIsLoadingDialogReviewCar: (key: boolean) => set((state) => ({ isLoadingDialogReviewCar: key })),
    setTypeDialogReviewCar: (typeDialogReviewCar: string) => set((state) => ({ typeDialogReviewCar: typeDialogReviewCar })),
    setListContentReview: (listContentReview: any) => set((state) => ({ listContentReview: listContentReview })),
}));

// modal thanh toán (y/c rút tiền,...)
interface IOpenDialogPayment {
    openDialogPayment: boolean;
    typeDialogPayment: string;
    typeModal: string;
    setOpenDialogPayment: (key: any) => void;
    setTypeDialogPayment: (type: string) => void;
    setTypeModal: (typeModal: string) => void;
}

export const useDialogPayment = create<IOpenDialogPayment>((set) => ({
    openDialogPayment: false,
    typeDialogPayment: "",
    typeModal: "",
    setOpenDialogPayment: (key: any) => set((state) => ({ openDialogPayment: key })),
    setTypeDialogPayment: (typeDialogPayment: string) => set((state) => ({ typeDialogPayment: typeDialogPayment })),
    setTypeModal: (typeModal: string) => set((state) => ({ typeModal: typeModal })),
}));