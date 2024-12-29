import { relations } from "drizzle-orm";
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const sessions = pgTable("sessions", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    token: uuid("token").generatedAlwaysAs(`gen_random_uuid()`),
});

export const sessionUserRelation = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));
