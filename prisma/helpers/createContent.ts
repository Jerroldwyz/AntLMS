import { content, topics } from "@prisma/client"
import { faker } from "./faker"

export const createContent = (topics: topics[]): content => {
  return {
    id: faker.number.int(2147483647),
    title: faker.company.buzzPhrase(),
    content: faker.lorem.paragraph(4),
    type: "TEXT",
    topic_id: topics[Math.floor(Math.random() * topics.length)].id,
    topic_position: faker.number.int(2147483647),
  }
}

export const createMultipleContent = (
  topic: topics,
  videos: string[],
): content[] => {
  const contents: content[] = []
  for (let i = 0; i < 4; i++) {
    const isTextContent = Math.random() < 0.5

    const contentObj: content = {
      id: faker.number.int(2147483647),
      title: faker.company.buzzPhrase(),
      type: isTextContent === true ? "TEXT" : "VIDEO",
      content:
        isTextContent === true
          ? `<h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p>${faker.lorem.paragraphs(10, "<br/>\n")}</p>`
          : videos[Math.floor(Math.random() * videos.length)],
      topic_id: topic.id,
      topic_position: i + 1,
    }

    contents.push(contentObj)
  }
  return contents
}
