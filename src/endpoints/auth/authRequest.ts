import { PUT } from "~/src/core/request";
import type { EndpointOptionsWithCookies } from "~/src/core/types";

type RiotIdentity = {
  username: string;
  password: string;
  captcha: string;
};

/**
 * Perform authorization request to get token.
 * Since it's part of the deprecated auth flow, it's recommended to
 * not use this endpoint.
 * @deprecated
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/auth-request)
 */
export default async function AUTH_REQUEST<
  Options extends EndpointOptionsWithCookies,
>(riot_identity: RiotIdentity, options?: Options) {
  const body = {
    type: "auth",
    language: "en_US",
    remember: false,
    riot_identity,
  };

  const finalOptions = {
    ...options,
    prefix: "authRequest",
  };

  return PUT(
    "https://auth.riotgames.com/api/v1/authorization",
    JSON.stringify(body),
    finalOptions,
  );
}
