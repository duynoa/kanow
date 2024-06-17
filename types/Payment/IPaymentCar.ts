interface IInitialTransactionStatement {
    dataTableFinish: any[],
    totalPriceTableFinish: {
        totalRevenueCustomer: number,
        totalPriceDone: number,
    },
    dataTableCancel: any[],
    totalPriceTableCancel: {
        totalPriceDone: number,
    },
    date: {
        startDate: string,
        endDate: string,
    }
}

export type {
    IInitialTransactionStatement
}