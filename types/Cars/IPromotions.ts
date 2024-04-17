interface IInfoPromotion {
    id: number;
    code: string;
    name: string;
    type: number;
    cash: number;
    date_end: string;
    date_start: string;
    detail: string;
    image: string;
    indefinite: number;
    money_max: number;
    note: string;
    percent: number;
    type_car: number;
    number_day: number;
}

export type { IInfoPromotion };
