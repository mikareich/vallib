import { COOKIE_REAUTH } from "~/src/endpoints/auth";

describe("Cookie Reauth: Get a new token using the cookies from a previous authorization request", () => {
  it("should return a new token", async () => {
    const cookiesWithSSID = [`ssid=${process.env.SSID_COOKIE}`];

    console.warn(
      "Skipping test because it will invalidate the current token used for testing",
      "You have to explicitly enable this test to run by removing this line",
    );

    const response = await COOKIE_REAUTH({
      cookies: cookiesWithSSID,
      proxy: process.env.PROXY_URL,
    });

    // expect(response.status).toBe(200);
  });
});
