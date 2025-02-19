// automatically generated schema, 2024-08-11T14:43:36.636Z

import { z } from "zod";

const playerLoadout_SCHEMA = z.object({
  Subject: z.string(),
  Version: z.number(),
  Guns: z.array(
    z.object({
      ID: z.string(),
      SkinID: z.string(),
      SkinLevelID: z.string(),
      ChromaID: z.string(),
      Attachments: z.array(z.unknown()),
    }),
  ),
  Sprays: z.array(
    z.object({
      EquipSlotID: z.string(),
      SprayID: z.string(),
      SprayLevelID: z.null(),
    }),
  ),
  Identity: z.object({
    PlayerCardID: z.string(),
    PlayerTitleID: z.string(),
    AccountLevel: z.number(),
    PreferredLevelBorderID: z.string(),
    HideAccountLevel: z.boolean(),
  }),
  Incognito: z.boolean(),
});

export default playerLoadout_SCHEMA;
