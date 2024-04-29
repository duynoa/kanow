export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export interface IMortgage {
    id: string;
    value: string;
    label: string;
}

export interface ICarRentalDocuments extends IMortgage {
    icon: string;
}
