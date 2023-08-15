/*
  Warnings:

  - The `topic` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_course_id_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "topic",
ADD COLUMN     "topic" TEXT[];

-- DropTable
DROP TABLE "Topic";
