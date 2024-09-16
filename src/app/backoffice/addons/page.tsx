import ItemCard from "@/components/ItemCard";
import { getCompanyAddons } from "@/libs/action";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function AddonsPage() {
  const addons = await getCompanyAddons();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
        <h1>Addons</h1>
        <Link href={"/backoffice/addons/new"}>
          <Button variant="contained">New Addon</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {addons.map((addon) => (
          <ItemCard
            key={addon.id}
            icon={<EggIcon fontSize="large" />}
            title={addon.name}
            href={`/backoffice/addons/${addon.id}`}
            isAvailable
          />
        ))}
      </Box>
    </>
  );
}
