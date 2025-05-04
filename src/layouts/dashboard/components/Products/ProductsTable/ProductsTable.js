import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TableCell from "@mui/material/TableCell";
import { TableHead, TableFooter, Table, TableContainer, TablePagination, TableRow, Paper, } from "@mui/material";
import ProductsItem from "../../../../dashboard/components/Products/ProductsItem/ProductsItem";
import { tableCellStyles } from "../../../../../constants";
const ProductsTable = ({ list, selectedItems, totalCount, page, perPage, setOpen, onDeleteProduct, handleCheckboxChange, handleChangePage, handleChangeRowsPerPage, setUpdateList, categories, }) => {
    const listArr = Array.isArray(list);
    return (_jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 500 }, "aria-label": "custom pagination table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { sx: tableCellStyles.head, children: "Product Name" }), _jsx(TableCell, { sx: tableCellStyles.head, align: "left", children: "Category" }), _jsx(TableCell, { sx: tableCellStyles.head, align: "left", children: "Price" }), _jsx(TableCell, { sx: tableCellStyles.head, align: "left", children: "Sale Price" }), _jsx(TableCell, { sx: tableCellStyles.head, align: "left", children: "Stock" }), _jsx(TableCell, { sx: tableCellStyles.head, align: "left", children: "View" }), _jsx(TableCell, { sx: tableCellStyles.head, align: "left", children: "Published" }), _jsx(TableCell, { sx: tableCellStyles.head, align: "left", children: "Actions" })] }) }), listArr
                    ? list.map((item) => (_jsx(ProductsItem, { setOpen: setOpen, item: item, selectedItems: selectedItems, handleCheckboxChange: handleCheckboxChange, setUpdateList: setUpdateList, onDeleteProduct: onDeleteProduct, categories: categories }, item?._id)))
                    : [], _jsx(TableFooter, { children: _jsx(TableRow, { children: _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], colSpan: 3, count: totalCount, rowsPerPage: perPage, page: page, SelectProps: {
                                inputProps: {
                                    "aria-label": "rows per page",
                                },
                                native: true,
                            }, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage }) }) })] }) }));
};
export default ProductsTable;
