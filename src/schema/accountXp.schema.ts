// automatically generated schema, 2024-08-11T14:34:23.661Z

import { z } from "zod";

const accountXp_SCHEMA = z.object({
  Version: z.number(),
  Subject: z.string(),
  Progress: z.object({ Level: z.number(), XP: z.number() }),
  History: z.array(
    z.union([
      z.object({
        ID: z.string(),
        MatchStart: z.string(),
        StartProgress: z.object({ Level: z.number(), XP: z.number() }),
        EndProgress: z.object({ Level: z.number(), XP: z.number() }),
        XPDelta: z.number(),
        XPSources: z.array(z.object({ ID: z.string(), Amount: z.number() })),
        XPMultipliers: z.array(z.unknown()),
      }),
      z.object({
        ID: z.string(),
        MatchStart: z.string(),
        StartProgress: z.object({ Level: z.number(), XP: z.number() }),
        EndProgress: z.object({ Level: z.number(), XP: z.number() }),
        XPDelta: z.number(),
        XPSources: z.array(z.object({ ID: z.string(), Amount: z.number() })),
        XPMultipliers: z.array(z.object({ ID: z.string(), Value: z.number() })),
      }),
    ]),
  ),
  LastTimeGrantedFirstWin: z.string(),
  NextTimeFirstWinAvailable: z.string(),
});

export default accountXp_SCHEMA;
