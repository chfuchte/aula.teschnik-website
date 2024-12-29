"use server"
import { cookies } from "next/headers";
import { db } from "../../server/db";
import { User } from "../../server/db/schema";

export async function getUser(): Promise<[true, User] | [false, null]> {
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
