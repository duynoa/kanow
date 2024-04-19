export interface IMyCar {
    dataMyCar: any[];
    page: number;
    next: any;
    limit: number;
    isLoadingScroll: boolean;
    isLoadingCar: boolean;
    tab: number | string;
}

export interface ISteps {
    name: string;
    value: string;
}

export interface IDataCombobox {
    id: string | number;
    name: string;
}

export interface IDataFeature {
    id: string | number;
    name: string;
    image: string;
}

export interface IVehicleRegistration {
    step: string;
    stateInformation: {
        openCarCompany: boolean;
        openCarModel: boolean;
        openSeats: boolean;
        openYearOfManufacture: boolean;
        openMove: boolean;
        openFeuelType: boolean;
        dataCarCompany: IDataCombobox[];
        dataCarModel: IDataCombobox[];
        dataSeats: IDataCombobox[];
        dataYearOfManufacture: IDataCombobox[];
        dataMove: IDataCombobox[];
        dataFeuelType: IDataCombobox[];
        dataFeature: IDataFeature[];
    };
}
