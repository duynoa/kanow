interface ObjFeature {
    id: number | string;
    name: string;
    image: string;
}
interface IState {
    loadFeature?: boolean;
    dataFeature?: ObjFeature[];
    typeOpenCombobox?: string;
    openCombobox?: boolean;
    dataCity?: any;
    dataDistrict?: any;
    dataWards?: any;
}
export interface IStateVehicleInfomation extends IState {}
