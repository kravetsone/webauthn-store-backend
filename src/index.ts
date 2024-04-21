import { bearer } from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { logger } from "logixlysia";
import { authRoutes } from "./routes/auth";
import { vaultsRoutes } from "./routes/vaults";

const app = new Elysia()
	.use(swagger())
	.use(bearer())
	.use(cors())
	.use(
		logger({
			config: {
				ip: false,
			},
		}),
	)
	.use(authRoutes)
	.use(vaultsRoutes);

app.listen(process.env.PORT as string, () =>
	console.log(`🦊 Server started at ${app.server?.url.origin}`),
);
