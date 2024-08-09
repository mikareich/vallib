import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import { RIOT_CLIENT_PLATFORM, RIOT_CLIENT_VERSION } from "~/src/core/version";
import fetchContent_SCHEMA from "~/src/schema/fetchContent.schema";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";
import type { Shard, TokenParams } from "~/src/types/riot.types";

type Params = TokenParams["AuthToken"] &
  TokenParams["EntitlementsToken"] & { shard: Exclude<Shard, "pbe"> };

/**
 * Get a list of seasons, acts, and events
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/fetch-content)
 * @description `pbe` as a shard is not supported by this endpoint.
 */
export default async function FETCH_CONTENT<Options extends EndpointOptions>(
  { authToken, entitlementsToken, shard }: Params,
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("X-Riot-ClientPlatform", RIOT_CLIENT_PLATFORM);
  headers.set("X-Riot-ClientVersion", RIOT_CLIENT_VERSION);
  headers.set("X-Riot-Entitlements-JWT", entitlementsToken);
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "fetchContent",
    schema: fetchContent_SCHEMA,
  } as unknown as WithSchema<Options, typeof fetchContent_SCHEMA>;

  return GET(
    `https://shared.${shard}.a.pvp.net/content-service/v3/content`,
    finalOptions,
  );
}
