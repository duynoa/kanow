import Cookies from "js-cookie";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;

    const token: any = request.cookies.get("token_kanow");
    const checkUrl = ["/account", "/list-car-favorite", "/change-password", "/list-address"];
    const coordinatesLocalStorage = Cookies.get("coordinates");

    if (
        pathname.startsWith("/account") ||
        pathname.startsWith("/list-car-favorite") ||
        pathname.startsWith("/info-rental-car") ||
        pathname.startsWith("/change-password") ||
        pathname.startsWith("/list-address") ||
        pathname.startsWith("/my-trips") ||
        pathname.startsWith("/delete-account") ||
        pathname.startsWith("/list-my-car") ||
        pathname.startsWith("/vehicle-management") ||
        pathname.startsWith("/vehicle-management-mobile")
    ) {
        if (!token || token?.value == "kanow") {
            // check ở mobi nhúng link
            if (pathname.startsWith("/vehicle-management-mobile")) {
                return NextResponse.next();
            }
            return NextResponse.redirect(process.env.NEXT_PUBLIC_URL_WEBSITE as string);
        } else {
            return NextResponse.next();
        }
    }
    // else if (pathname.startsWith("/list-cars-driver")) {

    //     // ĐANG KHÔNG HOẠT ĐỘNG CẦN FIX
    //     if (coordinatesLocalStorage) {
    //         const parseCoordinates = JSON.parse(coordinatesLocalStorage)

    //         if (parseCoordinates.lat == 0 && parseCoordinates.lng == 0 && parseCoordinates.latTo == 0 && parseCoordinates.lngTo == 0) {
    //             return NextResponse.redirect(process.env.NEXT_PUBLIC_URL_WEBSITE as string);
    //         } else {
    //             return NextResponse.next();
    //         }
    //     }
    // }
    else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/account",
        "/list-car-favorite",
        "/info-rental-car/:path*",
        "/change-password",
        "/list-address",
        "/my-trips",
        "/delete-account",
        "/list-my-car",
        "/list-cars-driver",
        "/vehicle-management/:path*",
        "/vehicle-management-mobile/:path*",
    ],
    // matcher: ["/bar/:path*", "/checkout/:path*", "/order/:path*"],
};
