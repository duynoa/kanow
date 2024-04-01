import { create } from "zustand";


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