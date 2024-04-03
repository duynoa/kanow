import { create } from "zustand";

// alert log out
interface IOpenAlertDialogLogout {
    openAlertDialogLogout: boolean;
    type?: string;
    setOpenAlertDialogLogout: (key: any, type?: string) => void;
}

export const useAlertDialogLogout = create<IOpenAlertDialogLogout>((set) => ({
    openAlertDialogLogout: false,
    type: "",
    setOpenAlertDialogLogout: (key: any, type?: string) => set((state) => ({ openAlertDialogLogout: key, type: type })),
}));

// alert cancel
interface IOpenAlertCancel {
    openAlertCancel: boolean;
    type?: string;
    setOpenAlertCancel: (key: any, type?: string) => void;
}

export const useAlertCancel = create<IOpenAlertCancel>((set) => ({
    openAlertCancel: false,
    type: "",
    setOpenAlertCancel: (key: any, type?: string) => set((state) => ({ openAlertCancel: key, type: type })),
}));