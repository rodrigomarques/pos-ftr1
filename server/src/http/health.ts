import { FastifyReply, FastifyRequest } from "fastify";

export async function getHealth(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	console.log("OKJ")
	return reply.status(200).send("Server is running");
}

