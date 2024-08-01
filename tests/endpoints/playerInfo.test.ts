import { PLAYER_INFO } from '../../src/endpoints/auth'

describe('Player Info: Get the PUUID and other info from a token', () => {
  it('should give a full scoped player info response back', async () => {
    const response = await PLAYER_INFO(
      {
        authToken:
          'eyJraWQiOiIxIiwiYWxnIjoiUlMyNTYifQ.eyJwcCI6eyJjIjoiZXUifSwic3ViIjoiMWM1ZGRiYjAtMzI4Ny01ZmNhLWE3NWMtY2E3ZDhiZjQ5YzJlIiwic2NwIjpbImFjY291bnQiLCJvcGVuaWQiXSwiY2xtIjpbImZlZGVyYXRlZF9pZGVudGl0eV9wcm92aWRlcnMiLCJlbWFpbF92ZXJpZmllZCIsIm9wZW5pZCIsInB3IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIiwiYWNjdF9nbnQiLCJsb2NhbGUiLCJhY2N0IiwiYWdlIiwiYWNjb3VudF92ZXJpZmllZCIsImZlZGVyYXRlZF9pZGVudGl0eV9kZXRhaWxzIiwiYWZmaW5pdHkiXSwiZGF0Ijp7InAiOm51bGwsImMiOiJlYzEiLCJsaWQiOiJ3Qld0M0haVzg3SkFJWmw5UU4xLXJRIn0sImlzcyI6Imh0dHBzOi8vYXV0aC5yaW90Z2FtZXMuY29tIiwicGx0Ijp7ImRldiI6InVua25vd24iLCJpZCI6IndlYiJ9LCJleHAiOjE3MjI0OTc3NTUsImlhdCI6MTcyMjQ5NDE1NSwianRpIjoiYm5rRTR3VVFlNkkiLCJjaWQiOiJwbGF5LXZhbG9yYW50LXdlYi1wcm9kIn0.foOC1noLp7hjspR5Fd6Iv7T20inqvXBR8xUDYhm1pN5U3jvyuGPr5a74NBRene2s7UuUzwxKTc11Cy3PAA9fXYycAgfosMErs5x3fm3m6J25GdiyoxjAUtaVNBEXZcP-rNqFBH3xfUP5LUDTuO7q75dYoH2cw-WAZAP1_T7SgrrFFHQ7dd729zv7E_nJD8BO84SP6EQ9j5TnUFP7MDhTZGEoRmKBQDXw3kVYtVPrQ2fvYzjw-xjIHWvppTl7SlkYDxns_lCdoKqtl7isdhGryLZoSBJZ-cx-e8PUUvfVspQV7tRqsm1a0x473eGeSGebNsrz-cilqsv02sVZLpUNmQ',
      },
      {
        proxy: process.env.PROXY_URL,
      },
    )

    expect(response.status).toBe(200)
    expect(response.data.acct).toBeDefined()
  })
})
