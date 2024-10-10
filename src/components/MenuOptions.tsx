"use client";

import { createCartOrder } from "@/app/order/cart/action";
import { OrdersWithOrdersAddons } from "@/app/order/menus/[id]/page";
import { Box, Button } from "@mui/material";
import {
  AddonCategories as AddonCategoriesType,
  Addons,
  Menus,
} from "@prisma/client";
import { useEffect, useState } from "react";
import { AddonCategoriesAndAddons } from "./AddonCategoriesAndAddons";
import QuantitySelector from "./QuantitySelector";

interface Props {
  menu: Menus;
  addonCategories: AddonCategoriesType[];
  addons: Addons[];
  tableId: number;
  order?: OrdersWithOrdersAddons | null;
}

export function MenuOptions({
  menu,
  addonCategories,
  addons,
  tableId,
  order,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const requiredAddonCategories = addonCategories.filter(
      (item) => item.isRequired
    );
    const selectedRequiredAddons = selectedAddons.filter((selectedAddon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === selectedAddon.addonCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });
    const isDisabled =
      requiredAddonCategories.length !== selectedRequiredAddons.length;
    setIsDisabled(isDisabled);
  }, [selectedAddons, addonCategories]);

  useEffect(() => {
    if (order) {
      const { quantity, ordersAddons } = order;
      setQuantity(quantity);
      const addonIds = ordersAddons.map((item) => item.addonId);
      const selectedAddons = addons.filter((addon) =>
        addonIds.includes(addon.id)
      );
      setSelectedAddons(selectedAddons);
    }
  }, [order]);

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleCreateOrUpdateCartOrder = async () => {
    await createCartOrder({
      menuId: menu.id,
      addonIds: selectedAddons.map((item) => item.id),
      quantity,
      tableId,
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 10,
        px: 2,
        position: "relative",
        marginTop: { xs: 25, md: -5, lg: -10 },
      }}
    >
      <AddonCategoriesAndAddons
        addonCategories={addonCategories}
        addons={addons}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />
      <QuantitySelector
        value={quantity}
        onDecrease={handleQuantityDecrease}
        onIncrease={handleQuantityIncrease}
      />
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={handleCreateOrUpdateCartOrder}
        sx={{
          width: "fit-content",
          mt: 2,
        }}
      >
        {order ? "Update" : "Add to cart"}
      </Button>
    </Box>
  );
}
