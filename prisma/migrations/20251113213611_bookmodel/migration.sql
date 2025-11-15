/*
  Warnings:

  - You are about to drop the column `title` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookname` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "title",
ADD COLUMN     "bookname" TEXT NOT NULL;
