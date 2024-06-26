import { create } from "zustand";

interface GeneralKey {
    generalKey: {
        onesignal_id: string,
        onesignal_key: string,
        google_api_key: string,
        hour_min_car: string,
        pusher: string,
        cluster: string,
        rule_delete_account: string,
        hour_start_car: string,
        hour_end_car: string,
        email_recruitment: string,
        hour_wait_status: string,
        check_option: string,
        token_key: string,
    };
    setGeneralKey: (key: any) => void;
}

export const useGeneralKey = create<GeneralKey>((set) => ({
    generalKey: {
        onesignal_id: '',
        onesignal_key: '',
        google_api_key: '',
        hour_min_car: '',
        pusher: '',
        cluster: '',
        rule_delete_account: '',
        hour_start_car: '',
        hour_end_car: '',
        email_recruitment: "",
        hour_wait_status: '',
        check_option: '',
        token_key: '',
    },
    setGeneralKey: (key: any) => set((state) => ({ generalKey: key })),
}));
