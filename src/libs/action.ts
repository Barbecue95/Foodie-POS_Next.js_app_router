"use server";

import { createQrCodeImageUrl } from "@/app/backoffice/tables/actions";
import { getServerSession, User } from "next-auth";
import { prisma } from "./prisma";

export async function createDefaultData(nextUser: User) {
  const { name, email } = nextUser;
  const company = await prisma.company.create({
    data: { name: "Default Company" },
  });
  const user = await prisma.users.create({
    data: {
      name: name as string,
      email: email as string,
      companyId: company.id,
    },
  });
  const location = await prisma.locations.create({
    data: { name: "Default Location", companyId: company.id },
  });
  const table = await prisma.tables.create({
    data: {
      name: "Default Table",
      locationId: location.id,
      qrCodeImageUrl: "",
    },
  });
  const url = await createQrCodeImageUrl(table);
  await prisma.tables.update({
    data: { ...table, qrCodeImageUrl: url },
    where: { id: table.id },
  });
  const menu = await prisma.menus.create({
    data: { name: "Shan Khout Swell" },
  });
  const menuCategory = await prisma.menuCategories.create({
    data: { name: "Most Popular", companyId: company.id },
  });
  await prisma.menuCategoriesMenus.create({
    data: { menuId: menu.id, menuCategoryId: menuCategory.id },
  });
  const addonCategory = await prisma.addonCategories.create({
    data: { name: "Default addonCategory" },
  });
  await prisma.menusAddonCategories.create({
    data: { menuId: menu.id, addonCategoryId: addonCategory.id },
  });
  const addonNames = ["Addon 1", "Addon 2", "Addon 3"];
  const data = addonNames.map((addonName) => ({
    name: addonName,
    price: 0,
    addonCategoryId: addonCategory.id,
  }));
  await prisma.addons.createMany({ data });

  await prisma.selectedLocations.create({
    data: { userId: user.id, locationId: location.id },
  });
}

export async function getCompanyId() {
  const session = await getServerSession();
  const user = await prisma.users.findFirst({
    where: { email: session?.user?.email || "" },
  });
  const company = await prisma.company.findFirst({
    where: { id: user?.companyId },
  });
  return company?.id;
}

export async function getDbUserId() {
  const session = await getServerSession();
  const dbUser = await prisma.users.findFirst({
    where: { email: session?.user?.email || "" },
  });
  return dbUser?.id;
}

export async function getCompanyMenuCategories() {
  const companyId = await getCompanyId();
  return await prisma.menuCategories.findMany({
    where: { companyId, isArchived: false },
    include: { disabledLocationMenuCategories: true },
  });
}

export async function getCompanyMenus() {
  const menuCategories = await getCompanyMenuCategories();
  const menuCategoryIds = menuCategories.map((item) => item.id);
  const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({
    where: { menuCategoryId: { in: menuCategoryIds } },
  });
  const menuIds = menuCategoriesMenus.map((item) => item.menuId);
  return await prisma.menus.findMany({
    where: { id: { in: menuIds } },
    include: { disabledLocationMenus: true },
  });
}

export async function getCompanyAddonCategories() {
  const menus = await getCompanyMenus();
  const menuIds = menus.map((menu) => menu.id);
  const menusAddonCategories = await prisma.menusAddonCategories.findMany({
    where: { menuId: { in: menuIds } },
  });
  const addonCategoryIds = menusAddonCategories.map(
    (item) => item.addonCategoryId
  );
  return await prisma.addonCategories.findMany({
    where: { id: { in: addonCategoryIds } },
  });
}

export async function getCompanyAddons() {
  const addonCategories = await getCompanyAddonCategories();
  const addonCategoryIds = addonCategories.map((item) => item.id);
  return await prisma.addons.findMany({
    where: { addonCategoryId: { in: addonCategoryIds } },
  });
}

export async function getCompanyLocations() {
  return await prisma.locations.findMany({
    where: { companyId: await getCompanyId() },
    orderBy: { id: "asc" },
  });
}

export async function getSelectedLocations() {
  return await prisma.selectedLocations.findFirst({
    where: { userId: await getDbUserId() },
    include: { location: true },
  });
}

export async function getSelectedLocationTables() {
  const selectedLocationId = (await getSelectedLocations())?.locationId;
  return prisma.tables.findMany({ where: { locationId: selectedLocationId } });
}

export async function getCompanyByTableId(tableId: string) {
  const table = await prisma.tables.findFirst({
    where: { id: Number(tableId) },
  });
  const location = await prisma.locations.findFirst({
    where: { id: table?.locationId },
  });
  return await prisma.company.findFirst({
    where: { id: location?.companyId },
  });
}

export async function getMenuCategoriesByTableId(tableId: string) {
  const company = await getCompanyByTableId(tableId);
  const menuCategories = await prisma.menuCategories.findMany({
    where: { companyId: company?.id, isArchived: false },
  });
  const table = await prisma.tables.findFirst({
    where: { id: Number(tableId) },
  });
  const location = await prisma.locations.findFirst({
    where: { id: table?.locationId },
  });
  const disabledLocationMenuCategories =
    await prisma.disabledLocationMenuCategories.findMany({
      where: { locationId: location?.id },
    });
  const disabledLocationMenuCategoryIds = disabledLocationMenuCategories.map(
    (item) => item.menuCategoryId
  );
  return menuCategories.filter(
    (item) => !disabledLocationMenuCategoryIds.includes(item.id)
  );
}
