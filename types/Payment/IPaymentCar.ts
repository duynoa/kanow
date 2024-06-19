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
    dataTableRequestWithdrawMoney: any[],
    totalPriceTableRequestWithdrawMoney: {
        totalPriceDone: number,
    },
    amountPrice: {
        opening_balance: number,
        ending_balance: number,
        balance_period: number,
    }
    date: {
        startDate: string,
        endDate: string,
    }
}

export type {
    IInitialTransactionStatement
}