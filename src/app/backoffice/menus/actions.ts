"use server";

import { getSelectedLocations } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number({ message: "Required Id is Missing" }),
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" }),
  price: z.number({ message: "Price must be a number" }),
  isAvailable: z.boolean(),
  menuCategoryIds: z
    .array(z.number())
    .min(1, { message: "Choose at least 1 menu Cateogry" }),
  imageUrl: z.string(),
});

const createMenuValid = FormSchema.omit({ id: true, isAvailable: true });
const deleteMenuValid = FormSchema.pick({ id: true });

export async function getMenus() {
  await prisma.menus.findMany();
}

export async function getMenu(id: number) {
  const menu = await prisma.menus.findFirst({
    where: { id },
    include: { MenuCategoriesMenu: true, disabledLocationMenus: true },
  });
  if (!menu) return redirect("/backoffice/menus");
  return menu;
}

export async function createMenu(formData: FormData) {
  try {
    const { name, price, menuCategoryIds, imageUrl } = createMenuValid.parse({
      name: formData.get("name"),
      price: Number(formData.get("price")),
      menuCategoryIds: formData
        .getAll("menuCategories")
        .map((id) => Number(id)),
      imageUrl:
        formData.get("imageUrl") ||
        "https://du5rltxiueuvhnve.public.blob.vercel-storage.com/default%20menu-ssDeYqrzt0HeCgIzqQtjIyCiOsidtd.png",
    });
    const menu = await prisma.menus.create({
      data: {
        name,
        price: price,
        imageUrl,
      },
    });
    const data = menuCategoryIds.map((menuCategoryId) => ({
      menuId: menu.id,
      menuCategoryId,
    }));
    await prisma.menuCategoriesMenus.createMany({ data });
    /*     if (file.size) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const { url } = await put(
        `foodie-pos/menus/${new Date().getTime()}-${file.name}`,
        buffer,
        {
          access: "public",
        }
      );
      await prisma.menus.update({
        data: { ...menu, imageUrl: url },
        where: { id: menu.id },
      });
    } */
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.errors.map((item) => item.message).join(".");
      return { error: errorMessages };
    }
    return { error: "Something went wrong. Please contact our support." };
  }
  return { error: null };
}

export async function updateMenu(formData: FormData) {
  const { id, name, price, isAvailable } = FormSchema.parse({
    id: formData.get("id"),
    name: formData.get("name"),
    price: formData.get("price"),
    isAvailable: formData.get("isAvailable"),
  });
  const menuCategoryIds = formData
    .getAll("menuCategories")
    .map((id) => Number(id));
  await prisma.menus.update({
    data: { name, price: Number(price) },
    where: { id: Number(id) },
  });
  await prisma.menuCategoriesMenus.deleteMany({
    where: { menuId: Number(id) },
  });
  const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({
    where: { menuId: Number(id) },
  });
  const menuMenuCategoryIds = menuCategoriesMenus.map((item) => item.id);
  const isSame =
    menuCategoryIds.length === menuMenuCategoryIds.length &&
    menuCategoryIds.every((itemId: number) =>
      menuMenuCategoryIds.includes(itemId)
    );
  if (!isSame) {
    const data = menuCategoryIds.map((menuCategoryId) => ({
      menuId: Number(id),
      menuCategoryId,
    }));
    await prisma.menuCategoriesMenus.createMany({ data });
  }
  const selectedLocationId = (await getSelectedLocations())?.locationId;
  if (!isAvailable) {
    await prisma.disabledLocationMenus.create({
      data: {
        locationId: Number(selectedLocationId),
        menuId: Number(id),
      },
    });
  } else {
    const disabledLocationMenus = await prisma.disabledLocationMenus.findFirst({
      where: { menuId: Number(id) },
    });
    if (disabledLocationMenus) {
      await prisma.disabledLocationMenus.delete({
        where: { id: disabledLocationMenus?.id },
      });
    }
  }
  redirect("/backoffice/menus");
}

export async function deleteMenu(formData: FormData) {
  try {
    const { id } = deleteMenuValid.parse({ id: Number(formData.get("id")) });
    await prisma.menuCategoriesMenus.deleteMany({ where: { menuId: id } });
    await prisma.menusAddonCategories.deleteMany({ where: { menuId: id } });
    await prisma.menus.update({ data: { isArchived: true }, where: { id } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.errors.map((item) => item.message).join(".");
      return { error: errorMessages };
    }
    return { error: "Something went wrong. Please contact our support." };
  }
  redirect("/backoffice/menus");
}
