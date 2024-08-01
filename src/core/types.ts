import type https from "node:https";

import type { Headers } from "node-fetch";
import type zod from "zod";

/** The final and formatted data returned by the api */
type ResponseData<Options extends RequestOptions = RequestOptions> =
  Options["unsafeSkipValidation"] extends true
    ? string
    : Options["schema"] extends zod.Schema<infer S>
      ? S
      : Record<string, string> | string;

/** Optional configuration for the request */
export type RequestOptions = {
  /** Additional cookies you want to send to the api. Necessary for authentication */
  cookies?: string[];
  /** Additional headers you want to send to the api. */
  headers?: Headers;
  /** Optional proxy credentials. */
  proxy?: string;
  /** Custom https agent to use for the request. */
  httpsAgent?: https.Agent;
  /** Whether to skip validation of the response data. */
  unsafeSkipValidation?: boolean;
  /** The timeout for the request in milliseconds. */
  timeout?: number;
  /** Expected schema for the response data. */
  schema?: zod.Schema;
  /** Prefix for the request tag */
  prefix?: string;
};

export type RequestOptionsWithCookies = Omit<RequestOptions, "cookies"> & {
  cookies: string[];
};

/** Helper type to merge the options into the final options object */
export type EndpointOptions<
  Options extends RequestOptions,
  Schema extends RequestOptions["schema"],
> = Options & {
  schema: Schema;
};

/** The method of the request */
export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** The response of the request */
export type ResponseObject<Options extends RequestOptions = RequestOptions> = {
  /** The final and formatted data returned by the api */
  data: ResponseData<Options>;
  /** The headers returned by the api */
  headers: Headers;
  /** The status code returned by the api */
  status: number;
  /** Request tag */
  tag: string;
};
