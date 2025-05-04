import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { TableBody, TableRow, TableCell, Tooltip, IconButton, Grid, Checkbox, } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import DeleteModal from "../../../../shared/modals/DeleteModal/DeleteModal";
const CategoryItem = ({ item, setOpen, setUpdateList, selectedItems, handleCheckboxChange, }) => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const setSelectedItem = (status) => {
        setOpen(true);
        dispatch(selectItem({ itemData: { item, status } }));
    };
    const handleCheckboxChangeClick = () => handleCheckboxChange(item._id);
    const handleEditClick = () => setSelectedItem("edit");
    const handleDeleteClick = () => setOpenModal(true);
    const selectedCheck = selectedItems.includes(item._id);
    return (_jsx(TableBody, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Checkbox, { checked: selectedCheck, onChange: handleCheckboxChangeClick }) }), _jsx(TableCell, { children: _jsx(Grid, { container: true, spacing: 2, style: { display: "flex", alignItems: "center" }, children: _jsx("img", { src: item?.image?.url, alt: "category", style: { height: 30, width: 30 } }) }) }), _jsx(TableCell, { children: _jsx(Grid, { container: true, spacing: 2, style: { display: "flex", alignItems: "center" }, children: _jsx(Grid, { item: true, children: item?.name }) }) }), _jsxs(TableCell, { children: [_jsx(Tooltip, { title: "Edit", arrow: true, children: _jsx(IconButton, { onClick: handleEditClick, children: _jsx(BiPencil, { style: {
                                        cursor: "pointer",
                                    } }) }) }), _jsx(Tooltip, { title: "Delete", arrow: true, onClick: handleDeleteClick, children: _jsx(IconButton, { children: _jsx(BiTrash, {}) }) }), openModal && (_jsx(DeleteModal, { setOpenModal: setOpenModal, setUpdateList: setUpdateList, itemId: item._id, resource: "category" }))] })] }) }));
};
export default CategoryItem;
