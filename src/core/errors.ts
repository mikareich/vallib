class APIError extends Error {
  name = "APIError";

  constructor(message: string, public status: number) {
    super(message);
  }

  static VALIDATION_ERROR = () =>
    new APIError(
      "The response was not in the expected format (could not transform data)",
      400
    );

  static REQUEST_ERROR = (status: number) =>
    new APIError("The request was unsuccessful", status);
}

export default APIError;
