import * as fs from "fs"
import Axios from "axios"

export const tempDir = "tmp"

export const downloadFile = async (url: string, filepath: string) => {
  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  })
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => resolve(filepath))
  })
}

export const createTempDir = () => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }
}

export const cleanupTempDir = () => {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true })
  }
}
