export const uploadVideo = async (
  file: File,
  mimeType: string,
): Promise<string> => {
  if (!file) {
    // No file selected, handle this case as needed
    console.log("No video to upload")
    throw new Error("No video to upload")
  }

  const { presignedUrl, path } = await $fetch("/api/videos", {
    method: "POST",
    body: {
      type: mimeType,
    },
  })

  const data = await $fetch(presignedUrl, {
    method: "PUT",
    body: file,
  })

  console.log(`path = ${path}`)

  return path
}

export const getVideo = async (path: string): Promise<string> => {
  const { data } = await useFetch(`/api/videos/${path}`, {
    method: "GET",
    params: { path },
  })
  return data.value?.presignedUrl as string
}

export const deleteVideo = async (path: string): Promise<boolean> => {
  const { success } = await $fetch(`/api/videos/${path}`, {
    method: "DELETE",
    body: {
      path,
    },
  })
  return success
}