"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getMenuCategories() {
  return await prisma.menuCategories.findMany();
}

export async function updateMenuCategory(formData: FormData) {
  const menuCategoryName = formData.get("menuCategoryName") as string;
  const menuCategoryId = formData.get("menuCategoryId");
  await prisma.menuCategories.update({
    data: { name: menuCategoryName },
    where: { id: Number(menuCategoryId) },
  });
  redirect("/backoffice/menu-categories");
}

export async function createMenuCategory(formData: FormData) {
  const newMenuCategory = formData.get("menuCategoryName") as string;
  await prisma.menuCategories.create({ data: { name: newMenuCategory } });
  redirect("/backoffice/menu-categories");
}

export async function deleteMenuCategory(formData: FormData) {
  const menuCategoryId = formData.get("menuCategoryId");
  await prisma.menuCategories.delete({ where: { id: Number(menuCategoryId) } });
  redirect("/backoffice/menu-categories");
}
