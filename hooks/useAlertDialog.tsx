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


//aler delete
interface IOpenAlert {
    openAlert: boolean;
    type?: string;
    value?: any;
    onFinally?: boolean;
    setOnFinally: (key: any) => void;
    setOpenAlert: (key: any, type?: string, value?: any) => void;
}

export const useAlert = create<IOpenAlert>((set) => ({
    openAlert: false,
    type: "",
    value: '',
    onFinally: false,
    setOnFinally: (key: any) => set((state) => ({ onFinally: key })),
    setOpenAlert: (key: any, type?: string, value?: any) => set((state) => ({ openAlert: key, type: type, value: value })),
}));
