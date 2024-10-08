import { RIOT_CLIENT_CONFIG } from "~/src/endpoints/auth";
import getTokens from "~/tests/getTokens";

describe("Riot Client Config: Gets the config file used by the Riot Client.", () => {
  it("should return the Riot Client config", async () => {
    const proxy = process.env.PROXY_URL;
    const { authToken, entitlementsToken } = await getTokens();
    const response = await RIOT_CLIENT_CONFIG(
      { authToken, entitlementsToken },
      { proxy, unsafeSkipValidation: true },
    );
    expect(response.status).toBe(200);
  });
});
