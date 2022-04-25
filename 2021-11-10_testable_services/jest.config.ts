import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
  roots: ["src"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "ts"],
};

export default config;
