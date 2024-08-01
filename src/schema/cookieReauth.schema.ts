// automatically generated schema, 2024-08-01T06:17:30.629Z

import { z } from "zod";

const cookieReauth_SCHEMA = z.object({
  access_token: z.string(),
  scope: z.string(),
  iss: z.string(),
  id_token: z.string(),
  token_type: z.string(),
  session_state: z.string(),
  expires_in: z.string(),
});

export default cookieReauth_SCHEMA;
