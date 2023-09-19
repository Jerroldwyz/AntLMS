import * as Minio from "minio"

// Upload a file to the Minio bucket
const localConfig = {
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
}

export const uploadFile = async (
  bucketName: string,
  objectName: string,
  file: string,
  contentType: Minio.ItemBucketMetadata,
) => {
  await minioClient.fPutObject(bucketName, objectName, file, contentType)
} // Initialize the Minio client

const minioClient = new Minio.Client(localConfig)
