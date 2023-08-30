interface TransformedChoice {
  id: number
  choiceText: string
  isCorrect?: boolean
}

export const choiceTransformer = (choice: any) => {
  const choiceObj: TransformedChoice = {
    id: choice.id,
    choiceText: choice.choice_text,
  }

  if (choice.is_correct !== undefined) {
    choiceObj.isCorrect = choice.is_correct
  }

  return choiceObj
}
