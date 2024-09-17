"use server";

import { getCompanyId, getSelectedLocations } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function updateMenuCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("id");
  const isAvailable = formData.get("isAvailable");
  await prisma.menuCategories.update({
    data: { name: name },
    where: { id: Number(id) },
  });
  const selectedLocationId = (await getSelectedLocations())?.locationId;
  if (!isAvailable) {
    await prisma.disabledLocationMenuCategories.create({
      data: {
        menuCategoryId: Number(id),
        locationId: Number(selectedLocationId),
      },
    });
  } else {
    const disabledLocationMenuCategories =
      await prisma.disabledLocationMenuCategories.findFirst({
        where: { menuCategoryId: Number(id) },
      });
    if (disabledLocationMenuCategories) {
      await prisma.disabledLocationMenuCategories.delete({
        where: { id: disabledLocationMenuCategories?.id },
      });
    }
  }
  redirect("/backoffice/menu-categories");
}

export async function createMenuCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    await prisma.menuCategories.create({
      data: { name, companyId: (await getCompanyId()) as number },
    });
  } catch (err) {
    console.log(err);
    return;
  }
  redirect("/backoffice/menu-categories");
}

export async function deleteMenuCategory(formData: FormData) {
  const id = formData.get("id");
  await prisma.disabledLocationMenuCategories.deleteMany({
    where: { menuCategoryId: Number(id) },
  });
  await prisma.menuCategories.update({
    data: { isArchived: true },
    where: { id: Number(id) },
  });
  redirect("/backoffice/menu-categories");
}
