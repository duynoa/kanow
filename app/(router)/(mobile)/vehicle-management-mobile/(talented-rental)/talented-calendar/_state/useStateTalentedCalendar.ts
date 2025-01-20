import { create } from "zustand";

interface InitialStateStore {
    isStateTalentedCalendar: {
        selectedMultiDates: any[];
    };
    queryKeyIsStateTalentedCalendar: (key: any) => void;
}

export const useStateTalentedCalendar = create<InitialStateStore>((set) => ({
    isStateTalentedCalendar: {
        selectedMultiDates: []
    },
    queryKeyIsStateTalentedCalendar: (key: any) =>
        set((state) => ({
            ...state,
            isStateTalentedCalendar: {
                ...state.isStateTalentedCalendar,
                ...key,
            },
        })),
}));
