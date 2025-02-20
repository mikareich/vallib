import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import matchDetails_SCHEMA from "~/src/schema/matchDetails.schema";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";
import type { Shard, TokenParams } from "~/src/types/riot.types";

type Params = TokenParams["AuthToken"] &
  TokenParams["EntitlementsToken"] & { shard: Shard; matchId: string };

/**
 * Get the details of a match after it ends
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/match-details)
 */
export default async function MATCH_DETAILS<Options extends EndpointOptions>(
  { authToken, matchId, shard, entitlementsToken }: Params,
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("X-Riot-Entitlements-JWT", entitlementsToken);
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "matchDetails",
    schema: matchDetails_SCHEMA,
  } as unknown as WithSchema<Options, typeof matchDetails_SCHEMA>;

  return GET(
    `https://pd.${shard}.a.pvp.net/match-details/v1/matches/${matchId}`,
    finalOptions,
  );
}
