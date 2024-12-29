import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from "@/env";
import * as schema from "./schema";

const db = drizzle(env.DB_URL, {
    schema: {
        ...schema,
    },
});

export { db };
