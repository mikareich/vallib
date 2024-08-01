import { POST } from '../../core/request'
import type { EndpointOptions, RequestOptions } from '../../core/types'
import authCookies_SCHEMA from '../../schema/authCookies.schema'

/**
 * Prepare cookies for auth request
 * @deprecated
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/auth-cookies)
 */
export default async function AUTH_COOKIES<
  Options extends RequestOptions = RequestOptions,
>(options?: Options) {
  const body = {
    acr_values: '',
    claims: '',
    client_id: 'riot-client',
    code_challenge: '',
    code_challenge_method: '',
    nonce: '1',
    redirect_uri: 'http://localhost/redirect',
    response_type: 'token id_token',
    scope: 'openid link ban lol_region lol summoner offline_access',
  }

  const finalOptions = {
    ...options,
    prefix: 'authCookies',
    schema: authCookies_SCHEMA,
  } as EndpointOptions<Options, typeof authCookies_SCHEMA>

  return POST(
    'https://auth.riotgames.com/api/v1/authorization',
    JSON.stringify(body),
    finalOptions,
  )
}
