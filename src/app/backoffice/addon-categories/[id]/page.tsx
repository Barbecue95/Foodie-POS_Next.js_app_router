import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteAddonCategory, updateAddonCategory } from "../actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function AddonUpdate({ params }: Props) {
  const { id } = params;
  const addonCategories = await prisma.addonCategories.findFirst({
    where: { id: Number(id) },
  });

  if (!addonCategories) return null;
  return (
    <>
      <h1 style={{ marginBottom: 10 }}>Update AddonCategories Page</h1>
      <Box
        component={"form"}
        action={updateAddonCategory}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          marginBottom: 1,
          position: "absolute",
        }}
      >
        <TextField defaultValue={addonCategories.name} name="name" />
        <input type="hidden" value={id} name="id" />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={addonCategories.isRequired}
              name="isRequired"
            />
          }
          label="Required"
        />
        <Button type="submit" variant="contained" sx={{ width: 100 }}>
          Update
        </Button>
      </Box>
      <Box
        sx={{ textAlign: "center", width: 500, mt: 13.3 }}
        component={"form"}
        action={deleteAddonCategory}
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
