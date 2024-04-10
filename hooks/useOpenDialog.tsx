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
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    openDialogCalendar: boolean;
    setOpenDialogCalendar: (key: any) => void
    numberDay: number | null
    setNumberDay: (numberDay: number | null) => void;
}

const defaultDateRange: DateRange = {
    from: setMinutes(setHours(new Date(), 21), 0),
    to: setMinutes(setHours(addDays(new Date(), 1), 20), 0),
};

export const useDialogCalendar = create<IOpenDialogCalendar>((set) => ({
    openDialogCalendar: false,
    date: defaultDateRange,
    numberDay: null,
    setOpenDialogCalendar: (key: any) => set((state) => ({ ...state, openDialogCalendar: key })),
    setDate: (date: DateRange | undefined) => set((state) => ({ ...state, date })),
    setNumberDay: (numberDay: number | null) => set((state) => ({ numberDay: numberDay })),
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