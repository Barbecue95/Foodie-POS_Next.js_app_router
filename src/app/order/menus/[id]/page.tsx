import { MenuOptions } from "@/components/MenuOptions";
import { OrderAppHeader } from "@/components/OrderAppHeader";
import { getCompanyByTableId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { Box } from "@mui/material";
import { Prisma } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    tableId: string;
  };
}

export type MenuWithMenusAddonCategories = Prisma.MenusGetPayload<{
  include: { menusAddonCategories: true };
}>;

export type OrdersWithOrdersAddons = Prisma.OrdersGetPayload<{
  include: { ordersAddons: true };
}>;

export default async function MenuDetailPage({ params, searchParams }: Props) {
  const company = await getCompanyByTableId(searchParams.tableId);
  const menu = await prisma.menus.findFirst({
    where: { id: Number(params.id) },
    include: { menusAddonCategories: true },
  });
  const addonCategoryIds = menu?.menusAddonCategories.map(
    (item) => item.addonCategoryId
  );
  const addonCategories = await prisma.addonCategories.findMany({
    where: { id: { in: addonCategoryIds } },
  });
  const addons = await prisma.addons.findMany({
    where: { addonCategoryId: { in: addonCategoryIds } },
  });
  console.log("addonCategories: ", addonCategories);

  if (!menu || !company) return null;
  return (
    <Box>
      <OrderAppHeader
        company={company}
        headerMenuImageUrl={menu.imageUrl as string}
      />
      <MenuOptions
        menu={menu}
        addonCategories={addonCategories}
        addons={addons}
        tableId={searchParams.tableId}
      />
    </Box>
  );
}
