import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getHealth } from "../http/health.ts";
import { deleteLink, exportLinks, getAll, getByShortCode, incrementCount, saveLink } from "@/http/links";

export const linkSchema = z.object({
  id: z.string().uuid(),
  originalUrl: z.string().url(),
  shortUrl: z.string().min(1).max(100),
  accessCount: z.number().int().nonnegative(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

// Tipo TypeScript inferido
export type Link = z.infer<typeof linkSchema>

export const linksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create Link Route",
        body: z.object({
          url: z.string().url(),
          shortCode: z.string().optional(),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            originalUrl: z.string().url(),
            shortCode: z.string(),
          }),
          400: z.object({
            error: z.literal('Bad Request'),
            details: z.array(z.any())
          }),
          500: z.object({
            error: z.string()
          }),
        },
      },
    },
    saveLink,
  );

  server.delete(
    "/links/:shortCode",
    {
      schema: {
        summary: "Delete a Link Route",
        response: {
          200: z.string(),
          400: z.object({
            error: z.literal('Bad Request'),
            details: z.array(z.any())
          }),
          500: z.object({
            error: z.string()
          }),
          404: z.object({
            error: z.string()
          }),
        },
      },
    },
    deleteLink,
  );

  server.get(
    "/links/:shortCode",
    {
      schema: {
        summary: "Find a Link Route",
        response: {
          200: z.object({ link: linkSchema }),
          400: z.object({
            error: z.literal('Bad Request'),
            details: z.array(z.any())
          }),
          500: z.object({
            error: z.string()
          }),
          404: z.object({
            error: z.string()
          }),
        },
      },
    },
    getByShortCode,
  );

  server.get(
    "/links",
    {
      schema: {
        summary: "List all Link Route",
        response: {
          200: z.object({ links: z.array(linkSchema) }),
          500: z.object({
            error: z.string()
          }),
        },
      },
    },
    getAll,
  );

  server.get(
    "/links/:shortCode/increment",
    {
      schema: {
        summary: "Increment a count Link",
        response: {
          200: z.object({ link: linkSchema }),
          400: z.object({
            error: z.literal('Bad Request'),
            details: z.array(z.any())
          }),
          500: z.object({
            error: z.string()
          }),
          404: z.object({
            error: z.string()
          }),
        },
      },
    },
    incrementCount,
  );

  server.get(
    "/links/export",
    {
      schema: {
        summary: "Export Link Route",
        response: {
          200: z.object({
            url: z.string().url(),
          }),
        },
      },
    },
    exportLinks,
  );
};
