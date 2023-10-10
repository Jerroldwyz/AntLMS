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

  afterAll(async () => {
    try {
      await $fetch(`/api/users/${testUser.uid}`, {
        method: "DELETE",
      })
    } catch (e) {}
    try {
      await $fetch(`/api/mycourses/${testCourse.id}`, {
        method: "DELETE",
      })
    } catch (e) {}
    try {
      await $fetch(`/api/topics/${testTopic.id}`, {
        method: "DELETE",
      })
    } catch (e) {}
  })

  it("Can perform CRUD on quizzes", async () => {
    const createQuiz = await $fetch("/api/quiz", {
      method: "POST",
      body: {
        topic_id: testTopic.id,
        title: "1",
        topic_position: 1,
        threshold: 1,
      },
    })
    const getQuiz = await $fetch(`/api/quiz/${createQuiz.id}`)
    expect(getQuiz).toEqual({
      id: createQuiz.id,
      title: "1",
      topicPosition: 1,
      topicId: testTopic.id,
      threshold: 1,
      questions: [],
    })
    const updateQuiz = await $fetch(`/api/quiz/${createQuiz.id}`, {
      method: "PUT",
      body: {
        title: "2",
        topic_position: 2,
        threshold: 2,
      },
    })
    const getQuizAgain = await $fetch(`/api/quiz/${updateQuiz.id}`)
    expect(getQuizAgain).toEqual({
      id: updateQuiz.id,
      topicId: testTopic.id,
      title: "2",
      topicPosition: 2,
      threshold: 2,
      questions: [],
    })
    const deleteQuiz = await $fetch(`/api/quiz/${updateQuiz.id}`, {
      method: "DELETE",
    })
  })
})
