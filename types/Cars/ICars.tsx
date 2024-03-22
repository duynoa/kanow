export interface IListCardCars {
    id: string,
    image: string,
    favorite: boolean,
    type: {
        orderFastCar: boolean,
        mortgageFree: boolean,
        automaticNumber: boolean,
        doorstepDelivery: boolean,
    },
    avatar: string,
    title: string,
    address: string,
    promotion: string,
    priceBeforePromotion: number,
    priceAfterPromotion: number,
    point: number,
    quantityTrips: number
}

export interface ITypesCar {
    id: number,
    image: string,
    name: string,
    total_car: number
}
export interface IAutomaker {
    id: number,
    image: string,
    name: string,
    total_car: number
}

export interface IInitialStateSearchCar {
    listCardCars: IListCardCars[],
    page: number,
    isLoadingScroll: boolean,
    next: any,
    filter: {
        listTypesCar: ITypesCar[],
        listAutomaker: IAutomaker[],
    },
    dataParams: {
        company_car_search: string,
        type_car_search: number[],
        tram_search: number,
        discount_search: number,
        transmission_search: string,
        book_car_flash: number,
        delivery_car: number,
        mortgage: number,
        star_search: number,
    },
    onSuccess: {
        onSuccessPage: boolean
    },
    limit: {
        limitFilterCars: number,
        limitAllCars: number,
    }
}