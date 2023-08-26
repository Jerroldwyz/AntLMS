import { topicsTransformer } from "./topics"

export const mycourseTransformer = (mycourse: any) => {
    return {
        id: mycourse.id,
        title: mycourse.title,
        enabled: mycourse.enabled,
        thumbnail: mycourse.thumbnail,
        creator: mycourse.creator,
        topics: mycourse.topics.map(topicsTransformer)
    }
}