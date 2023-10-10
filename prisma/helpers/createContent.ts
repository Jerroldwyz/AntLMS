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

export const createMultipleContent = (topic: topics): content[] => {
  const contents: content[] = []
  for (let i = 0; i < 4; i++) {
    contents.push({
      id: faker.number.int(2147483647),
      title: faker.company.buzzPhrase(),
      content: `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<p>${faker.lorem.paragraph(4)}</p>`,
      type: "TEXT",
      topic_id: topic.id,
      // topic_position: faker.number.int(2147483647),
      topic_position: i + 1,
    })
  }
  return contents
}
