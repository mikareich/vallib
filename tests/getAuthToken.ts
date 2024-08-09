type TokenResponse = {
  puuid: string;
  authToken: string;
  entitlementsToken: string;
};

/** returns cached auth token */
export default async function getAuthToken() {
  const response = await fetch(process.env.TOKEN_API as string);
  const tokens = await response.json();

  return tokens as TokenResponse;
}
