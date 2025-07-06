import { FastifyReply, FastifyRequest } from "fastify";

export async function getHealth(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	return reply.status(200).send("Server is running");
}

