type Rating = {
    id: any;
    avatar: string;
    name: string;
    date: any;
    content: string;
    star: number;
};
export interface StatePageAccount {
    editInfo: boolean;
    editPapers: boolean;
    dataStarRatings: Rating[];
    totalStar: number;
    totalReview: number;
    page: number;
    limit: number;
}
