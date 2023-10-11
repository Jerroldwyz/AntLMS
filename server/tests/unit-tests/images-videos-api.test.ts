import { describe, it, expect } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

describe("My test", () => {
  // TODO, this api can probably be handled better
  it("Can perform CRUD on images", async () => {
    const createImage = await $fetch("/api/images", {
      method: "POST",
      body: {
        name: "test.jpg",
      },
    })
    const getImage = await $fetch(`/api/images`, {
      query: {
        path: createImage.path,
      },
    })
    expect(createImage).toEqual({
      success: true,
      path: expect.stringContaining("test.jpg"),
      presignedUrl: expect.any(String),
    })
    const updateImage = await $fetch(`/api/images`, {
      method: "PUT",
      body: {
        name: `test2.jpg`,
      },
    })
    expect(updateImage).toEqual({
      success: true,
      path: expect.stringContaining("test2.jpg"),
      presignedUrl: expect.any(String),
    })
    const getImageAgain = await $fetch(`/api/images`, {
      query: {
        path: updateImage.path,
      },
    })
    const deleteImage = await $fetch(`/api/images`, {
      method: "DELETE",
      body: {
        path: updateImage.path,
      },
    })
  })
  // TODO, this api can probably be handled better
  it("Can perform CRUD on videos", async () => {
    const createVideo = await $fetch("/api/videos", {
      method: "POST",
      body: {
        name: "test.jpg",
      },
    })
    const getVideo = await $fetch(`/api/videos`, {
      query: {
        path: createVideo.path,
      },
    })
    expect(createVideo).toEqual({
      success: true,
      path: expect.stringContaining("test.jpg"),
      presignedUrl: expect.any(String),
    })
    const updateVideo = await $fetch(`/api/videos`, {
      method: "PUT",
      body: {
        name: `test2.jpg`,
      },
    })
    expect(updateVideo).toEqual({
      success: true,
      path: expect.stringContaining("test2.jpg"),
      presignedUrl: expect.any(String),
    })
    const getVideoAgain = await $fetch(`/api/videos`, {
      query: {
        path: updateVideo.path,
      },
    })
    const deleteVideo = await $fetch(`/api/videos`, {
      method: "DELETE",
      body: {
        path: updateVideo.path,
      },
    })
  })
})
