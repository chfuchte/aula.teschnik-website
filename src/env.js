import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DB_URL: z.string(),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    client: {
        NEXT_PUBLIC_HOST: z.string().default("localhost"),
    },
    runtimeEnv: {
        // server
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,

        // client
        NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    },

    emptyStringAsUndefined: true,
});
