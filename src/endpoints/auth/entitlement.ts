import { getDefaultHeaders } from "~/src/core/headers";
import { POST } from "~/src/core/request";
import type {
  EndpointOptions,
  TokenParams,
  WithSchema,
} from "~/src/core/types";
import entitlement_SCHEMA from "~/src/schema/entitlement.schema";

/**
 * Get entitlement for remote requests with a token
 * @link [valapi.techchrism.me](https://valapidocs.techchrism.me/endpoint/entitlement)
 */
export default async function ENTITLEMENT<Options extends EndpointOptions>(
  { authToken }: TokenParams["AuthToken"],
  options?: Options,
) {
  const headers = getDefaultHeaders();
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "entitlement",
    schema: entitlement_SCHEMA,
  } as unknown as WithSchema<Options, typeof entitlement_SCHEMA>;

  return POST(
    "https://entitlements.auth.riotgames.com/api/token/v1",
    undefined,
    finalOptions,
  );
}
