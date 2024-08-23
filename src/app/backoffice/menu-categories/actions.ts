"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function updateMenuCategory(formData: any) {
  const menuCategoryName = formData.get("menuCategoryName");
  const menuCategoryId = formData.get("menuCategoryId");
  await prisma.menuCategories.update({
    data: { name: menuCategoryName },
    where: { id: Number(menuCategoryId) },
  });
  redirect("/backoffice/menu-categories");
}

export async function createMenuCategory(formData: any) {
  const newMenuCategory = formData.get("menuCategoryName");
  await prisma.menuCategories.create({ data: { name: newMenuCategory } });
  redirect("/backoffice/menu-categories");
}

export async function deleteMenuCategory(formData: any) {
  const menuCategoryId = formData.get("menuCategoryId");
  await prisma.menuCategories.delete({ where: { id: Number(menuCategoryId) } });
  redirect("/backoffice/menu-categories");
}
