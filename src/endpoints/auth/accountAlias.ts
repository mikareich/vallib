import { getDefaultHeaders } from "~/src/core/headers";
import { GET } from "~/src/core/request";
import accountAlias_SCHEMA from "~/src/schema/accountAlias.schema";
import type { EndpointOptions, WithSchema } from "~/src/types/core.types";
import type { TokenParams } from "~/src/types/riot.types";

type Params = TokenParams["AuthToken"] & {
  gameName?: string;
  tagLine?: string;
};

/**
 * Gets the player username and tagline. Undocumented in valapidocs
 * @link [github.com/techchrism/valorant-api-docs](https://github.com/techchrism/valorant-api-docs/issues/67)
 */
export default async function AccountAlias<Options extends EndpointOptions>(
  { authToken, gameName, tagLine }: Params,
  options?: Options,
) {
  const url = new URL("https://api.account.riotgames.com/aliases/v1/aliases");
  if (gameName) url.searchParams.set("gameName", gameName);
  if (tagLine) url.searchParams.set("tagLine", tagLine);

  const headers = getDefaultHeaders();
  headers.set("Authorization", `Bearer ${authToken}`);

  const finalOptions = {
    ...options,
    headers,
    prefix: "accountAlias",
    schema: accountAlias_SCHEMA,
  } as unknown as WithSchema<Options, typeof accountAlias_SCHEMA>;

  return GET(url.href, finalOptions);
}
