/*
  Warnings:

  - You are about to drop the `Choice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enrollments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Managers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_question_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Managers" DROP CONSTRAINT "Managers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quiz_id_fkey";

-- DropTable
DROP TABLE "Choice";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Enrollments";

-- DropTable
DROP TABLE "Managers";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Quiz";

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "User";
