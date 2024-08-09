![Banner](https://github.com/mikareich/vallib/blob/main/banner.png)

<div align="center">

<img valign="top" src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=for-the-badge" />

<img valign="top" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge" />

<img valign="top" src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=for-the-badge" />

<img valign="top" src="https://img.shields.io/badge/Riot%20Games-EB0029?logo=riotgames&logoColor=fff&style=for-the-badge" />

</div>

# vallib

**vallib** is a TypeScript API wrapper for the [unofficial Valorant API](https://valapidocs.techchrism.me/). It is designed to be consistent and easy to configure, allowing for customizations like adding a proxy.

**🛡 Type Safety**: Written in TypeScript, vallib provides type definitions for every endpoint. Additionally, each API response is validated against a predefined schema, ensuring consistency and reliability.

**♻ Adaptable**: vallib is built for flexibility. You can easily configure the client to use a proxy, skip validation steps, adjust the HTTP client settings, or simply use the default configurations.

## Installation and Usage

Due to CORS limitations, vallib is intended for server-side use in modern Node.js environments. While it may work with Deno or Bun, consistent results cannot be guaranteed. To install vallib, use npm:

```bash
npm install vallib
```

Using vallib is straightforward: to access an endpoint, import the relevant module that includes the corresponding function. Currently, the fully implemented module is AUTH.

```ts
// Example 1
import { AUTH } from "vallib";

const cookieStrWithSSID: string[] = ...;
const response = await AUTH.COOKIE_REAUTH({ cookies: cookieStrWithSSID });

console.log(response.data.access_token);
```

You can also configure each endpoint and set [additional options](https://github.com/mikareich/vallib/blob/9c70c7a478c137512e50feb6c0311aca5a08d547/src/core/types.ts#L15). This can be essential for preventing rate limits imposed by Riot Games via Cloudflare.

```ts
// Example 2: endpoints with proxy
import { AUTH } from "vallib";

const authToken: string = ...;

const response = await AUTH.PLAYER_INFO(
  { authToken },
  {
    proxy: process.env.PROXY_URL,
    // ...and much more...
  }
);
```

To enhance the developer experience and ensure the reliability of the SDK, each endpoint is fully type-safe and, by default, is always validated against a schema that defines the expected response format. Although it is not recommended, you can opt out of this validation step using the endpoint option `unsafeSkipValidation: true`. However, if you do so, the type definition for the current endpoint's response will revert to string.

## Motivation

The Valorant API is a powerful tool for developers to create applications and services that interact with the game. However, the API is not officially supported by Riot Games, and as such, it is subject to change without notice. vallib aims to provide a consistent and easy-to-use interface for developers to interact with the API, while also providing type safety and validation to ensure that the data returned is accurate and reliable.

Similar projects are the [vallib python library](https://github.com/ValUtils/ValLib) and [riot auth library](https://github.com/floxay/python-riot-auth)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
