import { create } from "zustand";

interface InitialStateStore {
    isStateSelfCalendar: {
        selectedMultiDates: any[];
    };
    queryKeyIsStateSelfCalendar: (key: any) => void;
}

export const useStateSelfCalendar = create<InitialStateStore>((set) => ({
    isStateSelfCalendar: {
        selectedMultiDates: []
    },
    queryKeyIsStateSelfCalendar: (key: any) =>
        set((state) => ({
            ...state,
            isStateSelfCalendar: {
                ...state.isStateSelfCalendar,
                ...key,
            },
        })),
}));
