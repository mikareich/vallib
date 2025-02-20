import * as agent from "./core/agent";
import * as headers from "./core/headers";
import { default as request } from "./core/request";

/** Core utils for making requests */
export const core = {
  request,
  headers,
  agent,
};

/** Endpoint types */
export * as types from "./types/endpoint.types";

/** Auth endpoints */
export * as AUTH from "./endpoints/auth";

/** PVP endpoints */
export * as PVP from "./endpoints/pvp";
