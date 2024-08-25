import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import accountXp_SCHEMA from "~/src/schema/accountXp.schema";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";
import type { Shard, TokenParams } from "~/src/types/riot.types";

type Params = TokenParams["AuthToken"] &
  TokenParams["EntitlementsToken"] & { shard: Shard; puuid: string };

/**
 * Get the account level, XP, and XP history for the current player.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/account-xp)
 */
export default async function ACCOUNT_XP<Options extends EndpointOptions>(
  { authToken, entitlementsToken, shard, puuid }: Params,
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("X-Riot-Entitlements-JWT", entitlementsToken);
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "accountXp",
    schema: accountXp_SCHEMA,
  } as unknown as WithSchema<Options, typeof accountXp_SCHEMA>;

  return GET(
    `https://pd.${shard}.a.pvp.net/account-xp/v1/players/${puuid}`,
    finalOptions,
  );
}
