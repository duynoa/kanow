export type TItemGeneralTrip = {
    id: string;
    starTime: Date;
    endTime: Date;
    total: number;
    status: {
        id: number;
        name: string;
        color: string;
    };
    user: {
        name: string;
        avatar: string;
    };
    time: Date;
};
export interface IStateGeneralTrip {
    isLoadingCar?: boolean;
    dataTrips?: TItemGeneralTrip[]; // Dữ liệu các chuyến đi
    page?: number; // Trang hiện tại
    limit?: number; // Giới hạn số lượng phần tử trên mỗi trang
    next?: string; // Chỉ mục của trang tiếp theo
    status_search?: number; // Trạng thái tìm kiếm
    isLoadingScroll?: boolean; // Đang tải dữ liệu khi cuộn
}
