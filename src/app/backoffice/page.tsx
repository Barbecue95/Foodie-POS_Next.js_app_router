import { config } from "@/config";
import { redirect } from "next/navigation";

export default async function BackOfficePage() {
  console.log("###################");
  console.log(config);
  console.log("###################");
  redirect("/backoffice/orders/pending");
}
