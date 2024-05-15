import { IInfoPromotion } from "@/types/Cars/IPromotions";
import { IInitialStateDetailCar, IInitialStateNotification } from "@/types/Initial/IInitial";
import { INotification } from "@/types/Notification/INotification";
import { addDays, setHours, setMinutes } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

// dialog notification
interface IOpenNotification {
    openDropdownNotification: boolean;
    openDialogNotification: boolean;
    isStateNotification: IInitialStateNotification;
    setOpenDropdownNotification: (key: boolean) => void;
    setOpenDialogNotification: (key: boolean) => void;
    queryKeyIsStateNotification: (key: any) => void;
}

export const useNotification = create<IOpenNotification>((set) => ({
    isStateNotification: {
        dataListNotifications: [],
        dataItemNotification: undefined,
        isLoading: {
            isLoadingNotification: false,
            isLoadingScroll: false,
        },
        dataNotify: undefined,
        page: 1,
        next: null,
        limit: 15,
    },
    openDropdownNotification: false,
    openDialogNotification: false,
    queryKeyIsStateNotification: (key: any) => set((state) => ({
        ...state,
        isStateNotification: {
            ...state.isStateNotification,
            ...key,
        },
    })),
    setOpenDropdownNotification: (key: boolean) => set((state) => ({ ...state, openDropdownNotification: key })),
    setOpenDialogNotification: (key: boolean) => set((state) => ({ ...state, openDialogNotification: key })),
}));

