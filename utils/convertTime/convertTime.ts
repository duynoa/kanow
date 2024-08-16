// Hàm chuyển đổi giờ phút thành số phút
export function timeToMinutes(time: string) {
    if (!time) return undefined; // Kiểm tra giá trị undefined
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

// So sánh hai giờ
export function compareTimes(time1: string, time2: string) {
    const minutes1 = timeToMinutes(time1) as any;
    const minutes2 = timeToMinutes(time2) as any;

    if (minutes1 < minutes2) {
        return -1; // time1 nhỏ hơn time2
    } else if (minutes1 > minutes2) {
        return 1; // time1 lớn hơn time2
    } else {
        return 0; // time1 bằng time2
    }
}
