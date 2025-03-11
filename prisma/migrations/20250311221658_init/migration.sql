/*
  Warnings:

  - Made the column `slug` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "_TodosTags" ADD CONSTRAINT "_TodosTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TodosTags_AB_unique";

-- CreateIndex
CREATE INDEX "Category_slug_id_idx" ON "Category"("slug", "id");

-- CreateIndex
CREATE INDEX "Todo_id_category_id_idx" ON "Todo"("id", "category_id");
