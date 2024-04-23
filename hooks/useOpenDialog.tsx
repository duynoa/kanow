import { IInfoPromotion } from "@/types/Cars/IPromotions";
import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { addDays, setHours, setMinutes } from "date-fns";
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
    type: string;
    statusDate: number;
    validateDateSubmit: boolean;
    dataCalendar: any[];
    flagSubmit: boolean;
    setDateReal: (dateReal: DateRange | undefined) => void;
    setDateTemp: (dateTemp: DateRange | undefined) => void;
    setDateStart: (dateStart: Date | undefined) => void;
    setDateEnd: (dateEnd: Date | undefined) => void;
    setOpenDialogCalendar: (key: any, type?: string) => void
    setNumberDay: (numberDay: number) => void;
    setFlagSubmit: (flagSubmit: boolean) => void;
    setStatusDate: (statusDate: number) => void;
    setValidateDateSubmit: (validateDateSubmit: boolean) => void;
    setDataCalendar: (dataCalenndar: any[]) => void;
}

const defaultDateRange: DateRange = {
    from: setMinutes(setHours(new Date(), 21), 0),
    to: setMinutes(setHours(addDays(new Date(), 1), 20), 0),
};

export const useDialogCalendar = create<IOpenDialogCalendar>((set) => ({
    openDialogCalendar: false,
    dateReal: defaultDateRange,
    dateTemp: undefined,
    dateStart: undefined,
    dateEnd: undefined,
    numberDay: 1,
    flagSubmit: false,
    statusDate: 0,
    type: "",
    validateDateSubmit: false,
    dataCalendar: [],
    setOpenDialogCalendar: (key: any, type?: string) => set((state) => ({ ...state, openDialogCalendar: key, type: type })),
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
    openDialogRequestCarRental: boolean;
    type?: string;
    dataListRequestCarRental?: IInitialStateDetailCar;
    setOpenDialogRequestCarRental: (key: any, type?: string) => void;
    setDataListRequestCarRental: (dataListRequestCarRental?: IInitialStateDetailCar) => void
}

export const useDialogRequestCarRental = create<IOpenDialogRequestCarRental>((set) => ({
    openDialogRequestCarRental: false,
    type: "",
    dataListRequestCarRental: undefined,
    setOpenDialogRequestCarRental: (key: any, type?: string) => set((state) => ({ openDialogRequestCarRental: key, type: type })),
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
    isLoadingDialogCancelCar:boolean;
    setDataInfo: (dataInfo?: any) => void;
    setOpenDialogCancelCar: (key: boolean, type?: string) => void;
    setDataListReasonsCancel: (dataListReasonsCancel: any[]) => void;
    setIsLoadingDialogCancelCar: (key: boolean) => void;
}

export const useDialogCancelCar = create<IOpenDialogCancelCar>((set) => ({
    type: "",
    dataInfo: {},
    dataListReasonsCancel: [],
    openDialogCancelCar: false,
    isLoadingDialogCancelCar:false,
    setDataInfo: (key: any) => set((state) => ({ dataInfo: key })),
    setOpenDialogCancelCar: (key: boolean, type?: string) => set((state) => ({ openDialogCancelCar: key, type: type })),
    setDataListReasonsCancel: (key: any[]) => set((state) => ({ dataListReasonsCancel: key })),
    setIsLoadingDialogCancelCar: (key: boolean) => set((state) => ({ isLoadingDialogCancelCar: key })),    
}));

// dialog address
interface IOpenDialogAddress {
    openDialogAddress: boolean;
    setOpenDialogAddress: (key: any) => void;
    valueAddress: any,
    setValueAddress: (value: any) => void
    coordinates: {
        defaultLat: Number,
        defaultLng: Number,
        lat: Number,
        lng: Number,
    },
    setCoordinates: (value: any) => void
    onSubmitFilter: boolean,
    setOnSubmitFilter: (value: any) => void
}


export const useDialogAddress = create<IOpenDialogAddress>((set) => ({
    coordinates: {
        defaultLat: 0,
        defaultLng: 0,
        lat: 0,
        lng: 0,
    },
    onSubmitFilter: false,
    setOnSubmitFilter: (value: boolean) => set((state) => ({ onSubmitFilter: value })),
    setCoordinates: (value: any) => set((state) => ({
        coordinates: {
            ...state.coordinates,
            ...value
        }
    })),
    openDialogAddress: false,
    setOpenDialogAddress: (key: any) => set((state) => ({ openDialogAddress: key })),
    valueAddress: "",
    setValueAddress: (value: any) => set((state) => ({ valueAddress: value })),
}));


// Đăng ký xe cho thuê ở trang menu dropdow
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


// Dia log bộ lọc xe của tôi, chuyến của tôi
interface IOpenDialogFilterCar {
    type?: string;
    valueFilter?: any;
    dataFilter: any[];
    openDialogFilterCar: boolean;
    setValueFilter: (key: any) => void;
    setOpenDialogFilterCar: (key: any, type?: string) => void;
    setDataFilter: (key: any) => void;
}

export const useDialogFilterMyCar = create<IOpenDialogFilterCar>((set) => ({
    openDialogFilterCar: false,
    setValueFilter: (value: any) => set((state) => ({ valueFilter: value })),
    setOpenDialogFilterCar: (key: any, type?: string) => set((state) => ({ openDialogFilterCar: key, type: type })),
    dataFilter: [],
    valueFilter: '',
    setDataFilter: (key: any) => set((state) => ({ dataFilter: key })),
}))