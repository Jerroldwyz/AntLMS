export interface IContent {
  title: string
  type: string
  topicPosition: number
  complete: boolean
  content: string
}

export interface ITopic {
  title: string
  content: IContent[]
}

export interface ICourse {
  title: string
  thumbnail: string
  creator: string
  topics: ITopic[]
  tags: string[]
}
