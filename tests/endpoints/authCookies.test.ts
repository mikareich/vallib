import cacheResponse from '../../codegen/cacheResponse'
import AUTH_COOKIES from '../../src/endpoints/auth/authCookies'

describe('Auth Cookies: Prepare cookies for auth request', () => {
  it('should populate the correct cookies', async () => {
    const response = await AUTH_COOKIES({
      proxy: process.env.PROXY_URL,
    })

    cacheResponse(response)

    console.log(response)

    const setCookie = response.headers.get('set-cookie')

    expect(response.status).toEqual(200)

    const tdidCookie = setCookie?.includes('tdid=')
    expect(tdidCookie).toBeTruthy()
  }, 10000)
})
