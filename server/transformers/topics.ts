import { contentTransformer } from "./content"

export const topicsTransformer = (topic: any) => {
    return {
        title: topic.title,
        content: topic.content.map(contentTransformer)
    }
}