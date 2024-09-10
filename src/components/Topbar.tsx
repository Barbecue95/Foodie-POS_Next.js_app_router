import { getCompanyLocations } from "@/libs/action";
import LocationSignOut from "./LocationSignOut";

export async function TopBar() {
  const locations = await getCompanyLocations();
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
      <div>
        <h4>Foodie POS</h4>
      </div>
      <LocationSignOut locations={locations} />
    </div>
  );
}
