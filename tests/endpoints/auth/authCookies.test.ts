import { AUTH_COOKIES } from "~/src/endpoints/auth";

describe("Auth Cookies: Prepare cookies for auth request", () => {
  it("should populate the correct cookies", async () => {
    const response = await AUTH_COOKIES();

    const setCookie = response.headers.get("set-cookie");
    const tdidCookie = setCookie?.includes("tdid=");
    expect(tdidCookie).toBeTruthy();

    expect(response.status).toEqual(200);
  });
});
