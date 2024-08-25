import RIOT_GEO from "~/src/endpoints/auth/riotGeo";
import getTokens from "~/tests/getTokens";

describe("Riot Geo: Get the region for a given ID token and auth token. The ID token and auth token can be obtained from Cookie Reauth", () => {
  it("returns the region for a given ID token and auth token", async () => {
    const { authToken, idToken } = await getTokens();

    const response = await RIOT_GEO(
      {
        authToken,
        idToken,
      },
      { proxy: process.env.PROXY_URL },
    );

    expect(response.data);
    expect(response.status).toBe(200);
  });
});
