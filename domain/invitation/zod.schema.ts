// domain/invitation/zod.schema.ts
import { z } from "zod";

export const CoreInvitationZodSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  eventDate: z.string().datetime(),
  timezone: z.string().optional().default("Asia/Jakarta"),
  location: z.string().optional(),
  coverImage: z.string().url().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  visibility: z.enum(["public", "private"]).default("public"),
});
