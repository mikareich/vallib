import type { Headers } from "node-fetch";

import { ZodError, type z } from "zod";
import APIError from "./errors";

const isParseable = (data: string) => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

/** Transforms the data to the correct type */
export default function transformData(
  data: string,
  headers: Headers,
  schema?: z.ZodSchema,
  prefix?: string,
) {
  let parsedData = data;
  const isJSON =
    headers.get("content-type")?.includes("application/json") ||
    isParseable(data);

  try {
    if (isJSON) parsedData = JSON.parse(data);
    if (schema) parsedData = schema.parse(parsedData);
  } catch (error) {
    if (error instanceof ZodError) throw APIError.ZOD_ERROR(error, prefix);
    throw APIError.VALIDATION_ERROR(prefix);
  }

  return parsedData;
}
