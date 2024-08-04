import { COOKIE_REAUTH } from "~/src/endpoints/auth";
import RIOT_GEO from "~/src/endpoints/auth/riotGeo";

describe("Riot Geo: Get the region for a given ID token and auth token. The ID token and auth token can be obtained from Cookie Reauth", () => {
  it("returns the region for a given ID token and auth token", async () => {
    const cookies = [`ssid=${process.env.SSID_COOKIE}`];

    const cookieReauth = await COOKIE_REAUTH({
      cookies,
      proxy: process.env.PROXY_URL,
    });

    const { access_token, id_token } = cookieReauth.data;

    const response = await RIOT_GEO(
      {
        authToken: access_token,
        idToken: id_token,
      },
      { proxy: process.env.PROXY_URL },
    );

    expect(response.data);
    expect(response.status).toBe(200);
  });
});
