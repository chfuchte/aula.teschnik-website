import { relations } from "drizzle-orm";
import { pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";

export const sessions = pgTable("sessions", {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull(),
    token: uuid("token").defaultRandom()
});

export const sessionUserRelation = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));
