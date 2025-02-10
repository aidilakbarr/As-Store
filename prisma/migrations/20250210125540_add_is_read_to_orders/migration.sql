/*
  Warnings:

  - You are about to drop the column `isRead` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isRead";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;
