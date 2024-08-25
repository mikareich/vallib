import { FETCH_CONTENT } from "~/src/endpoints/pvp";
import getTokens from "~/tests/getTokens";

const proxy = process.env.PROXY_URL;

describe("Fetch Content: Get a list of seasons, acts, and events", () => {
  const allShards = ["na", "eu", "ap", "kr"] as const;

  test.each(allShards)(
    "should return a list of seasons, acts, and events for %s shard",
    async (shard) => {
      const { authToken, entitlementsToken } = await getTokens();
      const response = await FETCH_CONTENT(
        {
          authToken,
          entitlementsToken,
          shard,
        },
        {
          proxy,
        },
      );

      expect(response.status).toEqual(200);
    },
  );
});
