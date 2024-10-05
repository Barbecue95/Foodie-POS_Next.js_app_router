import { Box, Divider, Typography } from "@mui/material";
import { getTableTotalPrice } from "./action";

interface Props {
  searchParams: {
    tableId: string;
  };
}

export default async function CartPage({ searchParams }: Props) {
  const tableId = Number(searchParams.tableId);
  const cartOrders = await prisma.orders.findMany({
    where: { tableId },
    include: { menu: true },
  });
  if (!cartOrders.length) return null;
  return (
    <Box sx={{ pt: 2 }}>
      <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
        {cartOrders.map(async (cartOrder) => {
          const { id, menu, quantity } = cartOrder;
          const orderAddons = await prisma.ordersAddons.findMany({
            where: { orderId: id },
            include: { addon: true },
          });
          const addons = orderAddons.map((item) => item.addon);
          return (
            <Box key={cartOrder.id} sx={{ mb: 5 }}>
              <Box
                key={cartOrder.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: "#669bbc",
                      borderRadius: "50%",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mr: 2,
                    }}
                  >
                    {quantity}
                  </Typography>
                  <Typography>{menu.name}</Typography>
                </Box>
                <Typography>{menu.price}</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", ml: 6 }}>
                {addons.map((addon) => {
                  return (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      fontStyle={"italic"}
                    >
                      <Typography>{addon.name}</Typography>
                      <Typography>{addon.price}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
        <Divider sx={{ borderBottomWidth: 3, mb: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h5">
            Total Price : {getTableTotalPrice(tableId)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
