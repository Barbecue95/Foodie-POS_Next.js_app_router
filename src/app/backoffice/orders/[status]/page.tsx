import { OrderCard } from "@/components/OrderCard";
import { getSelectedLocationTables } from "@/libs/action";
import { Box, Button, ButtonGroup } from "@mui/material";
import { ORDERSTATUS, Prisma } from "@prisma/client";
import Link from "next/link";

interface Props {
  params: {
    status: ORDERSTATUS;
  };
}

export type OrdersWithMenusTablesOrderAddons = Prisma.OrdersGetPayload<{
  include: { menu: true; table: true; ordersAddons: true };
}>;

//type for addons to include addonCaegory to transfer with Props
export type AddonsWithAddonCategories = Prisma.AddonsGetPayload<{
  include: { addonCategory: true };
}>;

export default async function OrdersWithStatusPage({ params }: Props) {
  const status = params.status.toUpperCase();
  const tables = await getSelectedLocationTables();
  const tableIds = tables.map((table) => table.id);
  const orders: OrdersWithMenusTablesOrderAddons[] =
    await prisma.orders.findMany({
      where: {
        tableId: { in: tableIds },
        status: status as keyof typeof ORDERSTATUS,
      },
      include: { menu: true, table: true, ordersAddons: true },
    });

  return (
    <Box>
      <ButtonGroup sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href={"/backoffice/orders/pending"}>
          <Button
            variant={`${
              status === ORDERSTATUS.PENDING ? "contained" : "outlined"
            }`}
            color="secondary"
          >
            PENDING
          </Button>
        </Link>
        <Link href={"/backoffice/orders/cooking"}>
          <Button
            variant={`${
              status === ORDERSTATUS.COOKING ? "contained" : "outlined"
            }`}
            color="error"
          >
            COOKING
          </Button>
        </Link>
        <Link href={"/backoffice/orders/complete"}>
          <Button
            variant={`${
              status === ORDERSTATUS.COMPLETE ? "contained" : "outlined"
            }`}
            color="success"
          >
            COMPLETE
          </Button>
        </Link>
      </ButtonGroup>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mt: 4,
        }}
      >
        {orders.map(async (order) => {
          //get addons linked with order
          const addonIds = order.ordersAddons.map((item) => item.addonId);
          const addons: AddonsWithAddonCategories[] =
            await prisma.addons.findMany({
              where: { id: { in: addonIds } },
              include: { addonCategory: true },
            });
          return <OrderCard order={order} addons={addons} isAdmin />;
        })}
      </Box>
    </Box>
  );
}
