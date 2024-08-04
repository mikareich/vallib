import type https from "node:https";

import type { Headers } from "node-fetch";
import type zod from "zod";

/** Different tokens params used by various endpoints */
export type TokenParams = {
  AuthToken: {
    authToken: string;
  };
  IdToken: {
    idToken: string;
  };
  EntitlementToken: {
    entitlementToken: string;
  };
};

/** The final and formatted data returned by the api */
type ResponseData<Options extends RequestOptions> =
  Options["unsafeSkipValidation"] extends true
    ? unknown
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

/** Subtype of `RequestOptions` */
export type EndpointOptions = Omit<RequestOptions, "prefix" | "schema">;

/** Helper function to merge the request options with the prefix and schema */
export type WithSchema<
  Options extends EndpointOptions,
  Schema extends RequestOptions["schema"],
> = Options & { schema: Schema };

/** Helper type to require cookies in the request options */
export type EndpointOptionsWithCookies = EndpointOptions & {
  cookies: string[];
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
