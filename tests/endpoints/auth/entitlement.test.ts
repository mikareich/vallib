import { ENTITLEMENT } from "~/src/endpoints/auth";
import getAuthToken from "~/tests/getAuthToken";

describe("Entitlement: Get entitlement for remote requests with a token", () => {
  it("should return a valid entitlement token", async () => {
    const proxy = process.env.PROXY_URL;
    const { authToken } = await getAuthToken();

    const response = await ENTITLEMENT({ authToken }, { proxy });

    response.data.entitlements_token;

    expect(response.status).toBe(200);
  });
});
