// types.ts
import { z } from "zod";
import { CoreInvitationZodSchema } from "./zod.schema";

export type CoreInvitationData = z.infer<typeof CoreInvitationZodSchema>;

export interface InvitationEntity {
  id: string;
  userId: string;
  templateId: string;
  coreData: CoreInvitationData;
  templateData: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
