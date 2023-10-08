export async function fetchUserQuiz(quiz_id: number): Promise<any> {
  // TODO: add type
  const { data } = await useFetch(`/api/quiz/${quiz_id}`, {
    method: "get",
  })

  return data
}

export async function deleteUserQuestion(question_id: number): Promise<any> {
  // TODO: add type
  const { data } = await useFetch(`/api/question/${question_id}`, {
    method: "delete",
  })

  return data
}
