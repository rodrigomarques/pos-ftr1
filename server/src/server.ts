import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider
} from "fastify-type-provider-zod";

import { indexRoute } from "./routes/index.ts";
import { linksRoute } from "./routes/links.ts";

export function buildServer() {
	const app = fastify();
	//const app = fastify().withTypeProvider<ZodTypeProvider>();


	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.setErrorHandler((error, request, reply) => {
		console.error("Error handler:", error);
		if (hasZodFastifySchemaValidationErrors(error)) {
			return reply.status(400).send({
				error: 'Bad Request',
				details: error.validation
			});
		}

		console.error(error);
		return reply.status(500).send({ error: "Internal server error A." });
	});

	app.register(fastifyCors, { origin: "*" });
	// Registra suas rotas aqui
	app.register(indexRoute);
	app.register(linksRoute);

	return app;
}

const app = buildServer();

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("✅ HTTP server running on http://localhost:3333");
});
