"use server"

import { cookies } from "next/headers";
import { db } from "@/server/db/index";
import { sessions, User } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";

export async function login(email: string, password: string): Promise<boolean> {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
    });

    if (!user) {
        return false;
    }

    if (!await compare(password, user.password)) {
        return false;
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [{ insertedToken }] = await db
        .insert(sessions)
        .values({
            userId: user.id,
        })
        .returning({ insertedToken: sessions.token });

    if (!insertedToken) {
        return false;
    }

    const cookieStore = await cookies();

    cookieStore.set("session", insertedToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });

    return true;
}

export async function logout(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session");

        if (!token || !token.value) {
            return true; // already not logged in
        }

        await db.delete(sessions).where(eq(sessions.token, token.value));
        cookieStore.delete("session");

        return true;
    } catch {
        return false;
    }
}

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
