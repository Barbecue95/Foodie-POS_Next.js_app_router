import { getCompanyMenuCategories } from "@/libs/action";
import { NewMenuForm } from "./NewMenuForm";

export default async function NewMenuPage() {
  const menuCategories = await getCompanyMenuCategories();

  return <NewMenuForm menuCategories={menuCategories} />;
}
