"use server"
import { cookies } from "next/headers";
import { db } from "@/server/db/index";
import { sessions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function createSession(userId: string): Promise<boolean> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [{ insertedToken }] = await db
        .insert(sessions)
        .values({
            userId: userId,
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

export async function deleteSession(): Promise<boolean> {
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
