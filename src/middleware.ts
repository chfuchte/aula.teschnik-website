import { NextResponse, type MiddlewareConfig, type NextMiddleware } from "next/server";
import { db } from "./server/db";

export const middleware: NextMiddleware = (request, event) => {
    const token = request.cookies.get("session");

    if (!token || !token.value) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    event.waitUntil(new Promise<void>(async (resolve) => {
        if (!await getUser(token.value)) {
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

async function getUser(token: string) {
    const userSessionResult = await db.query.sessions.findFirst({
        where: (sessions, { eq }) => eq(sessions.token, token),
        columns: {
            id: false,
            token: false,
            userId: false,
        },
        with: {
            user: true,
        },
    });

    if (!userSessionResult || !userSessionResult.user) {
        return false;
    }

    return true;
}
