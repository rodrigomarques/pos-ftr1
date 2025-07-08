import { env } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
	region: "auto",
	endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: "f3d1c501aa5d56bfaf5df47de1889f21", //env.CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: "4d8c5aced739027f6abf9f27304bb9ac8611c72496c73fa55e412040760c23cc", //env.CLOUDFLARE_SECRET_ACCESS_KEY,
	},
});
