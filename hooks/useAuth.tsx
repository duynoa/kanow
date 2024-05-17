import { IInfomationUser } from "@/types/Profile/IAccount";
import { create } from "zustand";

interface Auth {
    informationUser?: any | IInfomationUser;
    setInformationUser: (key: any | IInfomationUser) => void;
}

export const useAuth = create<Auth>((set) => ({
    informationUser: undefined,
    setInformationUser: (key: any) => set((state) => ({ informationUser: key })),
}));
