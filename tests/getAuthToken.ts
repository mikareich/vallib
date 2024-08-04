import path from "node:path";
import fs from "node:fs";
import { COOKIE_REAUTH } from "~/src/endpoints/auth";

const authFile = path.join(process.cwd(), "auth.json");

const getAuthFromFile = () => {
  const buffer = fs.readFileSync(authFile);
  const content = buffer.toString();

  const { access_token: authToken } = JSON.parse(content);

  return authToken as string;
};

/** returns cached auth token */
export default async function getAuthToken() {
  if (fs.existsSync(authFile)) return getAuthFromFile();

  const proxy = process.env.PROXY_URL;
  const cookiesWithSSID = [`ssid=${process.env.SSID_COOKIE}`];

  const cookieReauth = await COOKIE_REAUTH({
    cookies: cookiesWithSSID,
    proxy,
  });

  fs.writeFileSync(authFile, JSON.stringify(cookieReauth.data));

  return cookieReauth.data.access_token;
}
