import { GET } from '../../core/request'
import { EndpointOptions, RequestOptions } from '../../core/types'
import cookieReauth_SCHEMA from '../../schema/cookieReauth.schema'

export function getAuthTokensFromHref(href: string) {
  const tokens = {} as Record<string, string>
  const url = new URL(href)

  url.hash
    .slice(1, url.hash.length)
    .split('&')
    .forEach((token) => {
      const [_0, key] = token.match(/(.*?)=/) || []
      const [_1, val] = token.match(/=(.*)/) || []

      if (!key || !val) return

      tokens[key] = val
    })

  return JSON.stringify(tokens)
}

/**
 * Get a new token using the cookies from a previous authorization request
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/cookie-reauth)
 */
export default async function COOKIE_REAUTH<
  Options extends RequestOptions = RequestOptions,
>(
  options: Options & {
    /** Cookies from AUTH_COOKIES required */
    cookies: string[]
  },
) {
  const finalOptions = {
    ...options,
    prefix: 'cookieReauth',
    schema: cookieReauth_SCHEMA,
  } as EndpointOptions<Options, typeof cookieReauth_SCHEMA>

  return GET(
    'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid',
    finalOptions,
  )
}
