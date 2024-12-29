import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
    vnstltr_vorname: varchar("vnstltr_vorname").notNull(),
    vnstltr_nachname: varchar("vnstltr_nachname").notNull(),
    vnstltr_email: varchar("vnstltr_email").notNull(),

    titel: varchar("titel").notNull(),
    beschreibung: varchar("beschreibung").notNull(),
    ort: varchar("ort").notNull(),
    pax: integer("pax").notNull(),

    equip_beamer_required: boolean("equip_beamer_required").notNull(),
    equip_beamer_sound: boolean("equip_beamer_sound").notNull(),
    equip_mikro_funkmic: integer("equip_mikro_funkmic").notNull(),
    equip_mikro_kabelmic: integer("equip_mikro_kabelmic").notNull(),
    equip_mikro_headsets: integer("equip_mikro_headsets").notNull(),

    sonstiges: text("sonstiges").notNull(),
});

export const eventTimes = pgTable("event_times", {
    id: uuid("id").defaultRandom().primaryKey(),
    event_id: uuid("event_id").notNull(),
    date: varchar("date").notNull(),
    start: varchar("start").notNull(),
    end: varchar("end").notNull(),
    notiz: text("notiz").notNull(),
});

export const eventRelations = relations(events, ({ many }) => ({
    times: many(eventTimes)
}));

export const eventTimeRelations = relations(eventTimes, ({ one }) => ({
    event: one(events, {
        fields: [eventTimes.event_id],
        references: [events.id],
    }),
}));
