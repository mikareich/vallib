import { PAS_TOKEN } from "~/src/endpoints/auth";
import getAuthToken from "../getAuthToken";

describe("Pas Token: Get a PAS token using the auth token.", () => {
  it("should return a PAS token", async () => {
    const authToken = await getAuthToken();

    const response = await PAS_TOKEN(
      {
        authToken,
      },
      {
        proxy: process.env.PROXY_URL,
      },
    );

    expect(response.status).toBe(200);
  });
});
