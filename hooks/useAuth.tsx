import { create } from "zustand";

interface Auth {
    informationUser: any;
    setInformationUser: (key: any) => void;
}

export const useAuth = create<Auth>((set) => ({
    informationUser: "",
    setInformationUser: (key: any) => set((state) => ({ informationUser: key })),
}));
