import { createHash } from "node:crypto";

import type { Headers, BodyInit } from "node-fetch";

import type { RequestMethod } from "./types";

type RequestOptions = {
	headers: Headers;
	url: string;
	body: BodyInit | undefined;
	method: RequestMethod;
};

/** Generates a unique tag for the request */
export default function generateTag(
	requestOptions: RequestOptions,
	responseData: string,
	prefix: string = "",
) {
	// hash the private request data
	const privateRequestHash = createHash("shake256", {
		outputLength: 4,
	})
		.update(JSON.stringify(requestOptions))
		.digest("hex");

	// hash the response data
	const responseHash = createHash("shake256", {
		outputLength: 4,
	})
		.update(responseData)
		.digest("hex");

	// combine the two hashes
	return `${prefix ? `${prefix}.` : ""}${privateRequestHash}.${responseHash}`;
}
