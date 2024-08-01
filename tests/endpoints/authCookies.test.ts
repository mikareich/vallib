import { AUTH_COOKIES } from "~/src/endpoints/auth";

describe("Auth Cookies: Prepare cookies for auth request", () => {
  it("should populate the correct cookies", async () => {
    const response = await AUTH_COOKIES({
      // proxy: process.env.PROXY_URL,
      unsafeSkipValidation: true,
    });

    const setCookie = response.headers.get("set-cookie");
    expect(response.status).toEqual(200);

    const tdidCookie = setCookie?.includes("tdid=");
    expect(tdidCookie).toBeTruthy();
  }, 10000);

  // it('runs many times', async () => {
  //   const NUM_REQUESTS = 10

  //   let success = 0

  //   await Promise.all(
  //     Array.from({ length: NUM_REQUESTS }, async () => {
  //       try {
  //         await AUTH_COOKIES({
  //           proxy: process.env.PROXY_URL,
  //         })

  //         success++
  //       } catch (_error) {
  //         // ignore
  //       }
  //     }),
  //   )

  //   console.log(`Success rate: ${success}/${NUM_REQUESTS}`)
  //   expect(success).toBe(NUM_REQUESTS)
  // }, 10_000)
});
