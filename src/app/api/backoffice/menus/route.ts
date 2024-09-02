import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const menu = await req.json();
  const { name, price, isAvailable, menuCategoryIds } = menu;
  const isValid = name && menuCategoryIds.length > 0;
  if (!isValid)
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  const createdMenu = await prisma.menus.create({
    data: {
      name: name,
      price: price,
      isAvailable: isAvailable,
    },
  });
  const data = menuCategoryIds.map((menuCategoryId: number) => ({
    menuId: createdMenu.id,
    menuCategoryId,
  }));
  console.log(data);
  await prisma.menuCategoriesMenus.createMany({
    data,
  });
  return NextResponse.json(null, { status: 200 });
}

export async function PUT(req: Request) {
  const menu = await req.json();
  const { menuCategoryIds, id, name, price, isAvailable } = menu;
  const isValid = menu.name;
  if (!isValid)
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  await prisma.menus.update({
    data: { name, price, isAvailable },
    where: { id },
  });
  const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({
    where: { menuId: id },
  });
  const menuMenuCategoryIds = menuCategoriesMenus.map(
    (item) => item.menuCategoryId
  );
  const isSame =
    menuCategoryIds.length === menuMenuCategoryIds.length &&
    menuCategoryIds.every((item: number) => menuMenuCategoryIds.includes(item));
  if (!isSame) {
    await prisma.menuCategoriesMenus.deleteMany({ where: { menuId: id } });
    const data = menuCategoryIds.map((menuCategoryId: number) => ({
      menuId: id,
      menuCategoryId,
    }));
    await prisma.menuCategoriesMenus.createMany({ data });
  }
  return NextResponse.json(null, { status: 200 });
}
