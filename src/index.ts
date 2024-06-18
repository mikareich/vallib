import { default as request } from "./core/request";

import * as headers from "./core/headers";

import * as agent from "./core/agent";

/** Core utils for making requests */
export const core = {
  request,
  headers,
  agent,
};
