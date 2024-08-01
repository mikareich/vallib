import { getDefaultHeaders } from '../../core/headers'
import { POST } from '../../core/request'
import type { EndpointOptions, RequestOptions } from '../../core/types'
import entitlement_SCHEMA from '../../schema/entitlement.schema'

type AuthCredentials = {
  authToken: string
}

/**
 * Get entitlement for remote requests with a token
 * @link [valapi.techchrism.me](https://valapidocs.techchrism.me/endpoint/entitlement)
 */
export default async function ENTITLEMENT<
  Options extends RequestOptions = RequestOptions,
>({ authToken }: AuthCredentials, options?: Options) {
  const headers = getDefaultHeaders()
  headers.set('Authorization', `Bearer ${authToken}`)

  const finalOptions = {
    ...options,
    headers,
    prefix: 'entitlement',
    schema: entitlement_SCHEMA,
  } as EndpointOptions<Options, typeof entitlement_SCHEMA>

  return POST(
    'https://entitlements.auth.riotgames.com/api/token/v1',
    undefined,
    finalOptions,
  )
}
