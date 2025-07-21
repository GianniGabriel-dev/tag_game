/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Game` (
    `game_id` INTEGER NOT NULL AUTO_INCREMENT,
    `game_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`game_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leaderboard` (
    `player_id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_name` VARCHAR(50) NOT NULL,
    `time_score` INTEGER NOT NULL,
    `game_id` INTEGER NULL,

    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `character_name` VARCHAR(100) NULL,
    `x` DECIMAL(5, 2) NOT NULL,
    `y` DECIMAL(5, 2) NOT NULL,
    `game_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Leaderboard` ADD CONSTRAINT `Leaderboard_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Game`(`game_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Game`(`game_id`) ON DELETE SET NULL ON UPDATE CASCADE;
