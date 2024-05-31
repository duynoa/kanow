type IRating = {
    id: any;
    avatar: string;
    name: string;
    date: any;
    content: string;
    star: number;
};
interface IStatePageAccount {
    editInfo: boolean;
    editPapers: boolean;
    dataStarRatings: IRating[];
    totalStar: number;
    totalReview: number;
    page: number;
    limit: number;
    type: string;
    tabRatings: string;
    nextPage: string;
    loadingData: boolean;
    loadingButton:boolean;
}

interface IInfomationUser {
    id: number;
    fullname: string;
    phone: string;
    email: string;
    prefix_phone: any;
    sign_up_with: any;
    address: string;
    birthday: string;
    gender: number; // khi nào làm convert lại thành true/false phía front-end
    created_at: string;
    point: number;
    password: boolean;
    avatar: string;
    total_trip: number;
    total_review: number;
    star_avg: any;
    drivingLiscense: any;
    review: any;
}
export type { IStatePageAccount, IInfomationUser };
