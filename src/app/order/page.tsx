import { OrderAppHeader } from "@/components/OrderAppHeader";
import { getCompanyByTableId, getMenuCategoriesByTableId } from "@/libs/action";
import { Box } from "@mui/material";

interface Props {
  searchParams: {
    tableId: string;
  };
}

export default async function Order({ searchParams }: Props) {
  const company = await getCompanyByTableId(searchParams.tableId);
  const menuCategories = await getMenuCategoriesByTableId(searchParams.tableId);
  console.log(menuCategories);

  if (!company) return null;
  return (
    <Box>
      <OrderAppHeader company={company} />
    </Box>
  );
}
