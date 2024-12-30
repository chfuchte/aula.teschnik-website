import "server-only";

import { db } from "@/server/db/index";
import { sessions, User } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });
        return user;
    } catch {
        return undefined;
    }
}

export async function getUserBySession(token: string): Promise<User | undefined> {
    try {
        const res = await db.query.sessions.findFirst({
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
        return res?.user;
    } catch {
        return undefined;
    }
}

export async function newSession(userId: string): Promise<string | null> {
    try {
        const [{ insertedToken }] = await db
            .insert(sessions)
            .values({
                userId,
            })
            .returning({ insertedToken: sessions.token });
        return insertedToken;
    } catch {
        return null;
    }
}

export async function deleteSession(token: string): Promise<boolean> {
    try {
        await db.delete(sessions).where(eq(sessions.token, token));
        return true;
    } catch {
        return false;
    }
}
