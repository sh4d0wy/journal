-- CreateTable
CREATE TABLE "tasks" (
    "id" INTEGER NOT NULL,
    "tasks" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "doneAt" DATE NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
