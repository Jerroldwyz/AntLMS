import { describe, it, expect } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

describe("My test", () => {
  it("Can perform CRUD on users", async () => {
    const createUser = await $fetch("/api/users", {
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
    const getUser = await $fetch(`/api/users/${createUser.uid}`)
    expect(getUser).toEqual({
      name: "test",
      email: "test@example.com",
      thumbnail: null,
      contact_details: {},
      is_admin: false,
      enabled: true,
    })
    const updateUser = await $fetch(`/api/users/${createUser.uid}`, {
      method: "PUT",
      body: {
        name: "test2",
        email: "test2@example.com",
        thumbnail: null,
        contactDetails: {},
        isAdmin: true,
        enabled: false,
      },
    })
    const getUserAgain = await $fetch(`/api/users/${updateUser.uid}`)
    expect(getUserAgain).toEqual({
      name: "test2",
      email: "test2@example.com",
      thumbnail: null,
      contact_details: {},
      is_admin: true,
      enabled: false,
    })
    const deleteUser = await $fetch(`/api/users/${createUser.uid}`, {
      method: "DELETE",
    })
  })
})
