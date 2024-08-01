import https from 'https'

import { HttpsProxyAgent } from 'https-proxy-agent'

// Sources:
//  - https://github.com/floxay/python-riot-auth/blob/main/riot_auth/auth.py
//  - https://media.discordapp.net/attachments/1235343442054217770/1235983257867386930/image.png?ex=66705c9c&is=666f0b1c&hm=8dfe7a9798644b41ab9f2d78f1e50c53a1fd1b1cf4a5f35a299a8bef583c7119&=&format=webp&quality=lossless&width=1068&height=1138

const CIPHERS = [
  'TLS_AES_128_GCM_SHA256',
  'TLS_AES_256_GCM_SHA384',
  'TLS_CHACHA20_POLY1305_SHA256',
  'ECDHE-ECDSA-AES128-GCM-SHA256',
  'ECDHE-RSA-AES128-GCM-SHA256',
  'ECDHE-ECDSA-AES256-GCM-SHA384',
  'ECDHE-RSA-AES256-GCM-SHA384',
  'ECDHE-ECDSA-CHACHA20-POLY1305',
  'ECDHE-RSA-CHACHA20-POLY1305',
  'ECDHE-RSA-AES128-SHA',
  'ECDHE-RSA-AES256-SHA',
  'AES128-GCM-SHA256',
  'AES256-GCM-SHA384',
  'AES128-SHA',
  'AES256-SHA',
]

const SIGALGS = [
  'ecdsa_secp256r1_sha256',
  'rsa_pss_rsae_sha256',
  'rsa_pkcs1_sha256',
  'ecdsa_secp384r1_sha384',
  'rsa_pss_rsae_sha384',
  'rsa_pkcs1_sha384',
  'rsa_pss_rsae_sha512',
  'rsa_pkcs1_sha512',
  'rsa_pkcs1_sha1',
]

/** Recommended options for the https agent */
export const DEFAULT_HTTPS_OPTIONS = {
  ciphers: CIPHERS.join(':'),
  sigalgs: SIGALGS.join(':'),
  honorCipherOrder: true,
  minVersion: 'TLSv1.3',
  rejectUnauthorized: false,
  keepAlive: false,
  maxSockets: 1,
  maxCachedSessions: 0,
} satisfies https.AgentOptions

/** Returns agent based on the proxy configuration */
export function getDefaultAgent(proxy?: string): https.Agent {
  // If no proxy is provided, return the default agent
  if (!proxy) return new https.Agent(DEFAULT_HTTPS_OPTIONS)

  // If a proxy is provided, return an agent with the proxy configuration
  return new HttpsProxyAgent(proxy, DEFAULT_HTTPS_OPTIONS)
}
