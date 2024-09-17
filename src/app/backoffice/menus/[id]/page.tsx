import { getCompanyMenuCategories, getSelectedLocations } from "@/libs/action";
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
  const selected = menu?.MenuCategoriesMenu.map((item) => item.menuCategoryId);
  const menuCategories = await getCompanyMenuCategories();

  return (
    <UpdateMenuForm
      menu={menu}
      menuCategories={menuCategories}
      isAvailable={isAvailable}
      selected={selected}
    />
  );
}
