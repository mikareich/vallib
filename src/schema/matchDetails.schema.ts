import z from "zod";

const newPlayerExperienceTimingSchema = z.object({
  idleTimeMillis: z.literal(0),
  objectiveCompleteTimeMillis: z.literal(0),
});

const teamOrPlayerSchema = z.enum(["Blue", "Red"]).or(z.string());

const locationSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const playerLocationSchema = z.object({
  subject: z.string(),
  viewRadians: z.number(),
  location: locationSchema,
});

const economySchema = z.object({
  loadoutValue: z.number(),
  weapon: z.string(),
  armor: z.string(),
  remaining: z.number(),
  spent: z.number(),
});

const killSchema = z.object({
  gameTime: z.number(),
  roundTime: z.number(),
  killer: z.string(),
  victim: z.string(),
  victimLocation: locationSchema,
  assistants: z.array(z.string()),
  playerLocations: z.array(playerLocationSchema),
  finishingDamage: z.object({
    damageType: z.enum([
      "Weapon",
      "Bomb",
      "Ability",
      "Fall",
      "Melee",
      "Invalid",
      "",
    ]),
    damageItem: z
      .string()
      .or(
        z.enum([
          "Ultimate",
          "Ability1",
          "Ability2",
          "GrenadeAbility",
          "Primary",
        ]),
      )
      .or(z.literal("")),
    isSecondaryFireMode: z.boolean(),
  }),
});

