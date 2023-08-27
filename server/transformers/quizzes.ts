export const quizTransformer = (quiz: any) => {
    return {
        id: quiz.id,
        title: quiz.title,
        topicPosition: quiz.topic_position ?? 0,
    }
}