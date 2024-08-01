import type { ResponseObject } from "../src/core/types";
import cacheResponse from "./cacheResponse";
import generateSchema from "./generateSchema";

/** caches + generates schema for given response */
export default function updateSchema(response: ResponseObject) {
  const [prefix] = response.tag.split(".");

  cacheResponse(response);
  generateSchema(prefix);
}
