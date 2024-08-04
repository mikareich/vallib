import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import type {
  EndpointOptions,
  TokenParams,
  WithSchema,
} from "~/src/core/types";
import pasToken_SCHEMA from "~/src/schema/pasToken.schema";

/**
 * Get a PAS token using the auth token.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/pas-token)
 */

export default async function PAS_TOKEN<Options extends EndpointOptions>(
  { authToken }: TokenParams["AuthToken"],
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "pasToken",
    schema: pasToken_SCHEMA,
  } as unknown as WithSchema<Options, typeof pasToken_SCHEMA>;

  return GET(
    "https://riot-geo.pas.si.riotgames.com/pas/v1/service/chat",
    finalOptions,
  );
}
