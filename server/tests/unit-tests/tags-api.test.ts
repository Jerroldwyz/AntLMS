import { describe, it, expect } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"
import { v4 as uuidv4 } from "uuid"

await setup({
  server: true,
})

describe("My test", () => {
  it("Can perform CRUD on tags", async () => {
    const tagName = "test" + uuidv4()
    const createTag = await $fetch("/api/tags", {
      method: "POST",
      body: {
        name: tagName,
      },
    })
    const getTag = await $fetch(`/api/tags/${createTag.id}`)
    expect(getTag).toEqual({
      id: createTag.id,
      name: tagName,
    })
    const newTagName = "test2" + uuidv4()
    const updateTag = await $fetch(`/api/tags/${createTag.id}`, {
      method: "PUT",
      body: {
        name: newTagName,
      },
    })
    const getTagAgain = await $fetch(`/api/tags/${updateTag.id}`)
    expect(getTagAgain).toEqual({
      id: createTag.id,
      name: newTagName,
    })
    const deleteTag = await $fetch(`/api/tags/${createTag.id}`, {
      method: "DELETE",
    })
  })
})
