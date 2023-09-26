export const uploadImage = async (
  file: File,
  mimeType: string,
): Promise<string> => {
  if (!file) {
    // No file selected, handle this case as needed
    console.log("No image to upload")
    throw new Error("No image to upload")
  }

  const { presignedUrl, path } = await $fetch("/api/images", {
    method: "POST",
    body: {
      name: file.name,
    },
  })

  const data = await $fetch(presignedUrl, {
    method: "PUT",
    body: file,
  })

  console.log(`path = ${path}`)

  return path
}

export const getImage = async (path: string): Promise<string> => {
  const { data } = await useFetch(`/api/images`, {
    method: "GET",
    params: { path },
  })
  return data.value?.presignedUrl as string
}

export const deleteImage = async (path: string): Promise<boolean> => {
  const { success } = await $fetch(`/api/images/${path}`, {
    method: "DELETE",
    body: {
      path,
    },
  })
  return success
}
