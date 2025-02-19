import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import type { EndpointOptions } from "~/src/types/core.types";
import type { Shard, TokenParams } from "~/src/types/riot.types";

type Params = TokenParams["AuthToken"] &
  TokenParams["EntitlementsToken"] & {
    shard: Shard;
    puuid: string;
    startIndex?: number;
    endIndex?: number;
    queue?: string;
  };

/**
 * Get recent games and how they changed ranking
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/competitive-updates)
 */
export default async function COMPETITIVE_UPDATES<
  Options extends EndpointOptions,
>(
  {
    authToken,
    entitlementsToken,
    shard,
    puuid,
    startIndex,
    endIndex,
    queue,
  }: Params,
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("X-Riot-Entitlements-JWT", entitlementsToken);
  headers.set("Authorization", `Bearer ${authToken}`);

  const url = new URL(
    `https://pd.${shard}.a.pvp.net/mmr/v1/players/${puuid}/competitiveupdates`,
  );

  if (startIndex) url.searchParams.set("startIndex", String(startIndex));
  if (endIndex) url.searchParams.set("endIndex", String(endIndex));
  if (queue) url.searchParams.set("queue", queue);
  console.log(url);
  const finalOptions = {
    ...options,
    headers,
    prefix: "competitiveUpdates",
    // schema: accountXp_SCHEMA,
  } as unknown as any;

  return GET(url.href, finalOptions);
}
