import type { ZodError } from "zod";

export default class APIError extends Error {
  name = "APIError";

  constructor(
    /** The error message */
    message: string,
    /** The status code of the api response */
    public readonly status: number,
    /** The endpoint name */
    endpoint?: string,
  ) {
    super(
      `${endpoint ? `[${endpoint}] ` : ""}${message} -- status code ${status}`,
    );
  }

  static VALIDATION_ERROR = (endpoint?: string) =>
    new APIError("The response was not in the expected format", 400, endpoint);

  static ZOD_ERROR = (error: ZodError, endpoint?: string) => {
    const [issue] = error.issues;
    const path = issue.path.join(".");

    return new APIError(
      `The response was not in the exprected format: Error at path \`${path}\`: ${issue.message}`,
      400,
      endpoint,
    );
  };

  static REQUEST_ERROR = (status: number, endpoint?: string) =>
    new APIError("The request was unsuccessful", status, endpoint);
}
