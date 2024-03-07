import { create } from "zustand";

interface IDataPromotion {
    id: string,
    discountMax: number,
    discountPercent: number,
    code: string,
    title: string,
    expireTime: number,
    expireTimeDescription: string,
}

interface IOpenDialog {
    openDialogPromotion: boolean;
    setOpenDialogPromotion: (key: any) => void;
    dataPromotion: IDataPromotion[];
    setDataPromotion: (dataPromotion: any) => void
}


export const useDialogPromotion = create<IOpenDialog>((set) => ({
    openDialogPromotion: false,
    dataPromotion: [],
    setOpenDialogPromotion: (key: any) => set((state) => ({ openDialogPromotion: key })),
    setDataPromotion: (key: any) => set((state) => ({ dataPromotion: key })),
}));
