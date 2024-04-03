interface IInitialStateInfoRentalCar {
    detailRentalCar: {
        status?: {
            statusCustom: number,
            status: number,
            color: string,
            name: string,
        },
    }
}

interface IInitialStatePayment {
    payment: {
        idActivePaymentMethod: number | string,
        indexPaymentMethod: number
    }
}

export type {
    IInitialStateInfoRentalCar,
    IInitialStatePayment
}