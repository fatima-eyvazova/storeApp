import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GrView } from "react-icons/gr";
import { BiPencil, BiTrash } from "react-icons/bi";
import { TableRow, TableCell, Avatar, Tooltip, IconButton, Grid, } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import DeleteModal from "../../../../shared/modals/DeleteModal/DeleteModal";
import { useState } from "react";
const ProductsItem = ({ item, setUpdateList, setOpen, onDeleteProduct, categories, }) => {
    const dispatch = useDispatch();
    const url = item?.images?.[0];
    const [openModal, setOpenModal] = useState(false);
    const categoryName = categories?.data?.find((category) => category._id === item?.categoryId)?.name || "Unknown";
    const setSelectedItem = (status) => {
        setOpen(true);
        dispatch(selectItem({ itemData: { item, status } }));
    };
    const handleEditItem = () => setSelectedItem("edit");
    const handleDeleteModalOpen = () => setOpenModal(true);
    const handleDelete = () => {
        onDeleteProduct(item._id);
    };
    return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs(Grid, { container: true, spacing: 2, style: { display: "flex", alignItems: "center" }, children: [_jsx(Grid, { item: true, children: _jsx(Avatar, { alt: item?.title, src: url?.url }) }), _jsx(Grid, { item: true, children: item?.title })] }) }), _jsx(TableCell, { children: categoryName }), _jsx(TableCell, { children: item?.productPrice }), _jsx(TableCell, { children: item?.salePrice }), _jsx(TableCell, { children: item?.stock }), _jsx(TableCell, { style: { cursor: "pointer" }, children: _jsx(GrView, {}) }), _jsx(TableCell, { children: item?.isPublish ? "True" : "False" }), _jsxs(TableCell, { children: [_jsx(Tooltip, { title: "Edit", arrow: true, onClick: handleEditItem, children: _jsx(IconButton, { children: _jsx(BiPencil, {}) }) }), _jsx(Tooltip, { title: "Delete", arrow: true, onClick: handleDeleteModalOpen, children: _jsx(IconButton, { onClick: handleDelete, children: _jsx(BiTrash, {}) }) }), openModal && (_jsx(DeleteModal, { setOpenModal: setOpenModal, setUpdateList: setUpdateList, itemId: item._id, resource: "products", onDelete: handleDelete }))] })] }));
};
export default ProductsItem;
