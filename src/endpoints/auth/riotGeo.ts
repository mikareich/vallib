import { getDefaultHeaders } from "~/src/core/headers";
import { PUT } from "~/src/core/request";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";

import type { TokenParams } from "~/src/types/riot.types";
import riotGeo_SCHEMA from "~/src/schema/riotGeo.schema";

/**
 * Get the region for a given ID token and auth token. The ID token and auth token can be obtained from Cookie Reauth.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/riot-geo)
 */
export default async function RIOT_GEO<Options extends EndpointOptions>(
  { authToken, idToken }: TokenParams["AuthToken"] & TokenParams["IdToken"],
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("Authorization", `Bearer ${authToken}`);

  const body = {
    id_token: idToken,
  };

  const finalOptions = {
    ...options,
    headers,
    prefix: "riotGeo",
    schema: riotGeo_SCHEMA,
  } as unknown as WithSchema<Options, typeof riotGeo_SCHEMA>;

  return PUT(
    "https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant",
    JSON.stringify(body),
    finalOptions,
  );
}
