import ACCOUNT_XP from "~/src/endpoints/pvp/accountXp";
import getTokens from "~/tests/getTokens";

describe("Account XP: Get the account XP", () => {
  it("should return the account level, XP, and XP history for the current player", async () => {
    const { puuid, authToken, entitlementsToken } = await getTokens();
    const response = await ACCOUNT_XP(
      {
        authToken,
        entitlementsToken,
        shard: "eu",
        puuid,
      },
      {
        proxy: process.env.PROXY_URL,
      },
    );

    expect(response.status).toBe(200);
  });
});
