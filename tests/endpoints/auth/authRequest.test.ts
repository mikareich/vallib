// Warning: The new auth flow (captcha) is not yet supported.
//          This test will fail and is therefore disabled.

describe("Auth Request: Perform authorization request to get token", () => {
  it("should return 200", async () => {
    console.warn(
      "Warning: The new auth flow (captcha) is not yet supported. This test will fail and is therefore disabled.",
    );
    // const cookieResponse = await AUTH_COOKIES();
    // const setCookies = cookieResponse.headers.get("set-cookie");
    // if (!setCookies) {
    //   throw new Error("No set-cookie header");
    // }
    // const authResponse = await AUTH_REQUEST(
    //   {
    //     username: process.env.RIOT_EXAMPLE_USERNAME as string,
    //     password: process.env.RIOT_EXAMPLE_PASSWORD as string,
    //     captcha: "",
    //   },
    //   {
    //     cookies: [setCookies.toString()],
    //     proxy: process.env.PROXY_URL,
    //   },
    // );
    // expect(authResponse.status).toEqual(200);
    //
  }, 10_000);
});
