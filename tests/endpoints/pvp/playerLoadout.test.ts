import PLAYER_LOADOUT from "~/src/endpoints/pvp/playerLoadout";
import getTokens from "~/tests/getTokens";

describe("Player Loadout: Get the player's current loadout. Only works for your own PUUID.", () => {
  it("should return the player's current loadout", async () => {
    const { puuid, authToken, entitlementsToken } = await getTokens();
    const response = await PLAYER_LOADOUT(
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
