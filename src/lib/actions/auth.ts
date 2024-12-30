"use server";

import { cookies } from "next/headers";
import { compare } from "bcrypt";
import { deleteSession, getUserByEmail, getUserBySession, newSession } from "@/server/queries/auth";
import { User } from "@/server/db/schema";

export async function login(email: string, password: string): Promise<boolean> {
    const user = await getUserByEmail(email);

    if (!user) {
        return false;
    }

    if (!await compare(password, user.password)) {
        return false;
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const insertedToken = await newSession(user.id);

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

        await deleteSession(token.value);

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

        const user = await getUserBySession(token.value);

        if (!user) {
            return [false, null];
        }

        return [true, user];
    } catch {
        return [false, null];
    }
}
