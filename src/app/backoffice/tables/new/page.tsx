import { Box, Button, TextField } from "@mui/material";
import { createTable } from "../actions";

export default function NewTablePage() {
  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Table </h1>
      <Box
        component={"form"}
        action={createTable}
        sx={{ display: "flex", flexDirection: "column", width: 400 }}
      >
        <TextField sx={{ mb: 2 }} label="Name" name="name" />

        <Button type="submit" variant="contained" sx={{ width: 100, mt: 1 }}>
          Create
        </Button>
      </Box>
    </>
  );
}
