import ItemCard from "@/components/ItemCard";
import { getSelectedLocationTables } from "@/libs/action";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function TablesPage() {
  const tables = await getSelectedLocationTables();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
        <h1>Tables</h1>
        <Link href={"/backoffice/tables/new"}>
          <Button variant="contained">New Table</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {tables.map((table) => (
          <ItemCard
            key={table.id}
            icon={<TableBarIcon fontSize="large" />}
            title={table.name}
            href={`/backoffice/tables/${table.id}`}
            isAvailable
          />
        ))}
      </Box>
    </>
  );
}
