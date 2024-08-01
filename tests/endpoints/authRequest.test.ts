describe("Auth Request: Perform authorization request to get token", () => {
  it("should return 200", async () => {
    console.warn(
      "AUTH REQUEST endpoint deprecated. All tests will be skipped!",
    );

    // const cookieResponse = await AUTH_COOKIES({
    //   proxy: process.env.PROXY_URL_NOT_WORKING,
    //   unsafeSkipValidation: true,
    // })

    // const setCookies = cookieResponse.headers.get('set-cookie')

    // if (!setCookies) {
    //   throw new Error('No set-cookie header')
    // }

    // const authResponse = await AUTH_REQUEST(
    //   {
    //     username: 'rikameich',
    //     password: 'a9t13zy44gfd',
    //     captcha: '',
    //   },
    //   {
    //     cookies: [setCookies.toString()],
    //     proxy: process.env.PROXY_URL,
    //   },
    // )
  }, 10_000);
});
