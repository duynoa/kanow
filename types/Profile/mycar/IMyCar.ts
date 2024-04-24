// danh sách step
export interface ISteps {
    name: string;
    value: string;
}

export interface IVehicleRegistration {
    step: string;
    typePage: number;
}

export interface TComboboxApi {
    value: string | number;
    label: string;
}

interface ICommonType {
    openCombobox: boolean;
    typeOpenCombobox: string;
}

export interface IStateInfomation extends ICommonType {
    loadFeature: boolean;
    dataCarCompany: TComboboxApi[];
    dataCarModel: TComboboxApi[];
    dataSeats: TComboboxApi[];
    dataYearOfManufacture: TComboboxApi[];
    dataMove: TComboboxApi[];
    dataFeuelType: TComboboxApi[];
    dataFeature: TComboboxApi[];
    dataSampleCar: TComboboxApi[];
}

export interface IStateLease extends ICommonType {
    dataCity: any[];
    dataDistrict: any[];
    dataWards: any[];
    dataWordLimit: any[];
    dataUntil: any[];
    vehicleHanding: {
        intersectionSquare: number;
        deliveryFee: number;
        freeDelivery: number;
    };
    discount: number;
    limitedKilometers: {
        maximumKilometers: number;
        overLimitFee: number;
    };
    bookCarQuickly: {
        wordLimit: TComboboxApi[];
        until: TComboboxApi[];
    };
}
