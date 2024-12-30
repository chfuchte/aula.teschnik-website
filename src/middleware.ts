import { NextResponse, type MiddlewareConfig, type NextMiddleware } from "next/server";
import { getUserBySession } from "./server/queries/auth";

export const middleware: NextMiddleware = (request, event) => {
    const token = request.cookies.get("session");

    if (!token || !token.value) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    event.waitUntil(new Promise<void>(async (resolve) => {
        if (!await getUserBySession(token.value)) {
            console.log("User not found")
            return NextResponse.redirect(new URL('/auth', request.url))
        }
        resolve();
    }));

    return NextResponse.next()
};

export const config: MiddlewareConfig = {
    matcher: [
        "/dashboard:path*",
        "/events:path*",
    ],
};
