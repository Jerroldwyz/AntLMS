import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

let testUser: any,
  testCourse: any,
  testEnrollment: any,
  testTopic: any,
  testQuiz: any
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
    testEnrollment = await $fetch(`/api/users/${testUser.uid}/enrollments`, {
      method: "POST",
      body: {
        courseId: testCourse.id,
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
      if (testQuiz) {
        await $fetch(`/api/quiz/${testQuiz.id}`, {
          method: "DELETE",
        })
      }
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
            isCorrect: false,
          },
          {
            choiceText: "2",
            isCorrect: true,
          },
        ],
        questionText: "1",
        explanation: "1",
      },
    })
    const evaluateQuizFail = await $fetch(`/api/quiz/${testQuiz.id}/evaluate`, {
      method: "POST",
      body: {
        userId: testUser.uid,
        enrollmentId: testEnrollment.id,
        result: [createQuestion.choices[0].id],
      },
    })
    expect(evaluateQuizFail).toEqual({
      correctAnswer: 0,
      result: [
        {
          id: createQuestion.choices[0].id,
          isCorrect: false,
          questionId: createQuestion.id,
        },
      ],
      threshold: 1,
      totalQuestion: 1,
    })
    const evaluateQuizPass = await $fetch(`/api/quiz/${testQuiz.id}/evaluate`, {
      method: "POST",
      body: {
        userId: testUser.uid,
        enrollmentId: testEnrollment.id,
        result: [createQuestion.choices[1].id],
      },
    })
    expect(evaluateQuizPass).toEqual({
      correctAnswer: 1,
      result: [
        {
          id: createQuestion.choices[1].id,
          isCorrect: true,
          questionId: createQuestion.id,
        },
      ],
      threshold: 1,
      totalQuestion: 1,
    })
  })
})
