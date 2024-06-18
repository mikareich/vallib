import { Headers } from 'node-fetch'

/** The default user agent for the api */
export const RIOT_USER_AGENT =
  'RiotClient/87.0.2.1547.3551 rso-auth (Windows;10;;Professional, x64)'

/** The version of the riot client */
export const RIOT_CLIENT_VERSION = '87.0.2.1547.3551'

/** The platform of the riot client */
export const RIOT_CLIENT_PLATFORM =
  'ewogICAgInBsYXRmb3JtVHlwZSI6ICJQQyIsCiAgICAicGxhdGZvcm1PUyI6ICJXaW5kb3dzIiwKICAgICJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwKICAgICJwbGF0Zm9ybUNoaXBzZXQiOiAiVW5rbm93biIKfQ=='

/** Returns default headers necessary for the api.
 * Attention: the content-type is set to 'application/json'
 * which may be incorrect for certain requests */
export function getDefaultHeaders(additionalHeaders?: Headers) {
  const headers = new Headers()

  headers.set('User-Agent', RIOT_USER_AGENT)
  headers.set('Content-Type', 'application/json')

  if (additionalHeaders) {
    additionalHeaders.forEach((value, key) => {
      headers.set(key, value)
    })
  }

  return headers
}
