import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import type {
  EndpointOptions,
  TokenParams,
  WithSchema,
} from "~/src/core/types";
import riotClientConfig_SCHEMA from "~/src/schema/riotClientConfig.schema";

type Params = TokenParams["AuthToken"] & TokenParams["EntitlementToken"];

/**
 * Gets the config file used by the Riot Client. This includes a ton of info, most of it undocumented.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/riot-client-config)
 */
export default async function RIOT_CLIENT_CONFIG<
  Options extends EndpointOptions,
>({ authToken, entitlementToken }: Params, options?: Options) {
  const headers = getDefaultHeaders();
  headers.set("Authorization", `Bearer ${authToken}`);
  headers.set("X-Riot-Entitlements-JWT", entitlementToken);

  const finalOptions = {
    ...options,
    headers,
    prefix: "riotClientConfig",
    schema: riotClientConfig_SCHEMA,
  } as unknown as WithSchema<Options, typeof riotClientConfig_SCHEMA>;

  return GET(
    "https://clientconfig.rpg.riotgames.com/api/v1/config/player?app=Riot%20Client",
    finalOptions,
  );
}
