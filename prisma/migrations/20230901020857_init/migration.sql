/*
  Warnings:

  - A unique constraint covering the columns `[course_id,user_id]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "enrollments_course_id_user_id_key" ON "enrollments"("course_id", "user_id");
