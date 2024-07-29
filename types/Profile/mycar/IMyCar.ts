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
interface Obj {
    max: number;
    min: number;
    propose: number;
    step: number;
}

export interface IStateLease extends ICommonType {
    dataCity: any[];
    notiMortgage: string;
    dataDistrict: any[];
    dataWards: any[];
    dataWordLimit: any[];
    dataUntil: any[];
    vehicleHanding: {
        intersectionSquare: Obj;
        deliveryFee: Obj;
        freeDelivery: Obj;
    };
    discount: number;
    limitedKilometers: {
        maximumKilometers: Obj;
        overLimitFee: Obj;
    };
    bookCarQuickly: {
        wordLimit: TComboboxApi[];
        until: TComboboxApi[];
    };
    rentCostPropose: number;
}
