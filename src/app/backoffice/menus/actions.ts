"use server";

import { getSelectedLocations } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z
    .number({ message: "Required Id is Missing." })
    .gt(0, { message: "Id cannot be 0." }),
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long." }),
  price: z.number({ message: "Price must be a number." }),
  isAvailable: z.boolean(),
  menuCategoryIds: z
    .array(z.number())
    .min(1, { message: "Choose at least 1 menu Cateogry." }),
  imageUrl: z.string(),
});

const createMenuValid = FormSchema.omit({ id: true, isAvailable: true });
const UpdateMenuValidate = FormSchema.omit({
  isAvailable: true,
  imageUrl: true,
  menuCategoryIds: true,
});
const deleteMenuValid = FormSchema.pick({ id: true });

export async function getMenus() {
  await prisma.menus.findMany();
}

export async function getMenu(id: number) {
  const menu = await prisma.menus.findFirst({
    where: { id },
    include: {
      MenuCategoriesMenu: true,
      disabledLocationMenus: true,
      menusAddonCategories: true,
    },
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
      return { errors: err.errors };
    }
    return {
      errors: [
        { message: "Something went wrong. Please contact our support." },
      ],
    };
  }
  return { errors: null };
}

export async function updateMenu(formData: FormData) {
  try {
    //Update Menus
    const { id, name, price } = UpdateMenuValidate.parse({
      id: Number(formData.get("id")),
      name: formData.get("name"),
      price: Number(formData.get("price")),
    });
    const isAvailable = formData.get("isAvailable");
    const imageUrl = formData.get("imageUrl") as string;
    const menuCategoryIds = formData
      .getAll("menuCategories")
      .map((item) => Number(item));
    const addonCategoryIds = formData
      .getAll("addonCategories")
      .map((item) => Number(item));
    const menu = await prisma.menus.findFirst({ where: { id } });
    await prisma.menus.update({
      data: {
        name,
        price: Number(price),
        imageUrl: imageUrl ? imageUrl : menu?.imageUrl,
      },
      where: { id: Number(id) },
    });
    await prisma.menus.update({
      data: { name, price: Number(price) },
      where: { id: Number(id) },
    });

    //Update MenuCategories

    const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({
      where: { menuId: Number(id) },
    });
    const existingMenuCategoryIds = menuCategoriesMenus.map(
      (item) => item.menuCategoryId
    );
    const isSameMenuCategoryIds =
      menuCategoryIds.length === existingMenuCategoryIds.length &&
      menuCategoryIds.every((itemId: number) =>
        existingMenuCategoryIds.includes(itemId)
      );
    if (!isSameMenuCategoryIds) {
      await prisma.menuCategoriesMenus.deleteMany({
        where: { menuId: Number(id) },
      });
      const data = menuCategoryIds.map((menuCategoryId) => ({
        menuId: Number(id),
        menuCategoryId,
      }));
      await prisma.menuCategoriesMenus.createMany({ data });
    }

    //Update AddonCategories

    const menuAddonCategories = await prisma.menusAddonCategories.findMany({
      where: { menuId: Number(id) },
    });
    const existingAddonCategoryIds = menuAddonCategories.map(
      (item) => item.addonCategoryId
    );
    const isSameAddonCategoryIds =
      addonCategoryIds.length === existingAddonCategoryIds.length &&
      addonCategoryIds.every((itemId: number) =>
        existingAddonCategoryIds.includes(itemId)
      );
    if (!isSameAddonCategoryIds) {
      await prisma.menusAddonCategories.deleteMany({
        where: { menuId: Number(id) },
      });
      const data = addonCategoryIds.map((addonCategoryId) => ({
        menuId: Number(id),
        addonCategoryId,
      }));
      await prisma.menusAddonCategories.createMany({ data });
    }

    //Update Disabled Locations

    const selectedLocationId = (await getSelectedLocations())?.locationId;
    if (!isAvailable) {
      await prisma.disabledLocationMenus.create({
        data: {
          locationId: Number(selectedLocationId),
          menuId: Number(id),
        },
      });
    } else {
      const disabledLocationMenus =
        await prisma.disabledLocationMenus.findFirst({
          where: { menuId: Number(id) },
        });
      if (disabledLocationMenus) {
        await prisma.disabledLocationMenus.delete({
          where: { id: disabledLocationMenus?.id },
        });
      }
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { errors: err.errors };
    }
    return {
      errors: [
        { message: "Something went wrong. Please contact our support." },
      ],
    };
  }
  revalidatePath("/backoffice/menus");
  return { errors: null };
}

export async function deleteMenu(formData: FormData) {
  try {
    const { id } = deleteMenuValid.parse({ id: Number(formData.get("id")) });
    await prisma.menuCategoriesMenus.deleteMany({ where: { menuId: id } });
    await prisma.menusAddonCategories.deleteMany({
      where: { menuId: Number(id) },
    });
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
