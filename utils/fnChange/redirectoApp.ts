import { toastCore } from "@/lib/toast";
declare global {
    interface Window {
        MSStream?: unknown;
    }
}
export const redirectToApp = (): void => {
    const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera;

    // URLs cho deep link và store
    const appDeepLink: string = "kanow://home"; // Deep link để mở ứng dụng nếu đã cài đặt
    const googlePlayURL: string = "https://play.google.com/store/apps/details?id=com.kanow";
    const appStoreURL: string = "https://apps.apple.com/us/app/kanow-thu%C3%AA-xe-t%E1%BB%B1-l%C3%A1i/id6503139402";

    // Hàm kiểm tra và điều hướng
    const openAppOrStore = (deepLink: string, storeURL: string): void => {
        // // Thử mở ứng dụng bằng deep link
        // const timeout = setTimeout(() => {
        //     // Nếu không mở được ứng dụng, chuyển đến store
        //     window.location.href = storeURL;
        // }, 1500); // Thời gian chờ trước khi chuyển hướng

        // Thử mở deep link
        window.location.href = storeURL;

        // Xóa timeout nếu mở ứng dụng thành công
        // window.addEventListener("blur", () => clearTimeout(timeout));
    };

    // Kiểm tra loại thiết bị
    if (/android/i.test(userAgent)) {
        // Android: Thử mở ứng dụng, nếu không thì chuyển đến Google Play
        openAppOrStore(appDeepLink, googlePlayURL);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        // iOS: Thử mở ứng dụng, nếu không thì chuyển đến App Store
        openAppOrStore(appDeepLink, appStoreURL);
    } else {
        // Máy tính: Mặc định mở Google Play trên tab mới
        window.open(googlePlayURL, "_blank");
    }
};
