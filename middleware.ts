import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const token: any = request.cookies.get("token_kanow");
    const checkUrl = ["/account", "/list-car-favorite", "/change-password", "/list-address"];
    if (
        pathname.startsWith("/account") ||
        pathname.startsWith("/list-car-favorite") ||
        pathname.startsWith("/info-rental-car") ||
        pathname.startsWith("/change-password") ||
        pathname.startsWith("/list-address")
    ) {
        if (!token || token?.value == "kanow") {
            return NextResponse.redirect(process.env.NEXT_PUBLIC_URL_WEBSITE as string);
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/account", "/list-car-favorite", "/info-rental-car/:path*", "/change-password", "/list-address"],
    // matcher: ["/bar/:path*", "/checkout/:path*", "/order/:path*"],
};
