import https from "node:https";
import { Headers } from "node-fetch";
import zod, { z } from "zod";

/** Credentials for the proxy. */
export type ProxyConfig = {
  protocol: string;
  host: string;
  port: number;
  username: string;
  password: string;
};

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
  schema?: zod.Schema<any>;
};

/** The method of the request */
export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** The response of the request */
export type ResponseObject<options extends RequestOptions = RequestOptions> = {
  /** The data returned by the api. */
  data: string | options["schema"] extends zod.Schema<infer S> ? S : never;
  headers: Headers;
  status: number;
};
