import { getSelectedLocations } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteMenuCategory, updateMenuCategory } from "../actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function MenuCategoriesUpdatePage({ params }: Props) {
  const { id } = params;
  const selectedLocation = await getSelectedLocations();
  const menuCategories = await prisma.menuCategories.findFirst({
    where: { id: Number(id) },
    include: { disabledLocationMenuCategories: true },
  });
  const isAvailable = menuCategories?.disabledLocationMenuCategories.find(
    (item) => item.locationId === selectedLocation?.locationId
  )
    ? false
    : true;

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
          sx={{ mb: 1 }}
          defaultValue={menuCategories.name}
          name="name"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked={isAvailable} />}
          label="Available"
          name="isAvailable"
          sx={{ width: 100 }}
        />
        <input type="hidden" value={id} name="id" />
        <Button type="submit" variant="contained" sx={{ width: 100 }}>
          Update
        </Button>
      </Box>
      <Box
        sx={{ textAlign: "center", width: 500, mt: 14.3 }}
        component={"form"}
        action={deleteMenuCategory}
      >
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ width: 100 }}
        >
          <input type="hidden" value={id} name="id" />
          Delete
        </Button>
      </Box>
    </>
  );
}
