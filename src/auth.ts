import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server/db"
import { accounts, sessions, users, verificationTokens } from "@/server/db/schema"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt";
import { z } from "zod"

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

async function getUser(email: string) {
    try {
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });

        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials) return null;

                    const parsedCredentials = credentialsSchema.safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await getUser(email);
                        if (!user) return null;
                        if (await compare(password, user.password)) return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        };
                    }

                    return null;
                } catch {
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/auth',
    },
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    })
});
