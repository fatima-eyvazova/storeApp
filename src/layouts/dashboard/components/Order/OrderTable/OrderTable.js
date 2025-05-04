import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableFooter, Grid, TableBody, TablePagination, } from "@mui/material";
import TableItem from "../TableItem/TableItem";
import { orderTableStyle } from "../../../../../constants";
const OrderTable = ({ list, totalCount, page, perPage, setPage, setPerPage, setList, }) => {
    if (!list) {
        return _jsx("div", { children: "Loading..." });
    }
    const handlePageChange = (_, newPage) => {
        if (newPage >= 0)
            setPage(newPage);
    };
    const handleRowsPerPageChange = (event) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (_jsx(TableContainer, { component: Paper, children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 12, children: _jsxs(Table, { sx: { minWidth: 500 }, "aria-label": "custom pagination table", children: [_jsx(TableHead, { sx: { backgroundColor: "#000", color: "#fff" }, style: { backgroundColor: "red" }, children: _jsxs(TableRow, { children: [_jsx(TableCell, { sx: orderTableStyle, align: "left", children: "Order Time" }), _jsx(TableCell, { sx: orderTableStyle, align: "left", children: "Customer Name" }), _jsx(TableCell, { sx: orderTableStyle, align: "left", children: "Amount" }), _jsx(TableCell, { sx: orderTableStyle, align: "left", children: "Status" }), _jsx(TableCell, { sx: orderTableStyle, align: "left", children: "Action" })] }) }), _jsx(TableBody, { sx: { overflow: "auto" }, children: list.length
                                    ? list.map((item) => (_jsx(TableItem, { item: item, setList: setList }, item?._id)))
                                    : null })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TableFooter, { children: _jsx(TableRow, { children: _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], colSpan: 3, count: totalCount, rowsPerPage: perPage, page: page, SelectProps: {
                                    inputProps: {
                                        "aria-label": "rows per page",
                                    },
                                    native: true,
                                }, onPageChange: handlePageChange, onRowsPerPageChange: handleRowsPerPageChange }) }) }) })] }) }));
};
export default OrderTable;
