import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  GetObjectCommandOutput,
  DeleteObjectCommandInput,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const localConfig = {
  // Specify your AWS S3 configuration here
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: "yb7SyywqLszRm49jdTWL",
    secretAccessKey: "ax58ucZIIHSdoYexLihWGqVEiIPcIH3cI3C3pU6S",
  },
  endpoint: "127.0.0.1", // Use Minio's endpoint for local dev
  forcePathStyle: true, // Set this option to use path-style requests
  port: 9000,
}

const prodConfig = {
  // Specify your AWS S3 configuration here
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.AWS_S3_ENDPOINT, // Use Minio's endpoint for local dev
}

const config = process.env.NODE_ENV == "production" ? prodConfig : localConfig

console.log(config)

// Initialize the AWS S3 client with forcePathStyle option
const s3 = new S3Client(config)

// Upload a file to the S3 bucket
export const uploadFile = async (
  bucketName: string,
  objectKey: string,
  body: File,
  contentType: string
): Promise<void> => {
  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: objectKey,
    Body: body, // Convert Readable stream to Blob
    ContentType: contentType,
  }

  try {
    await s3.send(new PutObjectCommand(params))
  } catch (error: unknown) {
    const e = error as Error
    throw new Error(`Error uploading file: ${e.message}`)
  }
}

// Delete a file from the S3 bucket
export const deleteFile = async (
  bucketName: string,
  objectKey: string
): Promise<void> => {
  const params: DeleteObjectCommandInput = {
    Bucket: bucketName,
    Key: objectKey,
  }

  try {
    await s3.send(new DeleteObjectCommand(params))
  } catch (error) {
    const e = error as Error
    throw new Error(`Error deleting file: ${e.message}`)
  }
}

// Generate a presigned URL for accessing an object
export const generatePresignedUrl = async (
  objectKey: string,
  expiresIn: number
): Promise<string> => {
  const params = {
    Bucket: "antlms",
    Key: objectKey,
  }

  const command = new GetObjectCommand(params)
  const signer = getSignedUrl(s3, command, { expiresIn })

  const url = await signer
  return url
}
