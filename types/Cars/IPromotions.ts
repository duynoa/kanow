interface IInfoPromotion {
  id: number;
  promotion_id?: number;
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

interface IInfoViettelPayPromotion {
  id: number;
  promotion_id: number;
  code: string;
  status: number;
  promotion: {
    id: number;
    cash: number;
    name: string;
    detail: string;
    note: string;
    date_start: string;
    date_end: string;
    indefinite: number;
  };
}

export type { IInfoPromotion, IInfoViettelPayPromotion };
