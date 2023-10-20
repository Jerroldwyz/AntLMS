import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

let testUser: any, testCourse: any, testTopic: any
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
    testCourse = await $fetch("/api/mycourses", {
      method: "POST",
      body: {
        title: "1",
        enabled: true,
        thumbnail: null,
        creatorId: testUser.uid,
      },
    })
    testTopic = await $fetch("/api/topics", {
      method: "POST",
      body: {
        courseId: testCourse.id,
        title: "1",
        position: 1,
      },
    })
  })

  // Cleanup is not possible as the server shuts down automatically right before this step...
  afterAll(async () => {
    try {
      if (testUser) {
        await $fetch(`/api/users/${testUser.uid}`, {
          method: "DELETE",
        })
      }
      if (testCourse) {
        await $fetch(`/api/mycourses/${testCourse.id}`, {
          method: "DELETE",
        })
      }
      if (testTopic) {
        await $fetch(`/api/topics/${testTopic.id}`, {
          method: "DELETE",
        })
      }
    } catch (e) {}
  })

  it("Can perform CRUD on content", async () => {
    const createContent = await $fetch("/api/content", {
      method: "POST",
      body: {
        title: "1",
        type: "TEXT",
        content: "1",
        topicId: testTopic.id,
        topicPosition: 1,
      },
    })
    const getContent = await $fetch(`/api/content/${createContent.id}`)
    expect(getContent).toEqual({
      id: createContent.id,
      title: "1",
      type: "TEXT",
      content: "1",
      topicId: testTopic.id,
      topicPosition: 1,
    })
    const updateContent = await $fetch(`/api/content/${createContent.id}`, {
      method: "PUT",
      body: {
        title: "2",
        type: "TEXT",
        content: "2",
        topicId: testTopic.id,
        topicPosition: 2,
      },
    })
    const getContentAgain = await $fetch(`/api/content/${updateContent.id}`)
    expect(getContentAgain).toEqual({
      id: createContent.id,
      title: "2",
      type: "TEXT",
      content: "2",
      topicId: testTopic.id,
      topicPosition: 2,
    })
    const deleteContent = await $fetch(`/api/content/${updateContent.id}`, {
      method: "DELETE",
    })
  })
})
