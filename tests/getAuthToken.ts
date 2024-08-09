type TokenResponse = {
  puuid: string;
  authToken: string;
  entitlementsToken: string;
};

let tokens: TokenResponse | null = null;

/** returns cached auth token */
export default async function getAuthToken() {
  if (tokens) return tokens;

  const response = await fetch(process.env.TOKEN_API as string);
  tokens = (await response.json()) as TokenResponse;

  return tokens;
}
