/**
 * Get a list of seasons, acts, and events
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/fetch-content)
 */

import type { WithSchema } from "~/src/types/core.types";

export default async function FETCH_CONTENT<Options extends EndpointOptions>(
  options?: Options,
) {
  const finalOptions = {
    ...options,
    prefix: "fetchContent",
    // schema: fetchContent_SCHEMA,
  } as unknown as WithSchema<Options, typeof fetchContent_SCHEMA>;

  return GET("https://valorant-api.com/v1/content", finalOptions);
}
