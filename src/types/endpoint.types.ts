import type z from "zod";
import type accountAlias_SCHEMA from "~/src/schema/accountAlias.schema";
import type pasToken_SCHEMA from "~/src/schema/pasToken.schema";
import type competitiveUpdates_SCHEMA from "~/src/schema/competitiveUpdates.schema";
import type playerInfo_SCHEMA from "~/src/schema/playerInfo.schema";
import type cookieReauth_SCHEMA from "~/src/schema/cookieReauth.schema";
import type accountXp_SCHEMA from "~/src/schema/accountXp.schema";
import type entitlement_SCHEMA from "~/src/schema/entitlement.schema";
import type playerLoadout_SCHEMA from "~/src/schema/playerLoadout.schema";
import type matchDetails_SCHEMA from "~/src/schema/matchDetails.schema";
import type authCookies_SCHEMA from "~/src/schema/authCookies.schema";
import type fetchContent_SCHEMA from "~/src/schema/fetchContent.schema";
import type playerMmr_SCHEMA from "~/src/schema/playerMmr.schema";
import type riotGeo_SCHEMA from "~/src/schema/riotGeo.schema";

export type AccountDetails = z.infer<typeof accountAlias_SCHEMA>;
export type PasToken = z.infer<typeof pasToken_SCHEMA>;
export type CompetitiveUpdates = z.infer<typeof competitiveUpdates_SCHEMA>;
export type PlayerInfo = z.infer<typeof playerInfo_SCHEMA>;
export type CookieReauth = z.infer<typeof cookieReauth_SCHEMA>;
export type AccountXp = z.infer<typeof accountXp_SCHEMA>;
export type Entitlement = z.infer<typeof entitlement_SCHEMA>;
export type PlayerLoadout = z.infer<typeof playerLoadout_SCHEMA>;
export type MatchDetails = z.infer<typeof matchDetails_SCHEMA>;
export type AuthCookies = z.infer<typeof authCookies_SCHEMA>;
export type FetchContent = z.infer<typeof fetchContent_SCHEMA>;
export type PlayerMmr = z.infer<typeof playerMmr_SCHEMA>;
export type RiotGeo = z.infer<typeof riotGeo_SCHEMA>;
