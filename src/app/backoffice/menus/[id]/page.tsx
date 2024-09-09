import { getCompanyMenuCategories } from "@/libs/action";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { deleteMenu, getMenu, updateMenu } from "../actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function MenuUpdatePage({ params }: Props) {
  const { id } = params;
  const menu = await getMenu(Number(id));
  const selected = menu?.MenuCategoriesMenu.map((item) => item.menuCategoryId);
  const menuCategories = await getCompanyMenuCategories();

  return (
    <>
      <Box
        component={"form"}
        action={deleteMenu}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <input hidden value={id} name="id" />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content" }}
          color="error"
        >
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={updateMenu}
        sx={{ mt: 2, display: "flex", flexDirection: "column" }}
      >
        <input hidden value={id} name="id" />
        <TextField defaultValue={menu?.name} name="name" />
        <TextField defaultValue={menu?.price} sx={{ my: 2 }} name="price" />
        <Box>
          <Typography>Menu categories</Typography>
          <Box
            sx={{
              border: "1px solid lightgray",
              px: 1.2,
              py: 1,
              borderRadius: 1,
            }}
          >
            {menuCategories.map((menuCategory) => (
              <FormControlLabel
                key={menuCategory.id}
                control={
                  <Checkbox
                    defaultChecked={selected?.includes(menuCategory.id)}
                    name="menuCategories"
                    value={menuCategory.id}
                  />
                }
                label={menuCategory.name}
              />
            ))}
          </Box>
        </Box>
        <FormControlLabel
          control={
            <Checkbox defaultChecked={menu?.isAvailable ? true : false} />
          }
          label="Available"
          name="isAvailable"
        />

        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 3 }}
          type="submit"
        >
          Update
        </Button>
      </Box>
    </>
  );
}
