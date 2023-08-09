/*
  Warnings:

  - Added the required column `category_id` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_id_fkey";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
