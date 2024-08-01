// automatically generated schema, 2024-08-01T10:51:16.664Z

import { z } from "zod";

const riotGeo_SCHEMA = z.object({
  token: z.string(),
  affinities: z.object({ pbe: z.string(), live: z.string() }),
});

export default riotGeo_SCHEMA;
