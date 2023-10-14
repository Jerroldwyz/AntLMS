import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

let testUser: any
describe("My test", () => {
  beforeAll(async () => {
    testUser = await $fetch("/api/users", {
      method: "POST",
      body: {
        name: "test",
        email: "test@example.com",
        thumbnail: null,
        contactDetails: {},
        isAdmin: false,
        enabled: true,
      },
    })
  })

  afterAll(async () => {
    try {
      await $fetch(`/api/users/${testUser.uid}`, {
        method: "DELETE",
      })
    } catch (e) {}
  })

  it("Can change user details", async () => {
    const updateUser = await $fetch(`/api/users/${testUser.uid}`, {
      method: "PUT",
      body: {
        name: "test2",
        thumbnail: null,
        contactDetails: {
          phoneNumber: "0412341234",
        },
      },
    })
    const getUser = await $fetch(`/api/users/${updateUser.uid}`)
    expect(getUser).toEqual({
      name: "test2",
      email: "test@example.com",
      thumbnail: null,
      contact_details: {
        phoneNumber: "0412341234",
      },
      is_admin: false,
      enabled: true,
    })
  })
})
