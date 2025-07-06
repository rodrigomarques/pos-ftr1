import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

import { indexRoute } from "./routes/index.ts";

export function buildServer() {
	const app = fastify();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.setErrorHandler((error, request, reply) => {
		if (hasZodFastifySchemaValidationErrors(error)) {
			return reply.status(400).send({
				message: "Validation error",
				issues: error.validation,
			});
		}

		console.error(error);
		return reply.status(500).send({ message: "Internal server error." });
	});

	app.register(fastifyCors, { origin: "*" });

	// Registra suas rotas aqui
	app.register(indexRoute);

	return app;
}

const app = buildServer();

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("✅ HTTP server running on http://localhost:3333");
});
