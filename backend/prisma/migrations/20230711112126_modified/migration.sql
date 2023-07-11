/*
  Warnings:

  - A unique constraint covering the columns `[cart_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cart_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_user_id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `cart_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cart_id_key` ON `User`(`cart_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
