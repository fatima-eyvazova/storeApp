import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { BasketItemType } from "../../../page/Basket/type";
import BasketItem from "../BasketItem";

interface BasketTableProps {
  basketItems: BasketItemType[];
  handleIncreaseQuantity: (
    productId: string,
    currentQuantity: number
  ) => Promise<void>;
  handleDecreaseQuantity: (
    productId: string,
    currentQuantity: number
  ) => Promise<void>;
  handleRemoveItem: (productId: string) => Promise<void>;
  loading: boolean;
}

const BasketTable: React.FC<BasketTableProps> = ({
  basketItems,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveItem,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t("image")}</TableCell>
          <TableCell>{t("productName")}</TableCell>
          <TableCell>{t("priceBasket")}</TableCell>
          <TableCell>{t("quantity")}</TableCell>
          <TableCell>{t("subtotal")}</TableCell>
          <TableCell>{t("remove")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {basketItems.map((basketItem: BasketItemType) => {
          const { productCount } = basketItem;

          if (loading) {
            return (
              <TableRow key={basketItem._id}>
                <TableCell colSpan={6}>{t("Loading")}</TableCell>
              </TableRow>
            );
          }

          if (!basketItem?.images || basketItem?.images?.length === 0) {
            return (
              <TableRow key={basketItem._id}>
                <TableCell colSpan={6}>{t("NoImageAvailable")}</TableCell>
              </TableRow>
            );
          }

          return (
            <BasketItem
              key={basketItem._id}
              product={basketItem}
              basketItem={{ productCount, _id: basketItem._id }}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BasketTable;
