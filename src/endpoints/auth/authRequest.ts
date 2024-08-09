import { PUT } from "~/src/core/request";
import type { EndpointOptionsWithCookies } from "~/src/types/core.types";

type RiotIdentity = {
  username: string;
  password: string;
  captcha: string;
};

/**
 * Perform authorization request to get token.
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
