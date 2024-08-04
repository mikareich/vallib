import fetch from "node-fetch";
import type { BodyInit, RequestInit } from "node-fetch";

import { getAuthTokensFromHref } from "~/src/endpoints/auth/cookieReauth";

import { getDefaultAgent } from "./agent";
import APIError from "./errors";
import generateTag from "./generateTag";
import { getDefaultHeaders } from "./headers";
import transformData from "./transformData";
import type { RequestMethod, RequestOptions, ResponseObject } from "./types";

/** Creates a request to the api with the given method and body */
export default async function request<Options extends RequestOptions>(
  method: RequestMethod,
  url: string,
  body?: BodyInit,
  options?: Options,
) {
  const isCookieReauth = options?.prefix === "cookieReauth";

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
    follow: isCookieReauth ? 1 : undefined,
    redirect: "manual",
  } as RequestInit;

  const response = await fetch(url, finalOptions);

  let rawData: string;

  //
  if (isCookieReauth) {
    const href = response.headers.get("location");

    response.headers.set("Content-Type", "application/json");
    rawData = getAuthTokensFromHref(href as string) as string;

    if (!href || !rawData) throw APIError.REQUEST_ERROR(400, options?.prefix);
  } else {
    rawData = await response.text();
  }

  let data = rawData;

  if (!options?.unsafeSkipValidation) {
    if (response.status >= 400)
      throw APIError.REQUEST_ERROR(response.status, options?.prefix);

    data = transformData(
      rawData,
      response.headers,
      options?.schema,
      options?.prefix,
    );
  }

  const tag = generateTag(
    {
      headers,
      url,
      body: finalOptions.body,
      method,
    },
    rawData,
    options?.prefix || "",
  );

  return {
    /** The formatted data returned by the api */
    data,
    /** The headers returned by the api */
    headers: response.headers,
    /** The status code returned by the api */
    status: isCookieReauth ? 200 : response.status,
    /** Request tag */
    tag,
  } as ResponseObject<Options>;
}

/** Sends a GET request to the specified url */
export const GET = <Options extends RequestOptions>(
  url: string,
  options?: Options,
) => request("GET", url, undefined, options);

/** Sends a POST request to the specified url */
export const POST = <Options extends RequestOptions>(
  url: string,
  body?: BodyInit,
  options?: Options,
) => request("POST", url, body, options);

/** Sends a PUT request to the specified url */
export const PUT = <Options extends RequestOptions>(
  url: string,
  body?: BodyInit,
  options?: Options,
) => request("PUT", url, body, options);

/** Sends a PATCH request to the specified url */
export const PATCH = <Options extends RequestOptions>(
  url: string,
  body?: BodyInit,
  options?: Options,
) => request("PATCH", url, body, options);

/** Sends a DELETE request to the specified url */
export const DELETE = <Options extends RequestOptions>(
  url: string,
  options?: Options,
) => request("DELETE", url, undefined, options);
