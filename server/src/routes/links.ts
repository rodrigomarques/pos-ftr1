import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getHealth } from "../http/health.ts";
import { deleteLink, saveLink } from "@/http/links";

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
    getHealth,
  );

  server.get(
    "/links",
    {
      schema: {
        summary: "List all Link Route",
        querystring: z.object({
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    getHealth,
  );

  server.post(
    "/links/export",
    {
      schema: {
        summary: "Export Link Route",
        body: z.object({
          csvUrl: z.string()
        }),
        response: {
          200: z.string(),
        },
      },
    },
    getHealth,
  );

  server.get(
    "/links/export",
    {
      schema: {
        summary: "Export Link Route",
        response: {
          200: z.string(),
        },
      },
    },
    getHealth,
  );
};
