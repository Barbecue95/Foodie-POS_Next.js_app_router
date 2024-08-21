import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  const { id } = params;

  const menu = await prisma.menus.findFirst({
    where: { id: Number(id) },
    include: { MenuCategoriesMenu: true },
  });
  if (!menu)
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });

  return NextResponse.json({ menu }, { status: 200 });
}

export async function DELETE(req: Request, { params }: Props) {
  const { id } = params;
  await prisma.menuCategoriesMenus.deleteMany({
    where: { menuId: Number(id) },
  });
  await prisma.menus.delete({ where: { id: Number(id) } });

  return NextResponse.json(null, { status: 200 });
}
