import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { vaults } from "../db/schema";
import { authElysia } from "../setup";

export const vaultsRoutes = new Elysia()
	.use(authElysia)
	.get("/vaults", async ({ user }) => {
		const [vault] = await db
			.select()
			.from(vaults)
			.where(eq(vaults.userId, user.id));

		if (!vault) return { success: false };

		return vault;
	})
	.post(
		"/vaults/store",
		async ({ body: { data, updatedAt }, user }) => {
			const [vault] = await db
				.select()
				.from(vaults)
				.where(eq(vaults.userId, user.id));

			if (!vault)
				return db.insert(vaults).values({
					data,
					userId: user.id,
					updatedAt,
				});

			await db
				.update(vaults)
				.set({ data, updatedAt })
				.where(eq(vaults.userId, user.id));
		},
		{
			body: t.Object({
				data: t.String(),
				updatedAt: t.String(),
			}),
		},
	);
