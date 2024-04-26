interface ObjFeature {
    id: number | string;
    name: string;
    image: string;
}
interface IState {
    loadFeature: boolean;
    dataFeature: ObjFeature[];
}
export interface IStateVehicleInfomation extends IState {}
