type TokenResponse = {
  puuid: string;
  authToken: string;
  entitlementsToken: string;
  idToken: string;
};

let tokens: TokenResponse | null = null;

/** returns cached auth token */
export default async function getTokens() {
  if (tokens) return tokens;

  tokens = {
    puuid: process.env.PUUID as string,
    authToken: process.env.AUTH_TOKEN as string,
    entitlementsToken: process.env.ENTITLEMENTS_TOKEN as string,
    idToken: process.env.ID_TOKEN as string,
  };

  // const response = await fetch(process.env.TOKEN_API as string);
  // tokens = (await response.json()) as TokenResponse;

  return tokens;
}
