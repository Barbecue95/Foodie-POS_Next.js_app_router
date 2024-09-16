import { getCompanyAddonCategories } from "@/libs/action";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { deleteAddon, getAddon, updateAddon } from "../actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function AddonUpdatePage({ params }: Props) {
  const { id } = params;
  const addon = await getAddon(Number(id));
  const addonCategories = await getCompanyAddonCategories();

  return (
    <>
      <Box
        component={"form"}
        action={deleteAddon}
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
        action={updateAddon}
        sx={{ mt: 2, display: "flex", flexDirection: "column" }}
      >
        <input hidden value={id} name="id" />
        <TextField defaultValue={addon?.name} name="name" />
        <TextField defaultValue={addon?.price} sx={{ my: 2 }} name="price" />
        <Box>
          <Typography>Addon categories</Typography>
          <Box
            sx={{
              border: "1px solid lightgray",
              px: 1.2,
              py: 1,
              borderRadius: 1,
            }}
          >
            {addonCategories.map((addonCategory) => (
              <FormControlLabel
                key={addonCategory.id}
                control={
                  <Checkbox
                    defaultChecked={addonCategory.id === addon.addonCategoryId}
                    name="addonCategoryId"
                    value={addonCategory.id}
                  />
                }
                label={addonCategory.name}
              />
            ))}
          </Box>
        </Box>
        <FormControlLabel
          control={
            <Checkbox defaultChecked={addon?.isAvailable ? true : false} />
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
