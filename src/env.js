import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DB_URL: z.string(),
        AUTH_DRIZZLE_URL: z.string(),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
        AUTH_SECRET: z.string(),
    },
    client: {},
    runtimeEnv: {
        // server
        DB_URL: process.env.DB_URL,
        AUTH_DRIZZLE_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        AUTH_SECRET: process.env.AUTH_SECRET,

        // client
    },

    emptyStringAsUndefined: true,
});
