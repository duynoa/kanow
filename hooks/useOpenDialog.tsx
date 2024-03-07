import { IDataPromotion } from "@/types/IPromotion";
import { addDays } from "date-fns";
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
    from: new Date(),
    to: addDays(new Date(), 20),
};

export const useDialogCalendar = create<IOpenDialogCalendar>((set) => ({
    openDialogCalendar: false,
    date: defaultDateRange,
    setOpenDialogCalendar: (key: any) => set((state) => ({ ...state, openDialogCalendar: key })),
    setDate: (date: DateRange | undefined) => set((state) => ({ ...state, date })),
}))
