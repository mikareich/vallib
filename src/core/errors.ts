export default class APIError extends Error {
  name = "APIError";

  constructor(
    /** The error message */
    message: string,
    /** The status code of the api response */
    public readonly status: number,
  ) {
    super(`${message} - status code ${status}`);
  }

  static VALIDATION_ERROR = () =>
    new APIError(
      "The response was not in the expected format (could not transform data)",
      400,
    );

  static REQUEST_ERROR = (status: number) =>
    new APIError(`The request was unsuccessful`, status);
}
