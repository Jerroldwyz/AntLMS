import { describe, it, expect } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"
import { ofetch } from "ofetch"

await setup({
  server: true,
})

describe("My test", () => {
  // TODO, this api can probably be handled better
  it("Can upload file", async () => {
    const createFile = await $fetch("/api/images", {
      method: "POST",
      body: {
        name: "test.jpg",
      },
    })
    expect(createFile).toEqual({
      success: true,
      path: expect.stringContaining("test.jpg"),
      presignedUrl: expect.any(String),
    })
    const file = "TEST"
    const uploadFile = await ofetch(createFile.presignedUrl, {
      method: "PUT",
      body: file,
    })
    const getFilePresignedUrl = await $fetch(`/api/images`, {
      query: {
        path: createFile.path,
      },
    })
    expect(getFilePresignedUrl).toEqual({
      success: true,
      presignedUrl: expect.any(String),
    })
    const fileData = await ofetch(getFilePresignedUrl.presignedUrl)
    expect(fileData).toBe("TEST")
    const deleteFile = await $fetch(`/api/images`, {
      method: "DELETE",
      body: {
        path: createFile.path,
      },
    })
  })
})
