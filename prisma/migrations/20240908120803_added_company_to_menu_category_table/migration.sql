-- AlterTable
ALTER TABLE "MenuCategories" ADD COLUMN     "companyId" INTEGER;

-- AddForeignKey
ALTER TABLE "MenuCategories" ADD CONSTRAINT "MenuCategories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
