-- AlterTable
ALTER TABLE `user` ADD COLUMN `passwordExpireTime` DATETIME(3) NULL,
    ADD COLUMN `passwordResetToken` VARCHAR(191) NULL;
