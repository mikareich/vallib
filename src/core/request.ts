import { getDefaultHeaders } from "./headers";
import { getDefaultAgent } from "./agent";
import transformData from "./transformData";
import { RequestMethod, RequestOptions } from "./types";
import APIError from "./errors";
import fetch, { BodyInit, RequestInit } from "node-fetch";
import zod from "zod";

/** Creates a request to the api with the given method and body */
async function request<
  Options extends RequestOptions = RequestOptions,
  Data = Options["unsafeSkipValidation"] extends true
    ? string
    : Options["schema"] extends zod.Schema<infer S>
    ? S
    : Record<string, unknown> | string
>(method: RequestMethod, url: string, body?: BodyInit, options?: Options) {
  // set headers: apply default headers and cookies
  const headers = options?.headers || getDefaultHeaders();
  if (options?.cookies) headers.set("Cookie", options.cookies.join("; "));

  // merge the options into the final options object
  const finalOptions = {
    method,
    headers,
    body,
    agent: options?.httpsAgent || getDefaultAgent(options?.proxy),
    signal: options?.timeout ? AbortSignal.timeout(options.timeout) : undefined,
  } as RequestInit;

  const response = await fetch(url, finalOptions);
  const rawData = await response.text();

  let data = rawData;

  if (!options?.unsafeSkipValidation) {
    if (response.status >= 400) throw APIError.REQUEST_ERROR(response.status);

    data = transformData(rawData, response.headers, options?.schema);
  }

  return {
    data: data as Data,
    headers: response.headers,
    status: response.status,
  };
}

export default request;
