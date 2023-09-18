import { v4 as uuidv4 } from "uuid"

type fileType = "image" | "video"

export const uploadFileToS3 = async (
  file: File,
  type: fileType,
): Promise<string> => {
  if (!file) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  }

  const fileName = `${uuidv4()}-${file.name}`
  const { presignedUrl, path } = await $fetch("/api/s3/getUploadUrl", {
    method: "POST",
    body: {
      fileName,
      type,
    },
  })

  const data = await $fetch(presignedUrl, {
    method: "PUT",
    body: file,
  })

  console.log(`path = ${path}`)

  return path
}

export const getFileUrlFromS3 = async (path: string): Promise<string> => {
  const { data } = await useFetch("/api/s3/getViewUrl", {
    method: "GET",
    params: { path },
  })
  return data.value?.presignedUrl
}

export const deleteFileFromS3 = async (path: string): Promise<boolean> => {
  const { success } = await $fetch("/api/s3/deleteFile", {
    method: "DELETE",
    body: {
      path,
    },
  })
  return success
}
