import { COOKIE_REAUTH } from "~/src/endpoints/auth";

// Warning: This test is ignored by jest because it will disable the previous ssid cookie!
// To run this test, remove it from the `watchPathIgnorePatterns` in jest.config.ts

describe("Cookie Reauth: Get a new token using the cookies from a previous authorization request", () => {
  it("should return a new token", async () => {
    const cookiesWithSSID = [`ssid=${process.env.SSID_COOKIE};clid=uw1`];

    const response = await COOKIE_REAUTH({
      cookies: cookiesWithSSID,
      proxy: process.env.PROXY_URL,
    });

    expect(response.status).toBe(200);
  });
});
