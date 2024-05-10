import { IInfoPromotion } from "@/types/Cars/IPromotions";
import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { INotification } from "@/types/Notification/INotification";
import { addDays, setHours, setMinutes } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

// dialog notification
interface IOpenNotification {
    openDropdownNotification: boolean;
    openDialogNotification: boolean;
    isLoadingNotification: boolean,
    dataItemNotification?: INotification;
    dataListNotifications: INotification[];
    setIsLoadingNotification: (key: boolean) => void;
    setOpenDropdownNotification: (key: boolean) => void;
    setOpenDialogNotification: (key: boolean) => void;
    setDataItemNotification: (key: INotification) => void;
    setDataListNotifications: (key: INotification[]) => void;
}

export const useNotification = create<IOpenNotification>((set) => ({
    openDropdownNotification: false,
    openDialogNotification: false,
    dataItemNotification: undefined,
    dataListNotifications: [],
    isLoadingNotification: false,
    setIsLoadingNotification: (key: boolean) => set((state) => ({ isLoadingNotification: key })),
    setOpenDropdownNotification: (key: boolean) => set((state) => ({ ...state, openDropdownNotification: key })),
    setOpenDialogNotification: (key: boolean) => set((state) => ({ ...state, openDialogNotification: key })),
    setDataItemNotification: (key: INotification) => set((state) => ({ ...state, dataItemNotification: key })),
    setDataListNotifications: (key: INotification[]) => set((state) => ({ ...state, dataListNotifications: key })),
}));

