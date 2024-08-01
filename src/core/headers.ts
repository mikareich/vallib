import { Headers } from "node-fetch";

import {
	RIOT_CLIENT_PLATFORM,
	RIOT_CLIENT_VERSION,
	RIOT_USER_AGENT,
} from "./version";

/** Returns default headers necessary for the api.
 * Attention: the content-type is set to 'application/json'
 * which may be incorrect for certain requests */
export function getDefaultHeaders(additionalHeaders?: Headers) {
	const headers = new Headers();

	headers.set("User-Agent", RIOT_USER_AGENT);
	headers.set("Content-Type", "application/json");
	headers.set("Cache-Control", "no-cache");
	headers.set("Accept", "application/json");

	headers.set("X-Riot-ClientPlatform", RIOT_CLIENT_PLATFORM);
	headers.set("X-Riot-ClientVersion", RIOT_CLIENT_VERSION);

	headers.set("Accept-Encoding", "gzip, deflate, br");

	if (additionalHeaders) {
		additionalHeaders.forEach((value, key) => {
			headers.set(key, value);
		});
	}

	return headers;
}
