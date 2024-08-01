import { PUT } from "../../core/request";
import type {
  RequestOptions,
  RequestOptionsWithCookies,
} from "../../core/types";

type AuthCredentials = {
  username: string;
  password: string;
  captcha: string;
};

/**
 * Perform authorization request to get token
 * @deprecated
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/auth-request)
 */
export default async function AUTH_REQUEST<
  Options extends RequestOptionsWithCookies = RequestOptionsWithCookies,
>(credentials: AuthCredentials, options?: RequestOptionsWithCookies) {
  const body = {
    type: "auth",
    language: "en_US",
    remember: false,
    riot_identity: credentials,
  };

  const finalOptions = {
    ...options,
    prefix: "authRequest",
  };

  return PUT(
    "https://auth.riotgames.com/api/v1/authorization",
    JSON.stringify(body),
    finalOptions
  );
}
