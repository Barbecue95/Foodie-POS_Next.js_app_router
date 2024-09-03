"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getMenuCategories() {
  return await prisma.menuCategories.findMany();
}

export async function updateMenuCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("id");
  await prisma.menuCategories.update({
    data: { name },
    where: { id: Number(id) },
  });
  redirect("/backoffice/menu-categories");
}

export async function createMenuCategory(formData: FormData) {
  const name = formData.get("name") as string;
  await prisma.menuCategories.create({ data: { name } });
  redirect("/backoffice/menu-categories");
}

export async function deleteMenuCategory(formData: FormData) {
  const id = formData.get("id");
  await prisma.menuCategories.delete({ where: { id: Number(id) } });
  redirect("/backoffice/menu-categories");
}
