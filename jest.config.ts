import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  coverageProvider: "v8",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  watchPathIgnorePatterns: [".cache", "schema"],
  modulePathIgnorePatterns: [
    "cookieReauth.test.ts",
    // "authCookies.test.ts",
    // "authRequest.test.ts",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};

export default config;
