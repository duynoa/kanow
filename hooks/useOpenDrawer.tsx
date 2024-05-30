import { IInitialStateAllReview } from "@/types/Initial/IInitial";
import { create } from "zustand";

interface IOpenDrawerReview {
    isStateAllReview: IInitialStateAllReview;
    openDrawerReview: boolean;
    setOpenDrawerReview: (key: boolean) => void;
    queryKeyIsStateAllReview: (key: Partial<IInitialStateAllReview>) => void;
}

export const useDrawerReview = create<IOpenDrawerReview>((set) => ({
    isStateAllReview: {
        listAllReviewCar: [],
        loading: {
            isLoadingListReview: false,
            isLoadingButton: false
        },
        params: {
            page: 1,
            limit: 10,
            next: null,
            total_review:0
        }
    },
    openDrawerReview: false,
    setOpenDrawerReview: (key: boolean) => set((state) => ({ openDrawerReview: key })),
    queryKeyIsStateAllReview: (key) => set((state) => ({
        isStateAllReview: {
            ...state.isStateAllReview,
            ...key
        }
    }))
}))