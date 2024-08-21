export function TopBar() {
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
      <div>
        <h4>Sanchaung</h4>
      </div>
      <div>
        <h4 style={{cursor: "pointer"}}>Log out</h4>
      </div>
    </div>
  );
}