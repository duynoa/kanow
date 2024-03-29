import { IInfoPromotion } from "@/types/Cars/IPromotions";
import { addDays, setHours, setMinutes } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

// dialog login
interface IOpenDialogLogin {
    openDialogLogin: boolean;
    setOpenDialogLogin: (key: any) => void;
}

export const useDialogLogin = create<IOpenDialogLogin>((set) => ({
    openDialogLogin: false,
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
}

const defaultDateRange: DateRange = {
    from: setMinutes(setHours(new Date(), 21), 0),
    to: setMinutes(setHours(addDays(new Date(), 7), 20), 0),
};

export const useDialogCalendar = create<IOpenDialogCalendar>((set) => ({
    openDialogCalendar: false,
    date: defaultDateRange,
    setOpenDialogCalendar: (key: any) => set((state) => ({ ...state, openDialogCalendar: key })),
    setDate: (date: DateRange | undefined) => set((state) => ({ ...state, date })),
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