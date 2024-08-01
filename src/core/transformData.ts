import type { Headers } from "node-fetch";
import { z } from "zod";

import APIError from "./errors";

/** Transforms the data to the correct type */
export default function transformData(
  data: string,
  headers: Headers,
  schema?: z.ZodSchema,
) {
  let parsedData: any;
  const isJSON = headers.get("content-type")?.includes("application/json");

  try {
    if (isJSON) parsedData = JSON.parse(data);
    if (schema) parsedData = schema.parse(parsedData);
  } catch {
    throw APIError.VALIDATION_ERROR();
  }

  return parsedData;
}
