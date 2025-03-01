import { GET } from "~/src/core/request";
import type {
  EndpointOptionsWithCookies,
  WithSchema,
} from "~/src/types/core.types";
import cookieReauth_SCHEMA from "~/src/schema/cookieReauth.schema";

/** Returns all tokens from a auth redirect url */
export function getAuthTokensFromHref(href?: string) {
  const tokens = {} as Record<string, string>;

  if (!href) return null;
  const url = new URL(href);

  for (const token of url.hash.slice(1, url.hash.length).split("&")) {
    const [_0, key] = token.match(/(.*?)=/) || [];
    const [_1, val] = token.match(/=(.*)/) || [];

    if (!key || !val) return null;

    tokens[key] = val;
  }

  return JSON.stringify(tokens);
}

/**
 * Get a new token using the cookies from a previous authorization request (ssid token and clid=uw1)
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/cookie-reauth)
 */
export default async function COOKIE_REAUTH<
  Options extends EndpointOptionsWithCookies,
>(options: Options) {
  const finalOptions = {
    ...options,
    prefix: "cookieReauth",
    schema: cookieReauth_SCHEMA,
  } as WithSchema<Options, typeof cookieReauth_SCHEMA>;

  return GET(
    "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid",
    finalOptions,
  );
}
