import { Box, Button, TextField } from "@mui/material";
import { getCompany, updateCompany } from "./action";

export default async function MenuUpdate() {
  const company = await getCompany();
  return (
    <>
      <h1 style={{ marginBottom: 10 }}>Company Update Page</h1>
      <Box
        component={"form"}
        action={updateCompany}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          marginBottom: 1,
          position: "absolute",
        }}
      >
        <TextField sx={{ mb: 1 }} defaultValue={company?.name} name="name" />
        <input type="hidden" value={company?.id} name="id" />
        <Button type="submit" variant="contained" sx={{ width: 100 }}>
          Update
        </Button>
      </Box>
    </>
  );
}
