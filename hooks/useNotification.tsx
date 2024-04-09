import { IInfoPromotion } from "@/types/Cars/IPromotions";
import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { addDays, setHours, setMinutes } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

// dialog login
interface IOpenNotification {
    openNotification: boolean;
    setOpenNotification: (key: any) => void;
    dataNotification: any[]
    setDataNotification: (key: any) => void;
}

export const useNotification = create<IOpenNotification>((set) => ({
    openNotification: false,
    dataNotification: [],
    setOpenNotification: (key: boolean) => set((state) => ({ openNotification: key })),
    setDataNotification: (key: any) => set((state) => ({ dataNotification: key })),
}));

