import { IDataPromotion } from "@/types/IPromotion";
import { addDays, setHours, setMinutes } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

// dialog promotion
interface IOpenDialogPromotion {
    openDialogPromotion: boolean;
    setOpenDialogPromotion: (key: any) => void;
    dataPromotion: IDataPromotion[];
    setDataPromotion: (dataPromotion: any) => void
}

export const useDialogPromotion = create<IOpenDialogPromotion>((set) => ({
    openDialogPromotion: false,
    dataPromotion: [],
    setOpenDialogPromotion: (key: any) => set((state) => ({ openDialogPromotion: key })),
    setDataPromotion: (key: any) => set((state) => ({ dataPromotion: key })),
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

// dialog type cars
interface IOpenDialogFilterListCars {
    openDialogFilterListCars: boolean;
    setOpenDialogFilterListCars: (key: any, type?: string) => void;
    type?: string;
    dataFilterListCars: any[];
    setDataFilterListCars: (dataFilterListCars: any) => void
}

export const useDialogFilterListCars = create<IOpenDialogFilterListCars>((set) => ({
    openDialogFilterListCars: false,
    type: "",
    dataFilterListCars: [],
    setOpenDialogFilterListCars: (key: any, type?: string) => set((state) => ({ openDialogFilterListCars: key, type: type })),
    setDataFilterListCars: (key: any) => set((state) => ({ dataFilterListCars: key })),
}));