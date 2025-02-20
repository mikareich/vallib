import { z } from "zod";

const competitiveUpdates_SCHEMA = z.object({
  Version: z.number(),
  Subject: z.string(),
  Matches: z.array(
    z.object({
      MatchID: z.string(),
      MapID: z.string(),
      SeasonID: z.string(),
      MatchStartTime: z.number(),
      TierAfterUpdate: z.number(),
      TierBeforeUpdate: z.number(),
      RankedRatingAfterUpdate: z.number(),
      RankedRatingBeforeUpdate: z.number(),
      RankedRatingEarned: z.number(),
      RankedRatingPerformanceBonus: z.number(),
      RankedRatingRefundApplied: z.number(),
      CompetitiveMovement: z.string(),
      AFKPenalty: z.number(),
      WasDerankProtected: z.boolean(),
      WasDerankProtectionReplenished: z.boolean(),
      IsDerankProtectedTier: z.boolean(),
    }),
  ),
});

export default competitiveUpdates_SCHEMA;
