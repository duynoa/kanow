import { IInitialStateLoadSuccess, IInitialStatePolicy } from "@/types/Initial/IInitial";
import { create } from "zustand";

// hàm sự kiện kiểm soát loading, success fetch api,...
interface IStateLoadSuccess {
    isStateLoadSuccess: IInitialStateLoadSuccess;
    queryKeyIsStateLoadSuccess: (key: any) => void;
}

export const useLoadSuccess = create<IStateLoadSuccess>((set) => ({
    isStateLoadSuccess: {
        loading: {
            isSuccessFetchApi: false,
            isLoadingButton:false,
        },
        success: undefined,
    },
    queryKeyIsStateLoadSuccess: (key: any) => set((state) => ({
        ...state,
        isStateLoadSuccess: {
            ...state.isStateLoadSuccess,
            ...key,
        },
    })),
}));