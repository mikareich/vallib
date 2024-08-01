// automatically generated schema, 2024-08-01T08:35:29.434Z

import { z } from "zod";

const playerInfo_SCHEMA = z.object({
  country: z.string(),
  sub: z.string(),
  email_verified: z.boolean(),
  player_plocale: z.null(),
  country_at: z.number(),
  pw: z.object({
    cng_at: z.number(),
    reset: z.boolean(),
    must_reset: z.boolean(),
  }),
  phone_number_verified: z.boolean(),
  account_verified: z.boolean(),
  ppid: z.null(),
  federated_identity_details: z.array(z.unknown()),
  player_locale: z.string(),
  acct: z.object({
    type: z.number(),
    state: z.string(),
    adm: z.boolean(),
    game_name: z.string(),
    tag_line: z.string(),
    created_at: z.number(),
  }),
  age: z.number(),
  jti: z.string(),
  affinity: z.object({ pp: z.string() }),
});

export default playerInfo_SCHEMA;
