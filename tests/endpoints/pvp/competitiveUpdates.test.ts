import { COMPETITIVE_UPDATES } from "~/src/endpoints/pvp";
import getTokens from "~/tests/getTokens";

describe("Competitive Updates: Get recent games and how they changed ranking.", () => {
  it("should return a list of the latest matches", async () => {
    const { puuid, authToken, entitlementsToken } = await getTokens();

    const response = await COMPETITIVE_UPDATES({
      puuid,
      authToken,
      entitlementsToken,
      shard: "eu",
      queue: "competitive",
    });

    expect(response.status).toBe(200);
  });
});
