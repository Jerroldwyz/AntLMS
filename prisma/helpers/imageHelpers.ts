import { randomUUID } from "crypto"
import { faker } from "./faker"
import { tempDir, downloadImage } from "./fileHelpers"
import { uploadFile } from "./minio"

const createImage = async (height: number, width: number) => {
  const imageUrl = faker.image.url({ height, width })
  const imageName = randomUUID()
  const downloadFilePath = `${tempDir}/${imageName}.jpg`
  const s3FilePath = `image/${imageName}.jpg`
  await downloadImage(imageUrl, downloadFilePath)
  const metaData = {
    "Content-Type": "image/jpg",
  }
  await uploadFile("antlms", s3FilePath, downloadFilePath, metaData)
  return s3FilePath
}

export const createCourseImage = async (): Promise<string> => {
  return await createImage(240, 360)
}

export const createThumbnail = async (): Promise<string> => {
  return await createImage(64, 64)
}
