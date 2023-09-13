import { Readable } from "stream"
import * as Minio from "minio"

const localConfig = {
  endPoint: "localhost", // Replace with your Minio server's endpoint
  port: 9000, // Specify the port (e.g., 9000 for Minio's default)
  useSSL: false, // Set to true if your Minio server uses SSL
  accessKey: "minioadmin",
  secretKey: "minioadmin",
}

const prodConfig: Minio.ClientOptions = {
  endPoint: "s3.ap-southeast-2.amazonaws.com", // Replace with your Minio server's endpoint
  port: 443, // Specify the port (e.g., 9000 for Minio's default)
  useSSL: true, // Set to true if your Minio server uses SSL
  accessKey: process.env.AWS_ACCESS_KEY_ID!,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY!,
}

const config = process.env.NODE_ENV === "production" ? prodConfig : localConfig

// Initialize the Minio client
const minioClient = new Minio.Client(config)

// Upload a file to the Minio bucket
export const uploadFile = async (
  bucketName: string,
  objectName: string,
  fileStream: Readable,
  contentType: Minio.ItemBucketMetadata,
) => {
  await minioClient.putObject(bucketName, objectName, fileStream, contentType)
}

// Download a file from the Minio bucket
export const downloadFile = async (
  bucketName: string,
  objectName: string,
  filePath: string,
) => {
  await minioClient.fGetObject(bucketName, objectName, filePath)
}

// Delete a file from the Minio bucket
export const deleteFile = async (bucketName: string, objectName: string) => {
  await minioClient.removeObject(bucketName, objectName)
}

// Generate a presigned URL for accessing an object
export const generatePresignedUrl = (
  bucketName: string,
  objectName: string,
  expiresIn: number,
) => {
  return minioClient.presignedGetObject(bucketName, objectName, expiresIn)
}

// Generate a presigned URL for accessing an object
export const generatePresignedUrlPUT = (
  bucketName: string,
  objectName: string,
  expiresIn: number,
) => {
  return minioClient.presignedPutObject(bucketName, objectName, expiresIn)
}
