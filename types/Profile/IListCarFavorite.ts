export interface IListCarFavorite {
    dataDrivingCar: any[];
    dataTalentedCar: any[];
    limit: number;
    tab: string;
    isLoadingScroll: boolean;
    totalDrivingCar: number;
    isLoadingCar: boolean;
    totalTalentedCar: number;
    pageDrivingCar: number;
    pageTalentedCar: number;
    nextDrivingCar: string;
    nextTalentedCar: string;
}
