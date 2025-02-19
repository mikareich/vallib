import { ACCOUNT_ALIAS } from "~/src/endpoints/auth";
import getTokens from "~/tests/getTokens";

describe("Account Alias: Gets the player username and tagline", () => {
  it("should give me a list of all authenticated account aliases", async () => {
    const { authToken } = await getTokens();

    const response = await ACCOUNT_ALIAS({
      authToken,
      gameName: "rikameich",
      tagLine: "205",
    });

    expect(response.status).toBe(200);
  });
});
