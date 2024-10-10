"use client";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sideBarItems = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/backoffice/orders/pending",
    pathname: "orders",
  },

  {
    id: 2,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-categories",
    pathname: "menu-categories",
  },

  {
    id: 3,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
    pathname: "menus",
  },

  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-categories",
    pathname: "addon-categories",
  },

  {
    id: 5,
    label: "Addons",
    icon: <EggIcon />,
    route: "/backoffice/addons",
    pathname: "addons",
  },

  {
    id: 6,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
    pathname: "tables",
  },

  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
    pathname: "locations",
  },

  {
    id: 8,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
    pathname: "settings",
  },
];

export function SideBar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Box
      sx={{
        height: "100vh",
        width: 350,
        backgroundColor: "#1D3557",
      }}
    >
      <List sx={{ pt: 0 }}>
        {sideBarItems.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <ListItem
              disablePadding
              sx={{
                backgroundColor: pathname.includes(item.pathname)
                  ? "#457B9D"
                  : null,
                ":hover": { backgroundColor: "#457B9D" },
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#E8F6EF" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ color: "#E8F6EF" }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
