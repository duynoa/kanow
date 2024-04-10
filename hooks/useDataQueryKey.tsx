import {
    IInitialStateInfoRentalCar,
    IInitialStatePayment,
    IInitialStatePolicy
} from '@/types/Initial/IInitial';
import { addDays, setHours, setMinutes } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

// data request rental Car
interface IStateRentalCar {
    isStateInfoRentalCar: IInitialStateInfoRentalCar;
    queryKeyIsStateInfoRentalCar: (key: any) => void;
}

export const useDataInfoRentalCar = create<IStateRentalCar>((set) => ({
    isStateInfoRentalCar: {
        detailRentalCar: undefined,
    },
    queryKeyIsStateInfoRentalCar: (key: any) => set((state) => ({
        ...state,
        isStateInfoRentalCar: {
            ...state.isStateInfoRentalCar,
            ...key,
        },
    })),
}));

// data policy (?)
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

// data date calender (chưa sử dụng)
const defaultDateRange: DateRange = {
    from: setMinutes(setHours(new Date(), 21), 0),
    to: setMinutes(setHours(addDays(new Date(), 1), 20), 0),
};

interface IStateDate {
    isStateDate: {
        dateReal: DateRange | undefined
    },
    queryKeyIsStateDate: (key: any) => void
}

export const useDataDate = create<IStateDate>((set) => ({
    isStateDate: {
        dateReal: defaultDateRange
    },
    queryKeyIsStateDate: (key: any) => set((state) => ({
        ...state,
        isStateDate: {
            ...state.isStateDate,
            ...key,
        },
    })),
}))

// data Payment method mode
interface IStatePaymentRental {
    isStatePaymentRental: IInitialStatePayment;
    queryKeyIsStatePaymentRental: (key: any) => void;
}

export const useDataPaymentRental = create<IStatePaymentRental>((set) => ({
    isStatePaymentRental: {
        listPaymentMode: [],
        payment: {
            idActivePaymentMethod: 0,
            indexPaymentMethod: 0
        }
    },
    queryKeyIsStatePaymentRental: (key: any) => set((state) => ({
        ...state,
        isStatePaymentRental: {
            ...state.isStatePaymentRental,
            ...key,
        },
    })),
}));
