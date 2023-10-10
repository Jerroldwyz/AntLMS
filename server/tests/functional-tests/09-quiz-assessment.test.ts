import { describe, test, expect } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

describe("My test", async () => {
  await setup({
    server: true,
  })

  test("my test", () => {
    // ...
    expect(true).toBe(true)
  })
})
