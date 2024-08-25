import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import playerLoadout_SCHEMA from "~/src/schema/playerLoadout.schema";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";
import type { Shard, TokenParams } from "~/src/types/riot.types";

type Params = TokenParams["AuthToken"] &
  TokenParams["EntitlementsToken"] & { shard: Shard; puuid: string };

/**
 * Get the player's current loadout. Only works for your own PUUID.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/player-loadout)
 */
export default async function PLAYER_LOADOUT<Options extends EndpointOptions>(
  { authToken, puuid, shard, entitlementsToken }: Params,
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("X-Riot-Entitlements-JWT", entitlementsToken);
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "playerLoadout",
    schema: playerLoadout_SCHEMA,
  } as unknown as WithSchema<Options, typeof playerLoadout_SCHEMA>;

  return GET(
    `https://pd.${shard}.a.pvp.net/personalization/v2/players/${puuid}/playerloadout`,
    finalOptions,
  );
}
