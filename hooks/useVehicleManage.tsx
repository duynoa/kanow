import { create } from "zustand";

interface Vehicle {
    dataDetail: any;
    dataOther: any;
    setDataOther: (key: any) => void;
    idCar: string;
    setDataDetail: (key: any) => void;
    setIdCar: (key: string) => void;
}

export const useVehicleManage = create<Vehicle>((set) => ({
    dataDetail: {},
    idCar: "",
    dataOther: {},
    setDataOther: (key: any) => set((state) => ({ dataOther: key })),
    setIdCar: (key: string) => set((state) => ({ idCar: key })),
    setDataDetail: (key: any) => set((state) => ({ dataDetail: key })),
}));
