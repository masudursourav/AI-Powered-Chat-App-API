import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const chat = pgTable("chat", {
  id: serial("id").primaryKey().notNull(),
  userId: text("user_id").notNull(),
  message: text("message").notNull(),
  reply: text("reply").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const user = pgTable("user", {
  userId: text("user_id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ChatInsert = typeof chat.$inferInsert;
export type chatSelect = typeof chat.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
export type UserSelect = typeof user.$inferSelect;
