// automatically generated schema, 2025-02-19T22:57:39.822Z

import { z } from "zod";

const accountAlias_SCHEMA = z.union([
  z.array(
    z.object({
      puuid: z.string(),
      alias: z.object({ game_name: z.string(), tag_line: z.string() }),
    }),
  ),
  z.array(
    z.object({
      game_name: z.string(),
      tag_line: z.string(),
      active: z.boolean(),
      created_datetime: z.number(),
      change_required: z.boolean(),
      shadow_gnt: z.boolean(),
    }),
  ),
]);

export default accountAlias_SCHEMA;
