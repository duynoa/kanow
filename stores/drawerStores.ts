import { IDrawerStore } from "@/types/drawer/IDrawer";
import { create } from "zustand";

export const useDrawerStore = create<IDrawerStore>((set) => ({
    openDrawer: false,
    statusDrawer: "",
    setOpenDrawer: (openDrawer: boolean, statusDrawer?: string) => set((state) => ({ openDrawer, statusDrawer })),
    objectData: null,
    setObjectData: (objectData: any) => set((state) => ({ objectData })),
}));
