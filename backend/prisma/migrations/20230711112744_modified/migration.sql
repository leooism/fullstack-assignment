/*
  Warnings:

  - You are about to drop the column `user_id` on the `cart` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Cart_user_id_key` ON `cart`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `user_id`;
