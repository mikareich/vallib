import { POST } from "~/src/core/request";
import authCookies_SCHEMA from "~/src/schema/authCookies.schema";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";

/**
 * Prepare cookies for auth request.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/auth-cookies)
 */
export default async function AUTH_COOKIES<Options extends EndpointOptions>(
  options?: Options,
) {
  const body = {
    client_id: "play-valorant-web-prod",
    nonce: "1",
    redirect_uri: "https://playvalorant.com/opt_in",
    response_type: "token id_token",
    scope: "account openid",
  };

  const finalOptions = {
    ...options,
    prefix: "authCookies",
    schema: authCookies_SCHEMA,
  } as unknown as WithSchema<Options, typeof authCookies_SCHEMA>;

  return POST(
    "https://auth.riotgames.com/api/v1/authorization",
    JSON.stringify(body),
    finalOptions,
  );
}
