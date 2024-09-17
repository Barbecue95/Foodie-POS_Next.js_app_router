"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getAddons() {
  await prisma.addons.findMany();
}

export async function getAddon(id: number) {
  const addon = await prisma.addons.findFirst({
    where: { id },
  });
  if (!addon) return redirect("/backoffice/addons");
  return addon;
}

export async function createAddon(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const addonCategoryId = formData.get("addonCategoryId");
  await prisma.addons.create({
    data: {
      name,
      price: Number(price),
      isAvailable: Boolean(isAvailable),
      addonCategoryId: Number(addonCategoryId),
    },
  });
  redirect("/backoffice/addons");
}

export async function updateAddon(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name") as string;
  const price = formData.get("price");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const addonCategoryId = formData.get("addonCategoryId");
  await prisma.addons.update({
    data: {
      name,
      price: Number(price),
      isAvailable: Boolean(isAvailable),
      addonCategoryId: Number(addonCategoryId),
    },
    where: { id: Number(id) },
  });
  redirect("/backoffice/addons");
}

export async function deleteAddon(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.addons.update({ data: { isArchived: true }, where: { id } });
  redirect("/backoffice/menus");
}
