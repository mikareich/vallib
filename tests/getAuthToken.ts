import { COOKIE_REAUTH } from "~/src/endpoints/auth";

export default async function getAuthToken() {
	const proxy = process.env.PROXY_URL;
	const cookiesWithSSID = [`ssid=${process.env.SSID_COOKIE}`];

	const cookieReauth = await COOKIE_REAUTH({
		cookies: cookiesWithSSID,
		proxy,
	});

	return cookieReauth.data.access_token;
}
