import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const token = request.cookies.get("token_kanow");

    if (pathname.startsWith("/account")) {
        if (!token) {
            return NextResponse.redirect(process.env.NEXT_PUBLIC_URL_WEBSITE as string);
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/account"],
    // matcher: ["/bar/:path*", "/checkout/:path*", "/order/:path*"],
};
