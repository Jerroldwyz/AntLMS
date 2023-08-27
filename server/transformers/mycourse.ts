import { topicsTransformer } from "./topics"

export const mycourseTransformer = (mycourse: any) => {
    return {
        id: mycourse.id,
        title: mycourse.title,
        enabled: mycourse.enabled ?? true,
        thumbnail: mycourse.thumbnail ?? "",
        creator: mycourse.creator,
        topics: mycourse.topics.map(topicsTransformer),
        tags: mycourse.course_tags.map((tags: any) => {
            return tags.tag.name;
        }),
    }
}