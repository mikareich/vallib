import { z } from "zod";

const SeasonSchema = z.object({
  SeasonID: z.string(),
  NumberOfWins: z.number(),
  NumberOfWinsWithPlacements: z.number(),
  NumberOfGames: z.number(),
  Rank: z.number(),
  CapstoneWins: z.number(),
  LeaderboardRank: z.number(),
  CompetitiveTier: z.number(),
  RankedRating: z.number(),
  WinsByTier: z.record(z.string(), z.number()).optional().nullable(),
  GamesNeededForRating: z.number(),
  TotalWinsNeededForRank: z.number(),
});

const QueueSchema = z.object({
  TotalGamesNeededForRating: z.number(),
  TotalGamesNeededForLeaderboard: z.number(),
  CurrentSeasonGamesNeededForRating: z.number(),
  SeasonalInfoBySeasonID: z.record(z.string(), SeasonSchema),
});

const QueueSkillsSchema = z.object({
  competitive: QueueSchema,
  deathmatch: QueueSchema,
  ggteam: QueueSchema,
  hurm: QueueSchema,
  newmap: QueueSchema,
  onefa: QueueSchema,
  premier: QueueSchema,
  seeding: QueueSchema,
  spikerush: QueueSchema,
  swiftplay: QueueSchema,
  unrated: QueueSchema,
});

const LatestCompetitiveUpdateSchema = z.object({
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
  CompetitiveMovement: z.string(),
  AFKPenalty: z.number(),
  WasDerankProtected: z.boolean(),
  WasDerankProtectionReplenished: z.boolean(),
  IsDerankProtectedTier: z.boolean(),
});

export const PlayerMmr_SCHEMA = z.object({
  Version: z.number(),
  Subject: z.string(),
  NewPlayerExperienceFinished: z.boolean(),
  QueueSkills: QueueSkillsSchema,
  LatestCompetitiveUpdate: LatestCompetitiveUpdateSchema,
  IsLeaderboardAnonymized: z.boolean(),
  IsActRankBadgeHidden: z.boolean(),
  OnboardingStatus: z.string(),
  OnboardingFlowV2Enabled: z.boolean(),
  DerankProtectedGamesRemaining: z.number(),
  DerankProtectedStatus: z.string(),
});

export default PlayerMmr_SCHEMA;
