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
    setOpenDialogPromotion: (key: any) => void;
    dataPromotions: IInfoPromotion[];
    setDataPromotions: (dataPromotions: IInfoPromotion[]) => void
}

export const useDialogPromotion = create<IOpenDialogPromotion>((set) => ({
    openDialogPromotion: false,
    dataPromotions: [],
    setOpenDialogPromotion: (key: boolean) => set((state) => ({ openDialogPromotion: key })),
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
    setDateReal: (dateReal: DateRange | undefined) => void;
    setDateTemp: (dateTemp: DateRange | undefined) => void;
    setDateStart: (dateStart: Date | undefined) => void;
    setDateEnd: (dateEnd: Date | undefined) => void;
    setOpenDialogCalendar: (key: any, type?: string) => void
    setNumberDay: (numberDay: number) => void;
}

const defaultDateRange: DateRange = {
    from: setMinutes(setHours(new Date(), 21), 0),
    to: setMinutes(setHours(addDays(new Date(), 1), 20), 0),
};

export const useDialogCalendar = create<IOpenDialogCalendar>((set) => ({
    openDialogCalendar: false,
    dateReal: defaultDateRange,
    dateTemp: undefined,
    dateStart: defaultDateRange.from,
    dateEnd: defaultDateRange.to,
    numberDay: 1,
    type: "",
    setOpenDialogCalendar: (key: any, type?: string) => set((state) => ({ ...state, openDialogCalendar: key, type: type })),
    setDateReal: (dateReal: DateRange | undefined) => set((state) => ({ ...state, dateReal })),
    setDateTemp: (dateTemp: DateRange | undefined) => set((state) => ({ ...state, dateTemp })),
    setDateStart: (dateStart: Date | undefined) => set((state) => ({ ...state, dateStart: dateStart })),
    setDateEnd: (dateEnd: Date | undefined) => set((state) => ({ ...state, dateEnd: dateEnd })),
    setNumberDay: (numberDay: number) => set((state) => ({ ...state, numberDay: numberDay })),
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
    openDialogCancelCar: boolean;
    setOpenDialogCancelCar: (key: any, type?: string) => void;
    type?: string;
    dataListReasonsCancel: any[];
    setDataListReasonsCancel: (dataListReasonsCancel: any[]) => void;
    dataInfo?: any
    setDataInfo: (dataInfo?: any) => void;
}

export const useDialogCancelCar = create<IOpenDialogCancelCar>((set) => ({
    openDialogCancelCar: false,
    setOpenDialogCancelCar: (key: any, type?: string) => set((state) => ({ openDialogCancelCar: key, type: type })),
    type: "",
    dataListReasonsCancel: [],
    setDataListReasonsCancel: (key: any[]) => set((state) => ({ dataListReasonsCancel: key })),
    dataInfo: {},
    setDataInfo: (key: any) => set((state) => ({ dataInfo: key })),
}));

// dialog address
interface IOpenDialogAddress {
    openDialogAddress: boolean;
    setOpenDialogAddress: (key: any) => void;
    vehicleHanding: any;
    setVehicleHanding: (data: any) => void;
    valueAddress: any,

    setValueAddress: (value: any) => void
    latitude: Number,
    longitude: Number,
    setLatitude: (value: any) => void
    setLongitude: (value: any) => void
}


export const useDialogAddress = create<IOpenDialogAddress>((set) => ({
    openDialogAddress: false,
    setOpenDialogAddress: (key: any) => set((state) => ({ openDialogAddress: key })),
    vehicleHanding: {},
    setVehicleHanding: (data: any) => set((state) => ({ vehicleHanding: data })),
    valueAddress: "",
    setValueAddress: (value: any) => set((state) => ({ valueAddress: value })),
    latitude: 0,
    longitude: 0,
    setLatitude: (value: any) => set((state) => ({ latitude: value })),
    setLongitude: (value: any) => set((state) => ({ longitude: value })),

}));