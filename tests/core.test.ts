import { core } from "../src";
import https from "node:https";
import { config } from "dotenv";

import APIError from "../src/core/errors";
import { z } from "zod";
config();

const { request, headers: reqHeaders } = core;

describe("executes simple requests", () => {
  it("headers get correctly passed", async () => {
    const response = await request(
      "GET",
      "https://httpbin.org/get",
      undefined,
      {
        httpsAgent: new https.Agent({}),
      }
    );

    const headers: Record<string, string> = {};

    Object.entries(
      (response.data as Record<string, string>)["headers"]
    ).forEach(([key, value]) => {
      headers[key.toLowerCase()] = value;
    });

    const everyDefaultHeaderPresent = Object.entries(
      reqHeaders.getDefaultHeaders().entries()
    ).every(([key, value]) => {
      return headers[key] === value;
    });

    expect(everyDefaultHeaderPresent).toBeTruthy();
  });

  it("should return the correct response", async () => {
    const response = await request(
      "GET",
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    expect(response.data).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    });

    expect(response.headers.get("content-type")).toEqual(
      "application/json; charset=utf-8"
    );

    expect(response.status).toEqual(200);
  });
});

describe("throws errors on invalid requests", () => {
  it("should throw an error on 404", async () => {
    try {
      await request("GET", "https://jsonplaceholder.typicode.com/todos/100");
    } catch (error) {
      if (error instanceof APIError) {
        expect(error.status).toEqual(404);
        expect(error.name).toEqual("APIError");
      }
    }
  });

  it("should throw an error on 500", async () => {
    try {
      await request("GET", "https://httpbin.org/status/500");
    } catch (error) {
      if (error instanceof APIError) {
        expect(error.status).toEqual(500);
        expect(error.name).toEqual("APIError");
      }
    }
  });

  it("should throw an error on unexpected response", async () => {
    try {
      await request("GET", "https://httpbin.org/get", undefined, {
        schema: z.number(),
        httpsAgent: new https.Agent({}),
      });
    } catch (error) {
      if (error instanceof APIError) {
        expect(error.status).toEqual(400);
        expect(error.name).toEqual("APIError");
      }
    }
  });
});

describe("handles proxy correctly", () => {
  it("should return the correct responses + use different ips", async () => {
    const NUM_REQUESTS = 5;

    const ips: string[] = [];

    for (let i = 0; i < NUM_REQUESTS; i++) {
      const response = await request(
        "GET",
        "https://httpbin.org/ip",
        undefined,
        {
          proxy: process.env.PROXY_URL,
        }
      );
      ips.push((response.data as any).origin);
    }

    expect(new Set(ips).size > 1).toBeTruthy();
  }, 100_000);
});
