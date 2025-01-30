-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'EDITOR';

-- CreateIndex
CREATE INDEX "Article_categoryId_idx" ON "Article"("categoryId");

-- CreateIndex
CREATE INDEX "Article_tagId_idx" ON "Article"("tagId");

-- CreateIndex
CREATE INDEX "Article_userId_idx" ON "Article"("userId");
