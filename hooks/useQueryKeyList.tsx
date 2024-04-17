import { IInitialStateListCarAutonomous } from '@/types/Initial/IInitial';
import { create } from 'zustand';

// data Payment method mode
interface IState {
    isState: IInitialStateListCarAutonomous;
    queryKeyIsState: (key: any) => void;
}

export const useListCar = create<IState>((set) => ({
    isState: {
        listCardCars: [],
        isLoadingScroll: false,
        page: 1,
        next: null,
        filter: {
            listTypesCar: [],
            listAutomaker: []
        },
        dataParams: {
            company_car_search: "0",
            transmission_search: "0",
            type_car_search: [],
            tram_search: 0,
            discount_search: 0,
            book_car_flash: 0,
            delivery_car: 0,
            mortgage: 0,
            star_search: 0,
        },
        onSuccess: {
            onSuccessPage: false
        },
        limit: {
            limitFilterCars: 50,
            limitAllCars: 8,
        }
    },
    queryKeyIsState: (key: any) => set((state) => ({
        ...state,
        isState: {
            ...state.isState,
            ...key,
        },
    })),
}));
