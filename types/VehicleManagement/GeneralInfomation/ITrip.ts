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
    isLoadingCar: boolean;
    dataMyTrips: TItemGeneralTrip[]; // Dữ liệu các chuyến đi
    page: number; // Trang hiện tại
    limit: number; // Giới hạn số lượng phần tử trên mỗi trang
    favourite: string; // Chỉ mục của chuyến đi được đánh dấu là yêu thích
    next: string; // Chỉ mục của trang tiếp theo
    totalDrivingCar: number; // Tổng số xe đang lái
    status_search: number; // Trạng thái tìm kiếm
    isLoadingScroll: boolean; // Đang tải dữ liệu khi cuộn
}
