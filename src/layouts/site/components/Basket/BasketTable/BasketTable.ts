import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableRow, } from "@mui/material";
import { useTranslation } from "react-i18next";
import BasketItem from "../BasketItem";
const BasketTable = ({ basketItems, handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveItem, }) => {
    const { t } = useTranslation();
    return (_jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: t("image") }), _jsx(TableCell, { children: t("productName") }), _jsx(TableCell, { children: t("priceBasket") }), _jsx(TableCell, { children: t("quantity") }), _jsx(TableCell, { children: t("subtotal") }), _jsx(TableCell, { children: t("remove") })] }) }), _jsx(TableBody, { children: basketItems.map((basketItem) => {
                    const { productCount } = basketItem;
                    if (!basketItem) {
                        return (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, children: t("Loading") }) }, basketItem?._id));
                    }
                    if (!basketItem?.images || basketItem?.images?.length === 0) {
                        return (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, children: t("NoImageAvailable") }) }, basketItem?._id));
                    }
                    return (_jsx(BasketItem, { product: basketItem, basketItem: { productCount, _id: basketItem._id }, handleIncreaseQuantity: handleIncreaseQuantity, handleDecreaseQuantity: handleDecreaseQuantity, handleRemoveItem: handleRemoveItem }, basketItem._id));
                }) })] }));
};
export default BasketTable;
