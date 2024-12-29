import { cookies } from "next/headers";
import { NextResponse, type MiddlewareConfig, type NextMiddleware } from "next/server";
import { User } from "./server/db/schema";
import { db } from "./server/db";

export const middleware: NextMiddleware = async (request) => {
    const [success] = await getUser();

    if (!success) {
        return NextResponse.rewrite(new URL('/auth', request.url))
    }
};

export const config: MiddlewareConfig = {
    matcher: [

    ],
};

async function getUser(): Promise<[true, User] | [false, null]> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session");

        if (!token || !token.value) {
            return [false, null];
        }

        const userSessionResult = await db.query.sessions.findFirst({
            where: (sessions, { eq }) => eq(sessions.token, token.value),
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
            return [false, null];
        }

        return [true, userSessionResult.user];
    } catch {
        return [false, null];
    }
}
