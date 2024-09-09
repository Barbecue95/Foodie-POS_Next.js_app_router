import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Orders() {
  const session = await getServerSession();
  if (!session) return redirect("/auth/signIn");
  return <h1>Order Page : {session?.user?.email}</h1>;
}
