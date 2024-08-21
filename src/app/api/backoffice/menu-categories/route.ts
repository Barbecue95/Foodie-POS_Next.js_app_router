import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const menuCategories = await prisma.menuCategories.findMany();
  return NextResponse.json({ menuCategories }, { status: 200 });
}

export async function POST(req: Request) {
  const menuCategory = await req.json();
  console.log(menuCategory);
  const isValid = menuCategory.name;
  if (!isValid)
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  await prisma.menuCategories.create({
    data: {
      name: menuCategory.name,
    },
  });
  return NextResponse.json(null, { status: 200 });
}

export async function PUT(req: Request) {
  const menuCategories = await req.json();
  const { id, name } = menuCategories;
  const isValid = menuCategories.name;
  if (!isValid)
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  await prisma.menuCategories.update({
    data: { name },
    where: { id },
  });
  return NextResponse.json(null, { status: 200 });
}
