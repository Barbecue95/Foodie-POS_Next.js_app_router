import { OrdersWithMenusTablesOrderAddons } from "@/app/backoffice/orders/[status]/page";
import OrderCard from "@/components/OrderCard";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import Link from "next/link";
import { getTableTotalPrice } from "../cart/action";

interface Props {
  searchParams: {
    tableId: string;
  };
}

export default async function ActiveOrderPage({ searchParams }: Props) {
  const tableId = Number(searchParams.tableId);
  const orders: OrdersWithMenusTablesOrderAddons[] =
    await prisma.orders.findMany({
      where: { tableId, NOT: { status: ORDERSTATUS.CART } },
      include: { menu: true, ordersAddons: true, table: true },
    });
  if (!orders.length)
    return (
      <Box
        sx={{
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography variant="h3">You Haven't Ordered Yet.</Typography>
        <Link href={`/order?tableId=${tableId}`}>
          <Button variant="contained" sx={{ p: 2, borderRadius: 15 }}>
            <ArrowBack />
            Start Order Now
          </Button>
        </Link>
      </Box>
    );
  return (
    <Box sx={{ pt: 2 }}>
      <h1 style={{ textAlign: "center", paddingBottom: 10 }}>
        Your Orders List
      </h1>
      <Box
        sx={{
          maxWidth: 1300,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        {orders.map(async (order) => {
          const { id, menu, quantity } = order;
          const addonIds = order.ordersAddons.map((item) => item.addonId);
          const addons = await prisma.addons.findMany({
            where: { id: { in: addonIds } },
            include: { addonCategory: true },
          });
          return <OrderCard order={order} addons={addons} />;
        })}
      </Box>
      <Divider sx={{ borderBottomWidth: 3, mb: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">
          Total Price : {getTableTotalPrice(tableId)}
        </Typography>
      </Box>
    </Box>
  );
}
