interface ArraySurcharge {
    open: boolean;
    value: number;
    name: string;
    note: string;
    max: number;
    min: number;
    id: number;
    type: number;
    updated_at: string;
    created_at: string;
    check_fee: number;
}
export interface ISTateSurcharge {
    limitedKilometers?: {
        maximumKilometers: number;
        overLimitFee: number;
    };
    isLoading?: boolean;
    arraySurcharge?: ArraySurcharge[];
}
