import { RIOT_CLIENT_CONFIG } from "~/src/endpoints/auth";
import getAuthToken from "../getAuthToken";

describe("Riot Client Config: Gets the config file used by the Riot Client.", () => {
  it("should return the Riot Client config", async () => {
    const proxy = process.env.PROXY_URL;

    const { authToken, entitlementsToken } = await getAuthToken();

    const response = await RIOT_CLIENT_CONFIG(
      { authToken, entitlementsToken },
      { proxy },
    );

    expect(response.status).toBe(200);
  });
});
