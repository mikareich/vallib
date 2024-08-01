import { PUT } from "~/src/core/request";
import type { RequestOptions } from "~/src/core/types";

type MultiFactorAuth = {
  otp: string;
  rememberDevice?: boolean;
};

/**
 * Submits a multi-factor authentication code for login.
 * Since it's part of the deprecated auth flow, it's recommended to
 * not use this endpoint.
 * @link [valapidocs.techchrism.me](https://valapidocs.techchrism.me/endpoint/multi-factor-authentication)
 */
export default async function MULTI_FACTOR_AUTHENTICATION<
  Options extends RequestOptions = RequestOptions,
>(multifactor: MultiFactorAuth, options: Options) {
  const body = {
    type: "multifactor",
    multifactor,
  };

  return PUT(
    "https://auth.riotgames.com/api/v1/authorization",
    JSON.stringify(body),
    options,
  );
}
