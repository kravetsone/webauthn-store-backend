import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
});
