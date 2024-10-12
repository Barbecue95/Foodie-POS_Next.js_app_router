"use server";

import { prisma } from "@/libs/prisma";
import { ORDERSTATUS } from "@prisma/client";

export async function getTableTotalPriceByOrderId(orderId: number) {
  const order = await prisma.orders.findFirst({
    where: { id: orderId },
    include: { ordersAddons: true, menu: true },
  });
  if (!order) return 0;

  //To find addons
  const addonIds = order.ordersAddons.map((item) => item.addonId);
  const addons = await prisma.addons.findMany({
    where: { id: { in: addonIds } },
  });

  //To find Menu Price
  let totalPrice = order.menu.price;
  //Add all addon prices into total price
  if (addons.length) {
    for (const addon of addons) {
      totalPrice += addon.price;
    }
  }
  //return totalprice multiplying with order quantitites
  return totalPrice * order.quantity;
}

export async function updateOrderStatus(orderId: number, status: ORDERSTATUS) {
  await prisma.orders.update({ data: { status }, where: { id: orderId } });
}
