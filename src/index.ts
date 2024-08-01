import * as agent from "./core/agent";
import * as headers from "./core/headers";
import { default as request } from "./core/request";
import { AUTH_COOKIES, COOKIE_REAUTH } from "./endpoints/auth";

/** Core utils for making requests */
export const core = {
  request,
  headers,
  agent,
};

/** Auth endpoints */
export * as AUTH from "./endpoints/auth";
