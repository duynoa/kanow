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
    propose_fee: number;
    range: number;
    unit:string
}
export interface ISTateSurcharge {
    // limitedKilometers?: {
    //     maximumKilometers: number;
    //     overLimitFee: number;
    // };
    isLoading?: boolean;
    arraySurcharge?: ArraySurcharge[];
}
