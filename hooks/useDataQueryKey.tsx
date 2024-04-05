import {
    IInitialStateInfoRentalCar,
    IInitialStatePolicy
} from '@/types/Initial/IInitial';
import { create } from 'zustand';

interface IStateRentalCar {
    isStateInfoRentalCar: IInitialStateInfoRentalCar;
    queryKeyIsStateInfoRentalCar: (key: any) => void;
}

export const useDataInfoRentalCar = create<IStateRentalCar>((set) => ({
    isStateInfoRentalCar: {
        detailRentalCar: undefined,
        dataPolicy: undefined
    },
    queryKeyIsStateInfoRentalCar: (key: any) => set((state) => ({
        ...state,
        isStateInfoRentalCar: {
            ...state.isStateInfoRentalCar,
            ...key,
        },
    })),
}));

interface IStatePolicy {
    isStatePolicy: IInitialStatePolicy;
    queryKeyIsStatePolicy: (key: any) => void;
}

export const useDataPolicy = create<IStatePolicy>((set) => ({
    isStatePolicy: {
        dataPolicy: undefined
    },
    queryKeyIsStatePolicy: (key: any) => set((state) => ({
        ...state,
        isStatePolicy: {
            ...state.isStatePolicy,
            ...key,
        },
    })),
}));
