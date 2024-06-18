import { createHash } from 'crypto'

import { Headers, BodyInit } from 'node-fetch'

import { RequestMethod } from './types'

type RequestOptions = {
  headers: Headers
  url: string
  body: BodyInit | undefined
  method: RequestMethod
}

/** Generates a unique tag for the request */
export default function generateTag(
  requestOptions: RequestOptions,
  responseData: string,
  prefix: string = '',
) {
  // hash the public request data
  const prefixTag = Buffer.from(prefix).toString('base64')

  // hash the private request data
  const privateRequestHash = createHash('shake256', {
    outputLength: 4,
  })
    .update(JSON.stringify(requestOptions))
    .digest('hex')

  // hash the response data
  const responseHash = createHash('shake256', {
    outputLength: 4,
  })
    .update(responseData)
    .digest('hex')

  // combine the two hashes
  return `${prefix ? `${prefixTag}.` : ''}${privateRequestHash}.${responseHash}`
}
