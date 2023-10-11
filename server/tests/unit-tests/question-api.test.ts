import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

let testUser: any, testCourse: any, testTopic: any, testQuiz: any
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
    testQuiz = await $fetch("/api/quiz", {
      method: "POST",
      body: {
        topic_id: testTopic.id,
        title: "1",
        topic_position: 1,
        threshold: 1,
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
    try {
      await $fetch(`/api/quiz/${testQuiz.id}`, {
        method: "DELETE",
      })
    } catch (e) {}
  })

  it("Can perform CRUD on questions", async () => {
    const createQuestion = await $fetch("/api/question", {
      method: "POST",
      body: {
        quizId: testQuiz.id,
        choices: [
          {
            choiceText: "1",
            isCorrect: true,
          },
        ],
        questionText: "1",
        explanation: "1",
      },
    })
    const getQuestion = await $fetch(`/api/question/${createQuestion.id}`)
    expect(getQuestion).toEqual({
      id: createQuestion.id,
      quizId: createQuestion.quizId,
      questionText: "1",
      explanation: "1",
      choices: [
        {
          id: createQuestion.choices[0].id,
          choiceText: "1",
          isCorrect: true,
        },
      ],
    })
    const updateQuestion = await $fetch(`/api/question/${createQuestion.id}`, {
      method: "PUT",
      body: {
        questionText: "2",
        explanation: "2",
        choices: [
          {
            choiceText: "2",
            isCorrect: false,
          },
        ],
      },
    })
    const getQuestionAgain = await $fetch(`/api/question/${createQuestion.id}`)
    expect(getQuestionAgain).toEqual({
      id: createQuestion.id,
      quizId: createQuestion.quizId,
      questionText: "2",
      explanation: "2",
      choices: [
        {
          id: updateQuestion.choices[0].id,
          choiceText: "2",
          isCorrect: false,
        },
      ],
    })
    const deleteQuestion = await $fetch(`/api/question/${updateQuestion.id}`, {
      method: "DELETE",
    })
  })
})
