-- AlterTable
CREATE SEQUENCE tasks_id_seq;
ALTER TABLE "tasks" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" SET DEFAULT nextval('tasks_id_seq');
ALTER SEQUENCE tasks_id_seq OWNED BY "tasks"."id";
