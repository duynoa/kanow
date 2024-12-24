import { IOpenDialogCustom } from "@/types/dialog/IDialog";
import { create } from "zustand";

export const useDialogStore = create<IOpenDialogCustom>((set) => ({
    openDialogCustom: false,
    statusDialog: "",
    setStatusDialog: (type: string) => set((state) => ({ statusDialog: type })),
    setOpenDialogCustom: (key: boolean) => set((state) => ({ openDialogCustom: key })),
}));