-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "usia" INTEGER NOT NULL,
    "mobile" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
