import { prisma } from "@/libs/prisma";
import { Box, Button, TextField } from "@mui/material";
import { deleteMenuCategory, updateMenuCategory } from "../actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function MenuUpdate({ params }: Props) {
  const { id } = params;
  const menuCategories = await prisma.menuCategories.findFirst({
    where: { id: Number(id) },
  });

  if (!menuCategories) return null;
  return (
    <>
      <h1 style={{ marginBottom: 10 }}>Update MenuCategories Page</h1>
      <Box
        component={"form"}
        action={updateMenuCategory}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          marginBottom: 1,
          position: "absolute",
        }}
      >
        <TextField
          sx={{ mb: 2 }}
          defaultValue={menuCategories.name}
          name="menuCategoryName"
        />
        <input type="hidden" value={id} name="menuCategoryId" />
        <Button type="submit" variant="contained" sx={{ width: 100 }}>
          Update
        </Button>
      </Box>
      <Box
        sx={{ textAlign: "center", width: 500, mt: 10.3 }}
        component={"form"}
        action={deleteMenuCategory}
      >
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ width: 100 }}
        >
          <input type="hidden" value={id} name="menuCategoryId" />
          Delete
        </Button>
      </Box>
    </>
  );
}
