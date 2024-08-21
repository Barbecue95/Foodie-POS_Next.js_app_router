import { Menus } from "@/pages/backoffice/menus";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface Props {
  menu: Menus;
}

export default function MenuCard({ menu }: Props) {
  const { name, price, isAvailable } = menu;

  return (
    <Card
      style={{
        width: "250px",
        maxWidth: "20rem",
        overflow: "hidden",
        borderRadius: "0.5rem",
        boxShadow:
          "0 1px 2px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-0.5rem)";
        e.currentTarget.style.boxShadow =
          "0 2px 4px rgba(0, 0, 0, 0.1), 0 15px 25px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 1px 2px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)";
      }}
    >
      <Box style={{ position: "relative" }}>
        <CardMedia
          component="img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_ECJCyFLy3Ul0kJ2Lu-ZJcPohYKz4Wcnvh4FfFjKd5H2KPYZz1Zqxiq-kuq9n24mSl0&usqp=CAU"
          alt="Product Image"
          height="150"
          width="200"
          style={{ aspectRatio: "100/400", objectFit: "cover" }}
        />
        <Box
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            borderRadius: "0.25rem",
            padding: "0.25rem 0.75rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            backgroundColor: isAvailable ? "#38a169" : "#e53e3e",
            color: isAvailable ? "#f0fff4" : "#fff5f5",
          }}
        >
          {isAvailable ? "In Stock" : "Out of Stock"}
        </Box>
      </Box>
      <CardContent style={{ padding: "1rem", backgroundColor: "#fff" }}>
        <Typography style={{ fontWeight: "bold" }}>{name}</Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "0.5rem",
          }}
        >
          <Typography style={{ fontWeight: "bold" }}>{price}Ks</Typography>
          <Link href={`/backoffice/menus/${menu.id}`}>
            <Button variant="contained" color="success" size="small">
              Edit
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
