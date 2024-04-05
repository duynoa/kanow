import { create } from "zustand";

interface GoogleKey {
    googleKey: {
        google_api_key: string;
        onesignal_id: string
        onesignal_key: string
    };
    setGoogleKey: (key: any) => void;
}

export const useGoogleKey = create<GoogleKey>((set) => ({
    googleKey: {
        google_api_key: '',
        onesignal_id: '',
        onesignal_key: ''
    },
    setGoogleKey: (key: any) => set((state) => ({ googleKey: key })),
}));
