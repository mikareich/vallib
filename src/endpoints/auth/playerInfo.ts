import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import type {
  EndpointOptions,
  RequestOptions,
  WithSchema,
} from "~/src/core/types";
import playerInfo_SCHEMA from "~/src/schema/playerInfo.schema";

type AuthCredentials = {
  authToken: string;
};

/**
 * Get the PUUID and other info from a token
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/player-info)
 */
export default async function PLAYER_INFO<Options extends EndpointOptions>(
  { authToken }: AuthCredentials,
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "playerInfo",
    schema: playerInfo_SCHEMA,
  } as unknown as WithSchema<Options, typeof playerInfo_SCHEMA>;

  return GET("https://auth.riotgames.com/userinfo", finalOptions);
}
