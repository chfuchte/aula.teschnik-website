import { InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { sessions } from "./session";

export const rolesEnum = pgEnum("permissions", ["ADMIN", "ATEC", "USER", "REGISTERED"] as const);

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email").unique().notNull(),
    password: varchar("password").notNull(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    role: rolesEnum().notNull().default("REGISTERED"),
});

export type User = InferSelectModel<typeof users>;

export const userRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
}));
