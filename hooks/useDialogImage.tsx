import { create } from "zustand";

interface Open {
    openDialogReview: boolean;
    setOpenDialogReview: (key: any) => void;
    dataImage: [];
    setDataImage: (key: any) => void;
    indexImage: any;
    setIndexImage: (indexImage: any) => void;
}
export const useDialogImage = create<Open>((set) => ({
    openDialogReview: false,
    dataImage: [],
    indexImage: "",
    setOpenDialogReview: (key: any) => set((state) => ({ openDialogReview: key })),
    setDataImage: (key: any) => set((state) => ({ dataImage: key })),
    setIndexImage: (indexImage: any) => set((state) => ({ indexImage: indexImage })),
}));
