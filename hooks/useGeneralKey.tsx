import { create } from "zustand";

interface GeneralKey {
    generalKey: {
        google_api_key: string;
        onesignal_id: string;
        onesignal_key: string;
        pusher: string;
        hour_min_car: string;
        cluster: string;
        rule_delete_account: string;
    };
    setGeneralKey: (key: any) => void;
}

export const useGeneralKey = create<GeneralKey>((set) => ({
    generalKey: {
        google_api_key: '',
        onesignal_id: '',
        hour_min_car: '',
        onesignal_key: '',
        pusher: '',
        cluster: '',
        rule_delete_account: '',
    },
    setGeneralKey: (key: any) => set((state) => ({ generalKey: key })),
}));
