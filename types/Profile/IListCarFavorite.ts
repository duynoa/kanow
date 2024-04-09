export interface IListCarFavorite {
    dataDrivingCar: any[];
    datalentedCar: any[];
    page: number;
    next: any;
    limit: number;
    favourite: string;
    isLoadingScroll: boolean;
    totalDrivingCar: number;
    isLoadingCar: boolean;
}
