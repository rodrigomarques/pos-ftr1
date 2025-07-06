import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getHealth } from "../http/health.ts";

export const indexRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/health",
    {
      schema: {
        summary: "Health Route",
        response: {
          200: z.string(),
        },
      },
    },
    getHealth,
  );
};
