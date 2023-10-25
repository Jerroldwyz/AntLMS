import { randomUUID } from "crypto"
import { tempDir, downloadFile } from "./fileHelpers"
import { uploadFile } from "./minio"

const samples = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
]

export const createVideos = (): string[] => {
  const s3Urls: string[] = []

  samples.forEach(async (url) => {
    const videoName = randomUUID()
    const downloadFilePath = `${tempDir}/${videoName}.mp4`
    const s3FilePath = `videos/${videoName}.mp4`
    s3Urls.push(s3FilePath)
    await downloadFile(url, downloadFilePath)
    const metaData = {
      "Content-Type": "video/mp4",
    }
    await uploadFile("antlms", s3FilePath, downloadFilePath, metaData)
  })

  return s3Urls
}
