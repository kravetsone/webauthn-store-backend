import type { Config } from "drizzle-kit";

console.log("http://localhost:4983");

export default {
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string,
	},
} satisfies Config;
