import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "./../db/index.ts"
import z from "zod";
import { schema } from "@/db/schemas/index";
import { eq } from "drizzle-orm";


export const createLinkSchema = z.object({
	url: z.string().url(),
	shortCode: z.string().optional(),
})

export type CreateLinkInput = z.infer<typeof createLinkSchema>

export async function saveLink(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const { url, shortCode } = createLinkSchema.parse(request.body)
		const generatedShortCode = shortCode ?? generateRandomCode()

		const linkDb = await db.insert(schema.links).values({
			originalUrl: url,
			shortUrl: generatedShortCode,
			accessCount: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		}).returning()

		const link = linkDb[0]
		return reply.code(201).send({
			id: link.id,
			originalUrl: link.originalUrl,
			shortCode: link.shortUrl
		})
	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send({
			error: "Internal Server Error AA " + error,
		});
	}

}

export async function deleteLink(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const deleteLinkParams = z.object({
		shortCode: z.string().min(1),
	})
	const { shortCode } = deleteLinkParams.parse(request.params)
	try {

		const deleted = await db
			.delete(schema.links)
			.where(eq(schema.links.shortUrl, shortCode))
			.returning()

		if (deleted.length === 0) {
			return reply.status(404).send({ error: "Link not found" })
		}

		return reply.status(200).send("Link deleted successfully")
	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send({
			error: "Internal Server Error AA " + error,
		});
	}
}

export async function getByShortCode(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const deleteLinkParams = z.object({
		shortCode: z.string().min(1),
	})
	const { shortCode } = deleteLinkParams.parse(request.params)
	try {

		const result = await db
			.select()
			.from(schema.links)
			.where(eq(schema.links.shortUrl, shortCode))

		if (result.length === 0) {
			return reply.status(404).send({ error: "Link not found" })
		}

		return reply.status(200).send({
			link: result[0],
		})
	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send({
			error: "Internal Server Error AA " + error,
		});
	}

}

function generateRandomCode(length = 6) {
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}