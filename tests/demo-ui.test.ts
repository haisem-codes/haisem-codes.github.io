import { test, expect } from "vitest";
import { demoKey } from "@/lib/demo/engine";
test("key changes with language and vertical", () => {
  expect(demoKey("en", "salon")).not.toBe(demoKey("sv", "salon"));
  expect(demoKey("en", "salon")).not.toBe(demoKey("en", "clinic"));
});
