import { FastifyReply, FastifyRequest } from "fastify";
import { db, pg } from "@/db/index.ts"
import z from "zod";
import { schema } from "@/db/schemas/index";
import { eq } from "drizzle-orm";
import { stringify } from "csv-stringify";

export const createLinkSchema = z.object({
	url: z.string().url(),
	shortCode: z.string().optional(),
})

export type CreateLinkInput = z.infer<typeof createLinkSchema>

export async function saveLink(
	request: FastifyRequest,
	reply: FastifyReply,
) {

	const { url, shortCode } = createLinkSchema.parse(request.body)
	try {
		const generatedShortCode = shortCode ?? generateRandomCode()

		const linkDb = await db.insert(schema.links).values({
			originalUrl: url,
			shortUrl: generatedShortCode,
			accessCount: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		}).returning()

		const link = linkDb[0]
		return reply.code(201).send(JSON.stringify({
			id: link.id,
			originalUrl: link.originalUrl,
			shortCode: link.shortUrl
		}))

	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send(JSON.stringify({
			error: "Internal Server Error AA " + error,
		}));
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
			return reply.status(404).send(JSON.stringify({ error: "Link not found" }))
		}

		return reply.status(200).send(JSON.stringify({
			link: result[0],
		}))
	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send(JSON.stringify({
			error: "Internal Server Error AA " + error,
		}));
	}

}

export async function getAll(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {

		const result = await db
			.select()
			.from(schema.links)

		return reply.status(200).send(JSON.stringify({
			links: result,
		}))
	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send(JSON.stringify({
			error: "Internal Server Error AA " + error,
		}));
	}

}

export async function incrementCount(
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
			return reply.status(404).send(JSON.stringify({ error: "Link not found" }))
		}

		const updated = await db
			.update(schema.links)
			.set({
				accessCount: result[0].accessCount + 1,
				updatedAt: new Date(),
			})
			.where(eq(schema.links.id, result[0].id))
			.returning()

		return reply.status(200).send(JSON.stringify({
			link: updated[0],
		}))

	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send(JSON.stringify({
			error: "Internal Server Error AA " + error,
		}));
	}

}
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { uploadFileToStorage } from "@/storage/upload-file-to-storage.ts";

export async function exportLinks(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {

		const { sql, params } = db
			.select()
			.from(schema.links)
			.toSQL();

		const cursor = pg.unsafe(sql, params as string[]).cursor(2);
		const csv = stringify({
			delimiter: ",",
			header: true,
			columns: [
				{ key: "id", header: "ID" },
				{ key: "original_url", header: "Name" },
				{ key: "short_url", header: "URL" },
				{ key: "access_count", header: "Count" },
				{ key: "created_at", header: "Created at" },
				{ key: "updated_at", header: "Uploaded at" },
			],
		});
		const uploadToStorageStream = new PassThrough();
		const convertToCSVPipeline = pipeline(
			cursor,
			new Transform({
				objectMode: true,
				transform(chunks: unknown[], encoding, callback) {
					for (const chunk of chunks) {
						this.push(chunk);
					}

					callback();
				},
			}),
			csv,
			uploadToStorageStream,
		);

		const uploadToStorage = uploadFileToStorage({
			contentType: "text/csv",
			folder: "downloads",
			fileName: `${new Date().toISOString()}-links.csv`,
			contentStream: uploadToStorageStream,
		});

		const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

		return reply.status(200).send(JSON.stringify({
			url: url,
		}))

	} catch (error) {
		console.error("Error saving link:", error);
		return reply.status(500).send(JSON.stringify({
			error: "Internal Server Error AA " + error,
		}));
	}

}

function generateRandomCode(length = 6) {
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}