import type { Headers } from "node-fetch";
import { z } from "zod";
import APIError from "./errors";

/** Transforms the data to the correct type */
function transformData(data: string, headers: Headers, schema?: z.ZodSchema) {
  try {
    if (schema) {
      return schema.parse(data);
    }

    if (headers.get("content-type")?.includes("application/json")) {
      return JSON.parse(data);
    }

    return data;
  } catch (error) {
    throw APIError.VALIDATION_ERROR();
  }
}

export default transformData;