const matchDetails_SCHEMA = z.object({
  matchInfo: z.object({
    matchId: z.string(),
    mapId: z.string(),
    gamePodId: z.string(),
    gameLoopZone: z.string(),
    gameServerAddress: z.string(),
    gameVersion: z.string(),
    gameLengthMillis: z.number().nullable(),
    gameStartMillis: z.number(),
    provisioningFlowID: z.enum(["Matchmaking", "CustomGame"]),
    isCompleted: z.boolean(),
    customGameName: z.string(),
    forcePostProcessing: z.boolean(),
    queueID: z.string(),
    gameMode: z.string(),
    isRanked: z.boolean(),
    isMatchSampled: z.boolean(),
    seasonId: z.string(),
    completionState: z.enum(["Surrendered", "Completed", "VoteDraw", ""]), // TODO find remake string
    platformType: z.literal("pc"),
    premierMatchInfo: z.object({}),
    partyRRPenalties: z.record(z.string(), z.number()).optional(),
    shouldMatchDisablePenalties: z.boolean(),
  }),
  players: z.array(
    z.object({
      subject: z.string(),
      gameName: z.string(),
      tagLine: z.string(),
      platformInfo: z.object({
        platformType: z.literal("pc"),
        platformOS: z.literal("Windows"),
        platformOSVersion: z.string(),
        platformChipset: z.literal("Unknown"),
      }),
      teamId: teamOrPlayerSchema,
      partyId: z.string(),
      characterId: z.string(),
      stats: z
        .object({
          score: z.number(),
          roundsPlayed: z.number(),
          kills: z.number(),
          deaths: z.number(),
          assists: z.number(),
          playtimeMillis: z.number(),
          abilityCasts: z
            .object({
              grenadeCasts: z.number(),
              ability1Casts: z.number(),
              ability2Casts: z.number(),
              ultimateCasts: z.number(),
            })
            .nullable()
            .optional(),
        })
        .nullable(),
      roundDamage: z
        .array(
          z.object({
            round: z.number(),
            receiver: z.string(),
            damage: z.number(),
          }),
        )
        .nullable(),
      competitiveTier: z.number(),
      isObserver: z.boolean(),
      playerCard: z.string(),
      playerTitle: z.string(),
      preferredLevelBorder: z.string().optional(),
      accountLevel: z.number(),
      sessionPlaytimeMinutes: z.number().nullable().optional(),
      xpModifications: z
        .array(
          z.object({
            Value: z.number(),
            ID: z.string(),
          }),
        )
        .optional(),
      behaviorFactors: z
        .object({
          afkRounds: z.number(),
          collisions: z.number().optional(),
          commsRatingRecovery: z.number(),
          damageParticipationOutgoing: z.number(),
          friendlyFireIncoming: z.number().optional(),
          friendlyFireOutgoing: z.number().optional(),
          mouseMovement: z.number().optional(),
          stayedInSpawnRounds: z.number().optional(),
        })
        .optional(),
      newPlayerExperienceDetails: z
        .object({
          basicMovement: newPlayerExperienceTimingSchema,
          basicGunSkill: newPlayerExperienceTimingSchema,
          adaptiveBots: z
            .object({
              adaptiveBotAverageDurationMillisAllAttempts: z.literal(0),
              adaptiveBotAverageDurationMillisFirstAttempt: z.literal(0),
              killDetailsFirstAttempt: z.null(),
            })
            .merge(newPlayerExperienceTimingSchema),
          ability: newPlayerExperienceTimingSchema,
          bombPlant: newPlayerExperienceTimingSchema,
          defendBombSite: z
            .object({
              success: z.literal(false),
            })
            .merge(newPlayerExperienceTimingSchema),
          settingStatus: z.object({
            isMouseSensitivityDefault: z.boolean(),
            isCrosshairDefault: z.boolean(),
          }),
          versionString: z.literal(""),
        })
        .optional(),
    }),
  ),
  bots: z.array(z.unknown()),
  coaches: z.array(
    z.object({
      subject: z.string(),
      teamId: z.enum(["Blue", "Red"]),
    }),
  ),

  teams: z
    .array(
      z.object({
        teamId: teamOrPlayerSchema,
        won: z.boolean(),
        roundsPlayed: z.number(),
        roundsWon: z.number(),
        numPoints: z.number(),
      }),
    )
    .nullable(),
  roundResults: z
    .array(
      z.object({
        roundNum: z.number(),
        roundResult: z.enum([
          "Eliminated",
          "Bomb detonated",
          "Bomb defused",
          "Surrendered",
          "Round timer expired",
        ]),
        roundCeremony: z.enum([
          "CeremonyDefault",
          "CeremonyTeamAce",
          "CeremonyFlawless",
          "CeremonyCloser",
          "CeremonyClutch",
          "CeremonyThrifty",
          "CeremonyAce",
          "",
        ]),
        winningTeam: teamOrPlayerSchema,
        bombPlanter: z.string().optional(),
        bombDefuser: teamOrPlayerSchema.optional(),
        plantRoundTime: z
          .number()
          .optional()
          .describe(
            "Time in milliseconds since the start of the round when the bomb was planted. 0 if not planted",
          ),
        plantPlayerLocations: z.array(playerLocationSchema).nullable(),
        plantLocation: locationSchema,
        plantSite: z.enum(["A", "B", "C", ""]),
        defuseRoundTime: z
          .number()
          .optional()
          .describe(
            "Time in milliseconds since the start of the round when the bomb was defused. 0 if not defused",
          ),
        defusePlayerLocations: z.array(playerLocationSchema).nullable(),
        defuseLocation: locationSchema,
        playerStats: z.array(
          z.object({
            subject: z.string(),
            kills: z.array(killSchema),
            damage: z.array(
              z.object({
                receiver: z.string(),
                damage: z.number(),
                legshots: z.number(),
                bodyshots: z.number(),
                headshots: z.number(),
              }),
            ),
            score: z.number(),
            economy: economySchema,
            ability: z.object({
              grenadeEffects: z.null(),
              ability1Effects: z.null(),
              ability2Effects: z.null(),
              ultimateEffects: z.null(),
            }),
            wasAfk: z.boolean(),
            wasPenalized: z.boolean(),
            stayedInSpawn: z.boolean(),
          }),
        ),
        roundResultCode: z
          .enum(["Elimination", "Detonate", "Defuse", "Surrendered", ""])
          .describe("Empty string if the timer expired"),
        playerEconomies: z
          .array(
            z
              .object({
                subject: z.string(),
              })
              .merge(economySchema),
          )
          .nullable(),
        playerScores: z
          .array(
            z.object({
              subject: z.string(),
              score: z.number(),
            }),
          )
          .nullable(),
      }),
    )
    .nullable(),
  kills: z
    .array(
      killSchema.merge(
        z.object({
          round: z.number(),
        }),
      ),
    )
    .nullable(),
});

export default matchDetails_SCHEMA;
