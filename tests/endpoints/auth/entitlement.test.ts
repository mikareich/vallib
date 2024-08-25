import { ENTITLEMENT } from "~/src/endpoints/auth";
import getTokens from "~/tests/getTokens";

describe("Entitlement: Get entitlement for remote requests with a token", () => {
  it("should return a valid entitlement token", async () => {
    const proxy = process.env.PROXY_URL;
    const { authToken } = await getTokens();

    const response = await ENTITLEMENT({ authToken }, { proxy });

    expect(response.status).toBe(200);
  });
});
