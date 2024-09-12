import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Menus } from "@prisma/client";
import Link from "next/link";

interface Props {
  menu: Menus;
  isAvailable: boolean;
}

export default function MenuCard({ menu, isAvailable }: Props) {
  const { name, price } = menu;
  console.log(menu);
  return (
    <Link
      href={`/backoffice/menus/${menu.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          width: 285,
          borderRadius: 2,
          mr: 3,
          mb: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          image="https://images.squarespace-cdn.com/content/v1/5a81c36ea803bb1dd7807778/1610403788186-K2ATWJRYLHVC4ENCZZ7D/Shan+khaut+swe+%28Shan+sticky+noodles%29"
          alt="Menu Item"
          sx={{
            width: "100%",
            height: 100,
            borderRadius: "8px 8px 0 0",
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mr={1}>
              {name}
            </Typography>
            <Chip
              label={`${price}Ks`}
              variant="filled"
              sx={{
                bgcolor: "#A8DADC",
                color: "#1D3557",
                fontWeight: "medium",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Chip
              label={isAvailable ? "Available" : "Sold out"}
              variant="outlined"
              sx={{
                fontWeight: "medium",
                bgcolor: isAvailable ? "#DCFCE6" : "#E63946",
                color: isAvailable ? "#1D3557" : "#F1FAEE",
                border: 0,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
