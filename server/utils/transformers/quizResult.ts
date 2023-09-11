type Result = {
  id: number
  question_id: number
  choice_text: string
  is_correct: boolean
}

export const resultTransformer = (result: Result[]) => {
  var correctAnswer = 0,
    totalQuestion = 0
  return {
    result: result.map((r) => {
      totalQuestion++
      if (r.is_correct === true) {
        correctAnswer++
      }
      return {
        id: r.id,
        questionId: r.question_id,
        isCorrect: r.is_correct,
      }
    }),
    correctAnswer: correctAnswer,
    totalQuestion: totalQuestion,
  }
}
