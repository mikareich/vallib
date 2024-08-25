import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import type playerMmr_SCHEMA from "~/src/schema/playerMmr.schema";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";
import type { Shard, TokenParams } from "~/src/types/riot.types";

type Params = TokenParams["AuthToken"] &
  TokenParams["EntitlementsToken"] & { shard: Shard; puuid: string };

/**
 * Get a player's MMR and history.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/player-mmr)
 */
export default async function PLAYER_MMR<Options extends EndpointOptions>(
  { authToken, puuid, shard, entitlementsToken }: Params,
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("X-Riot-Entitlements-JWT", entitlementsToken);
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "playerMmr",
    // schema: playerMmr_SCHEMA,
  } as unknown as WithSchema<Options, typeof playerMmr_SCHEMA>;

  return GET(
    `https://pd.${shard}.a.pvp.net/mmr/v1/players/${puuid}`,
    finalOptions,
  );
}
