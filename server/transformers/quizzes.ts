export const quizzTransformer = (quiz: any) => {
    return {
        id: quiz.title,
        title: quiz.title,
        topicPosition: quiz.topic_position,
    }
}