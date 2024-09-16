import ItemCard from "@/components/ItemCard";
import { getCompanyLocations } from "@/libs/action";
import LocationIcon from "@mui/icons-material/LocationOn";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function TablesPage() {
  const locations = await getCompanyLocations();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
        <h1>Tables</h1>
        <Link href={"/backoffice/locations/new"}>
          <Button variant="contained">New Location</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {locations.map((location) => (
          <ItemCard
            key={location.id}
            icon={<LocationIcon fontSize="large" />}
            title={location.name}
            href={`/backoffice/locations/${location.id}`}
            isAvailable
          />
        ))}
      </Box>
    </>
  );
}
