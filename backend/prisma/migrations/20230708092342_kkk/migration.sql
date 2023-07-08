/*
  Warnings:

  - You are about to alter the column `isbn` on the `book` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `isbn` INTEGER NOT NULL;
