import {
  getCompanyAddonCategories,
  getCompanyMenuCategories,
  getSelectedLocations,
} from "@/libs/action";
import { getMenu } from "../actions";
import { UpdateMenuForm } from "./UpdateMenuForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function MenuUpdatePage({ params }: Props) {
  const { id } = params;
  const selectedLocation = await getSelectedLocations();
  const menu = await getMenu(Number(id));
  const isAvailable = menu.disabledLocationMenus.find(
    (item) => item.locationId === selectedLocation?.locationId
  )
    ? false
    : true;
  const selectedMenuCategories = menu?.MenuCategoriesMenu.map(
    (item) => item.menuCategoryId
  );
  const menuCategories = await getCompanyMenuCategories();
  const selectedAddonCategories = menu?.menusAddonCategories.map(
    (item) => item.addonCategoryId
  );
  const addonCategories = await getCompanyAddonCategories();

  return (
    <UpdateMenuForm
      menu={menu}
      menuCategories={menuCategories}
      isAvailable={isAvailable}
      selectedMenuCategories={selectedMenuCategories}
      addonCategories={addonCategories}
      selectedAddonCategories={selectedAddonCategories}
    />
  );
}
