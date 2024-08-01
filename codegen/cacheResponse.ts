import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import type { ResponseObject } from "../src/core/types";

export const PATH_TO_CACHE = path.resolve(process.cwd(), ".cache");

/** Caches the response to the file system */
export default function cacheResponse(response: ResponseObject) {
  // encode data to base64
  const data = Buffer.from(JSON.stringify(response.data)).toString("base64");

  // generate cache folder
  mkdirSync(PATH_TO_CACHE, { recursive: true });

  // write response to cache
  const cachePath = path.resolve(PATH_TO_CACHE, response.tag);

  // write response to cache
  writeFileSync(cachePath, data);
}
