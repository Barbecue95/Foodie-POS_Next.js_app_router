import { prisma } from "@/libs/prisma";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import Link from "next/link";

interface Props {
  tableId: number;
}

export async function CartButton({ tableId }: Props) {
  const cartOrder = await prisma.orders.findMany({
    where: { tableId, status: ORDERSTATUS.CART },
  });
  return (
    <Link href={`/order/cart?tableId=${tableId}`}>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          right: { xs: 10, md: 90 },
          top: { xs: 15, md: 10 },
          color: "white",
          alignItems: "center",
        }}
      >
        <ShoppingCartCheckout />
        <Typography variant="h5">{cartOrder.length}</Typography>
      </Box>
    </Link>
  );
}
