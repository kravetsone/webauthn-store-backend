import Elysia, { t } from "elysia";
import { db } from "../db";
import { vaults } from "../db/schema";
import { authElysia } from "../setup";

export const vaultsStore = new Elysia()
	.use(authElysia)
	.get("/vaults", async () => {
		const vaultsList = await db.select().from(vaults);

		return vaultsList;
	})
	.post(
		"/vaults/store",
		async ({ body: { data, updatedAt }, user }) => {
			await db.insert(vaults).values({
				data,
				userId: user.id,
				updatedAt,
			});
		},
		{
			body: t.Object({
				data: t.String(),
				updatedAt: t.String(),
			}),
		},
	);
