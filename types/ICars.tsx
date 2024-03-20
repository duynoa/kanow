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