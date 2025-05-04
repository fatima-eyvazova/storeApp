import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TableCell from "@mui/material/TableCell";
import { TableHead, Table, TableContainer, Checkbox, TableRow, Paper, } from "@mui/material";
import CategoryItem from "../CategoryItem/CategoryItem";
import { tableCellStyle } from "../../../../../constants";
const CategoryTable = ({ list, setOpen, setUpdateList, selectedItems, setSelectedItems, }) => {
    const handleCheckboxChange = (itemId) => {
        const updatedSelectedItems = selectedItems.includes(itemId)
            ? selectedItems.filter((id) => id !== itemId)
            : [...selectedItems, itemId];
        setSelectedItems(updatedSelectedItems);
    };
    const selectCheckboxes = () => {
        if (selectedItems.length === list.length) {
            setSelectedItems([]);
        }
        else {
            const allItemIds = list.map((item) => item._id);
            setSelectedItems(allItemIds);
        }
    };
    const listArr = Array.isArray(list);
    const isChecked = selectedItems.length === list.length;
    return (_jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 500 }, "aria-label": "custom pagination table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { sx: tableCellStyle, children: _jsx(Checkbox, { style: { backgroundColor: "white" }, checked: isChecked, onChange: selectCheckboxes }) }), _jsx(TableCell, { align: "left", sx: tableCellStyle, children: "Icon" }), _jsx(TableCell, { align: "left", sx: tableCellStyle, children: "Name" }), _jsx(TableCell, { align: "left", sx: tableCellStyle, children: "Actions" })] }) }), listArr
                    ? list.map((item) => (_jsx(CategoryItem, { item: item, setOpen: setOpen, setUpdateList: setUpdateList, selectedItems: selectedItems, handleCheckboxChange: handleCheckboxChange }, item?._id)))
                    : []] }) }));
};
export default CategoryTable;
