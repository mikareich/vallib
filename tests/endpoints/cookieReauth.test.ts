import { COOKIE_REAUTH } from "../../src/endpoints/auth";

describe("Cookie Reauth: Get a new token using the cookies from a previous authorization request", () => {
  it("should return a new token", async () => {
    const cookiesWithSSID = [`ssid=${process.env.SSID_COOKIE}`];

    const response = await COOKIE_REAUTH({
      cookies: cookiesWithSSID,
      proxy: process.env.PROXY_URL,
    });

    expect(response.status).toBe(200);
  });
});
