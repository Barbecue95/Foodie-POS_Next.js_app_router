import ItemCard from "@/components/ItemCard";
import { getCompanyAddonCategories } from "@/libs/action";
import ClassIcon from "@mui/icons-material/Class";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function AddonCategoriesPage() {
  const addonCategories = await getCompanyAddonCategories();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
        <h1>Addon-Categories</h1>
        <Link href={"/backoffice/addon-categories/new"}>
          <Button variant="contained">Create New</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {addonCategories.map((addonCategory) => (
          <ItemCard
            key={addonCategory.id}
            icon={<ClassIcon fontSize="large" />}
            title={addonCategory.name}
            href={`/backoffice/addon-categories/${addonCategory.id}`}
            isAvailable
          />
        ))}
      </Box>
    </>
  );
}
