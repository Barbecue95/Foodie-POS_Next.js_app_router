"use server";

import { prisma } from "@/libs/prisma";
import { Orders, ORDERSTATUS, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateCartOrder {
  menuId: number;
  addonIds: number[];
  quantity: number;
  tableId: number;
  orderId?: number;
}

type OrdersWithOrdersAddonsAndMenus = Prisma.OrdersGetPayload<{
  include: { ordersAddons: true; menu: true };
}>;

export async function createCartOrder(payload: CreateCartOrder) {
  const { menuId, addonIds, quantity, tableId, orderId } = payload;
  let order: Orders;
  if (orderId) {
    const orderAddons = await prisma.ordersAddons.findMany({
      where: { orderId },
    });
    if (orderAddons.length) {
      await prisma.ordersAddons.deleteMany({ where: { orderId } });
    }
    order = await prisma.orders.update({
      data: { quantity },
      where: { id: orderId },
    });
  } else {
    order = await prisma.orders.create({
      data: {
        menuId,
        tableId,
        quantity,
      },
    });
  }
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
  redirect(`/order?tableId=${tableId}`);
}

export async function getTableTotalPrice(
  tableId: number,
  status?: ORDERSTATUS
) {
  let cartOrders: OrdersWithOrdersAddonsAndMenus[] = [];
  if (status) {
    cartOrders = await prisma.orders.findMany({
      where: { tableId, status },
      include: { ordersAddons: true, menu: true },
    });
  } else {
    cartOrders = await prisma.orders.findMany({
      where: { tableId },
      include: { ordersAddons: true, menu: true },
    });
  }

  let totalPrice = 0;
  for (const cartOrder of cartOrders) {
    let orderPrice = cartOrder.menu.price || 0;
    const orderAddons = cartOrder.ordersAddons;
    for (const orderAddon of orderAddons) {
      const addonId = orderAddon.addonId;
      const addon = await prisma.addons.findFirst({ where: { id: addonId } });
      if (addon) {
        orderPrice += addon.price;
      }
    }
    totalPrice += orderPrice * cartOrder.quantity;
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

export async function confirmCartOrder(formData: FormData) {
  const tableId = formData.get("tableId");
  if (!tableId) return;
  const orders = await prisma.orders.findMany({
    where: { tableId: Number(tableId), status: ORDERSTATUS.CART },
  });
  for (const order of orders) {
    await prisma.orders.update({
      data: { status: ORDERSTATUS.PENDING },
      where: { id: order.id },
    });
  }
  revalidatePath("/order/cart");
  revalidatePath("/backoffice/orders/pending");
  redirect(`/order/active-order?tableId=${tableId}`);
}
