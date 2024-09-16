/*
  Warnings:

  - You are about to drop the `DisabledLocationMenuCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DisabledLocationMenuCategory" DROP CONSTRAINT "DisabledLocationMenuCategory_locationId_fkey";

-- DropForeignKey
ALTER TABLE "DisabledLocationMenuCategory" DROP CONSTRAINT "DisabledLocationMenuCategory_menuCategoryId_fkey";

-- DropTable
DROP TABLE "DisabledLocationMenuCategory";

-- CreateTable
CREATE TABLE "DisabledLocationMenuCategories" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,

    CONSTRAINT "DisabledLocationMenuCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabledLocationMenus" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,

    CONSTRAINT "DisabledLocationMenus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisabledLocationMenuCategories" ADD CONSTRAINT "DisabledLocationMenuCategories_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationMenuCategories" ADD CONSTRAINT "DisabledLocationMenuCategories_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationMenus" ADD CONSTRAINT "DisabledLocationMenus_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationMenus" ADD CONSTRAINT "DisabledLocationMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
