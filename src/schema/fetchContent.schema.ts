// automatically generated schema, 2024-08-09T16:22:53.990Z

import { z } from "zod";

const fetchContent_SCHEMA = z.object({
  DisabledIDs: z.array(z.unknown()),
  Seasons: z.array(
    z.object({
      ID: z.string(),
      Name: z.string(),
      Type: z.string(),
      StartTime: z.string(),
      EndTime: z.string(),
      IsActive: z.boolean(),
    }),
  ),
  Events: z.array(
    z.object({
      ID: z.string(),
      Name: z.string(),
      StartTime: z.string(),
      EndTime: z.string(),
      IsActive: z.boolean(),
    }),
  ),
});

export default fetchContent_SCHEMA;
