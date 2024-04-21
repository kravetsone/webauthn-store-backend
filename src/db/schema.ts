import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
});

export const vaults = pgTable("vaults", {
	id: serial("id").primaryKey(),
	data: text("data").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	updatedAt: text("updated_at").notNull(),
});
