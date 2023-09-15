import * as fs from "fs"
import { randomUUID } from "crypto"
import { faker } from "@faker-js/faker"
import { PrismaClient, courses, users } from "@prisma/client"
import * as Minio from "minio"
import Axios from "axios"
faker.seed(12451)

const tempDir = "tmp"

const localConfig = {
  endPoint: "localhost", // Replace with your Minio server's endpoint
  port: 9000, // Specify the port (e.g., 9000 for Minio's default)
  useSSL: false, // Set to true if your Minio server uses SSL
  accessKey: "minioadmin",
  secretKey: "minioadmin",
}

// Initialize the Minio client
const minioClient = new Minio.Client(localConfig)

const downloadImage = async (url: string, filepath: string) => {
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

const createTempDir = () => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }
}

const cleanupTempDir = () => {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true })
  }
}

// Upload a file to the Minio bucket
const uploadFile = async (
  bucketName: string,
  objectName: string,
  file: string,
  contentType: Minio.ItemBucketMetadata,
) => {
  await minioClient.fPutObject(bucketName, objectName, file, contentType)
}

const createUser = (): users => {
  return {
    uid: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    contact_details: {},
  }
}

const createCourse = async (users: users[]): Promise<Omit<courses, "id">> => {
  return {
    // id auto generate
    title: faker.company.buzzPhrase(),
    enabled: faker.datatype.boolean(),
    thumbnail: await createCourseImage(),
    creator_id: users[Math.floor(Math.random() * users.length)].uid,
  }
}

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

const createCourseImage = async (): Promise<string> => {
  return await createImage(240, 360)
}

const createThumbnail = async (): Promise<string> => {
  return await createImage(64, 64)
}

export const generateData = async (prisma: PrismaClient, amount: number) => {
  createTempDir()

  const users: users[] = []
  const coursePromises: Promise<Omit<courses, "id">>[] = []

  for (let i = 0; i < amount; i++) {
    users.push(createUser())
  }
  for (let i = 0; i < amount; i++) {
    coursePromises.push(createCourse(users))
  }

  const courses: Omit<courses, "id">[] = await Promise.all(coursePromises)

  await prisma.users.createMany({
    data: users.map((user) => {
      return {
        ...user,
        contact_details: JSON.stringify(user.contact_details),
      }
    }),
    skipDuplicates: true,
  })

  await prisma.courses.createMany({
    data: courses,
    skipDuplicates: true,
  })

  cleanupTempDir()
}
