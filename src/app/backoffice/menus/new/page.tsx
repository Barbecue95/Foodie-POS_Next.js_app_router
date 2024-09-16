import { NewMenuForm } from "@/components/NewMenuForm";
import { getCompanyMenuCategories } from "@/libs/action";

export default async function NewMenuPage() {
  const menuCategories = await getCompanyMenuCategories();

  return <NewMenuForm menuCategories={menuCategories} />;
}
