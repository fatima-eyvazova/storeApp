import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import Drawer from "@mui/material/Drawer";
import { Box, Typography, Button } from "@mui/material";
import { useGetCategoriesQuery, useDeleteCategoryMutation, } from "../../../../redux/slices/shared/apiSlice";
import CategoryTable from "../../components/Category/CategoryTable/CategoryTable";
import AddEditeCategory from "../../components/Category/AddEditeCategory/AddEditeCategory";
import Sidebar from "../../components/Sidebar/Sidebar";
import { headerStyles } from "../../../../constants";
const CategoryPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const { data, error, isLoading } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const closeDrawer = () => {
        setOpen(false);
    };
    const handleDeleteSelectedItems = async () => {
        for (const itemId of selectedItems) {
            await deleteCategory(itemId);
        }
        setSelectedItems([]);
    };
    if (isLoading)
        return _jsx(Typography, { children: "Loading..." });
    if (error)
        return _jsx(Typography, { children: "Error loading categories" });
    const listData = data?.data || [];
    return (_jsx(Sidebar, { children: _jsxs(Box, { sx: { padding: "20px" }, children: [_jsxs(Box, { sx: headerStyles, children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: "bold" }, children: "Category" }), _jsxs(Box, { children: [_jsx(Button, { variant: "contained", color: "secondary", startIcon: _jsx(RiDeleteBin6Line, {}), sx: { marginRight: "10px" }, onClick: handleDeleteSelectedItems, disabled: !selectedItems.length, children: "Delete" }), _jsx(Button, { variant: "contained", color: "primary", startIcon: _jsx(IoAddOutline, {}), onClick: toggleDrawer, children: "Add Category" })] })] }), _jsx(CategoryTable, { list: listData, setOpen: setOpen, selectedItems: selectedItems, setSelectedItems: setSelectedItems }), _jsx(Drawer, { anchor: "right", open: open, onClose: closeDrawer, children: _jsx(AddEditeCategory, { setOpen: setOpen, setUpdateList: () => { } }) })] }) }));
};
export default CategoryPage;
