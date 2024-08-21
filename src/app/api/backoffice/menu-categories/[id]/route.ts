import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  const { id } = params;

  const menuCategories = await prisma.menuCategories.findFirst({
    where: { id: Number(id) },
  });
  if (!menuCategories)
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });

  return NextResponse.json({ menuCategories }, { status: 200 });
}

export async function DELETE(req: Request, { params }: Props) {
  const { id } = params;
  await prisma.menuCategoriesMenus.deleteMany({
    where: { menuCategoryId: Number(id) },
  });
  await prisma.menuCategories.delete({ where: { id: Number(id) } });

  return NextResponse.json(null, { status: 200 });
}
