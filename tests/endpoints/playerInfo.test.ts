import cacheResponse from "../../codegen/cacheResponse";
import generateSchema from "../../codegen/generateSchema";
import updateSchema from "../../codegen/updateSchema";
import { COOKIE_REAUTH, PLAYER_INFO } from "../../src/endpoints/auth";
import getAuthToken from "../getAuthToken";

describe("Player Info: Get the PUUID and other info from a token", () => {
  it("should give a full scoped player info response back", async () => {
    const proxy = process.env.PROXY_URL;
    const authToken = await getAuthToken();

    const response = await PLAYER_INFO({ authToken }, { proxy });

    expect(response.status).toBe(200);
    expect(response.data.acct).toBeDefined();
  });
});
