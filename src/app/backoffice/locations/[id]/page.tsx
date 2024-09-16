import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteLocation, getLocation, updateLocation } from "../actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function LocationUpdatePage({ params }: Props) {
  const { id } = params;
  const location = await getLocation(Number(id));
  const selectedLocationId =
    location.selectedLocations.length > 0
      ? location.selectedLocations[0].locationId
      : 0;
  const isSelected = Number(id) === selectedLocationId;

  return (
    <>
      <Box
        component={"form"}
        action={deleteLocation}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <input hidden defaultValue={id} name="id" />
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
        action={updateLocation}
        sx={{ mt: 2, display: "flex", flexDirection: "column" }}
      >
        <input hidden defaultValue={id} name="id" />
        <input type="hidden" />
        <TextField defaultValue={location?.name} name="name" />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isSelected}
              value={String(isSelected)}
              name="isSelected"
            />
          }
          label={"Current location"}
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
