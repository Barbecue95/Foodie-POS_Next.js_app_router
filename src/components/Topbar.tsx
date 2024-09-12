import { getSelectedLocations } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import LocationSignOut from "./SignOutButton";

export async function TopBar() {
  const selectedLocation = await getSelectedLocations();
  const location = await prisma.locations.findFirst({
    where: { id: selectedLocation?.locationId },
  });

  return (
    <div
      style={{
        height: 60,
        backgroundColor: "#e63946",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        fontSize: 18,
        padding: "0 20px",
      }}
    >
      <h4>Foodie POS</h4>
      <h4>{location?.name}</h4>
      <LocationSignOut />
    </div>
  );
}
