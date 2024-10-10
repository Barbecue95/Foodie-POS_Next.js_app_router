"use server";

import { ORDERSTATUS } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateCartOrder {
  menuId: number;
  addonIds: number[];
  quantity: number;
  tableId: number;
}

export async function createCartOrder(payload: CreateCartOrder) {
  const { menuId, addonIds, quantity, tableId } = payload;
  const order = await prisma.orders.create({
    data: {
      menuId,
      tableId,
      quantity,
    },
  });

  if (addonIds.length) {
    for (const addonId of addonIds) {
      await prisma.ordersAddons.create({
        data: {
          orderId: order.id,
          addonId,
        },
      });
    }
  }
  redirect(`/order/cart?tableId=${tableId}`);
}

export async function getTableTotalPrice(tableId: number) {
  const cartOrders = await prisma.orders.findMany({
    where: { tableId, status: ORDERSTATUS.CART },
    include: { ordersAddons: true, menu: true },
  });
  let totalPrice = 0;
  for (const cartOrder of cartOrders) {
    totalPrice += cartOrder.menu.price;
    const orderAddons = cartOrder.ordersAddons;
    for (const orderAddon of orderAddons) {
      const addonId = orderAddon.addonId;
      const addon = await prisma.addons.findFirst({ where: { id: addonId } });
      if (addon) {
        totalPrice += addon.price;
      }
    }
  }
  return totalPrice;
}

export async function deleteCartOrder(formData: FormData) {
  const id = formData.get("id");
  if (!id) return;
  const orderAddons = await prisma.ordersAddons.findMany({
    where: { orderId: Number(id) },
  });
  if (orderAddons.length) {
    await prisma.ordersAddons.deleteMany({ where: { orderId: Number(id) } });
  }
  await prisma.orders.delete({ where: { id: Number(id) } });
  revalidatePath("/order/cart");
}
