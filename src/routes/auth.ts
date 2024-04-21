import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { jwtElysia } from "../setup";

export const authRoutes = new Elysia()
	.use(jwtElysia)
	.post(
		"/sign-up",
		async ({ body: { email, password }, jwt }) => {
			const [user] = await db
				.insert(users)
				.values({
					email,
					password: await Bun.password.hash(password),
				})
				.returning();

			const token = await jwt.sign({
				id: user.id,
			});

			return token;
		},
		{
			body: t.Object({
				email: t.String({ format: "email" }),
				password: t.String(),
			}),
		},
	)
	.post(
		"/sign-in",
		async ({ body: { email, password }, jwt, error }) => {
			const [user] = await db
				.select()
				.from(users)
				.where(eq(users.email, email));

			if (!user)
				return error("Unauthorized", {
					message: "Вы ввели неправильный логин или пароль",
				});

			const isPasswordEqual = await Bun.password.verify(
				password,
				user.password,
			);
			if (!isPasswordEqual)
				return error("Unauthorized", {
					message: "Вы ввели неправильный логин или пароль",
				});

			const token = await jwt.sign({
				id: user.id,
			});

			return token;
		},
		{
			body: t.Object({
				email: t.String({ format: "email" }),
				password: t.String(),
			}),
		},
	);
