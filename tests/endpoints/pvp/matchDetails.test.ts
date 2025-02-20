import { MATCH_DETAILS } from "~/src/endpoints/pvp";
import getTokens from "~/tests/getTokens";

describe("Match Details: Get the details of a match after it ends.", () => {
  it("should return the match", async () => {
    const { authToken, entitlementsToken } = await getTokens();

    const response = await MATCH_DETAILS({
      matchId: "83f85930-b2b0-47c8-890d-930b90d93b24",
      authToken,
      entitlementsToken,
      shard: "eu",
    });

    expect(response.status).toBe(200);
  });
});
