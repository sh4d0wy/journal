/*
  Warnings:

  - A unique constraint covering the columns `[tasks]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tasks_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "tasks_tasks_key" ON "tasks"("tasks");
