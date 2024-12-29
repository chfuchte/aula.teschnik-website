import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/server/db/schema/index.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DB_URL!,
    },
});
