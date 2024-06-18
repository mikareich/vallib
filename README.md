![Banner](https://github.com/mikareich/val-api-test/blob/main/banner.png)

# vallib

vallib is a TypeScript API wrapper for the [unofficial Valorant API](https://valapidocs.techchrism.me/). It is designed to be consistent and easy to configure, allowing for customizations such as adding a proxy.

**🛡️ Type Safety**: vallib is written in TypeScript, and every endpoint has a corresponding type definition. Additionally, each API response is validated against a predefined schema to ensure consistency.

**♻️ Adaptable**: vallib is designed to be flexible. You can easily configure the client to use a proxy, skip validation steps, configure the HTTP client etc... or just use the default settings.

## Installation and Usage

Due to CORS limitations, vallib is intended for server-side use in modern Node.js environments. While it may work with Deno or Bun, consistent results are not guaranteed. To install vallib, use the npm package manager:

```bash
npm install vallib
```

## Motivation

The Valorant API is a powerful tool for developers to create applications and services that interact with the game. However, the API is not officially supported by Riot Games, and as such, it is subject to change without notice. vallib aims to provide a consistent and easy-to-use interface for developers to interact with the API, while also providing type safety and validation to ensure that the data returned is accurate and reliable.

Similar projects are the [vallib python library](https://github.com/ValUtils/ValLib) and [riot auth library](https://github.com/floxay/python-riot-auth)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
