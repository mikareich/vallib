import { POST } from '../../core/request'
import { RequestOptions } from '../../core/types'
import authCookies_SCHEMA from '../../schema/authCookies.schema'

/**
 * Prepare cookies for auth request
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/auth-cookies)
 */
export default async function AUTH_COOKIES<
  Options extends RequestOptions = RequestOptions,
>(config?: Options) {
  const body = {
    client_id: 'play-valorant-web-prod',
    nonce: '1',
    redirect_uri: 'https://playvalorant.com/opt_in',
    response_type: 'token id_token',
    scope: 'account openid',
  }

  return POST(
    'https://auth.riotgames.com/api/v1/authorization',
    JSON.stringify(body),
    { ...config, prefix: 'authCookies', schema: authCookies_SCHEMA },
  )
}
