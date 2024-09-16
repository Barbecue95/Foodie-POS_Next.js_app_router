"use server";

import { config } from "@/config";
import { getSelectedLocations } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { Tables } from "@prisma/client";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import qrCode from "qrcode";

export async function getTables() {
  await prisma.tables.findMany();
}

export async function getTable(id: number) {
  const table = await prisma.tables.findFirst({
    where: { id },
  });
  if (!table) return redirect("/backoffice/addons");
  return table;
}

export async function createTable(formData: FormData) {
  const name = formData.get("name") as string;
  const table = await prisma.tables.create({
    data: {
      name,
      locationId: (await getSelectedLocations())?.locationId as number,
      qrCodeImageUrl: "",
    },
  });

  await prisma.tables.update({
    data: { ...table, qrCodeImageUrl: await createQrCodeImageUrl(table) },
    where: { id: table.id },
  });
  redirect("/backoffice/tables");
}

export async function updateTable(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name") as string;
  await prisma.tables.update({
    data: {
      name,
    },
    where: { id: Number(id) },
  });
  redirect("/backoffice/tables");
}

export async function deleteTable(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.tables.delete({ where: { id } });
  redirect("/backoffice/tables");
}

export async function createQrCodeImageUrl(table: Tables) {
  const orderAppURL = `${config.orderAppUrl}?tableId=${table.id}`;
  const qrCodeImage = await qrCode.toBuffer(orderAppURL, { scale: 7 });
  const { url } = await put(`foodie-pos/table-${table.id}.png`, qrCodeImage, {
    access: "public",
  });
  return url;
}
