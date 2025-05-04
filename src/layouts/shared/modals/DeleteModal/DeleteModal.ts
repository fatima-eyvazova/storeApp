import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, } from "@mui/material";
import { useDeleteCategoryMutation } from "../../../../redux/slices/shared/apiSlice";
const DeleteModal = ({ setOpenModal, itemId, itemIdList }) => {
    const [deleteCategory] = useDeleteCategoryMutation();
    const deleteItem = async () => {
        if (!itemId)
            return;
        try {
            const res = await deleteCategory(itemId).unwrap();
            if (res?.success) {
                setOpenModal(false);
                // setUpdateList((prev) => !prev);
            }
        }
        catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    const deleteSeveralItems = async () => {
        if (!itemIdList)
            return;
        try {
            const promiseList = itemIdList.map((id) => deleteCategory(id).unwrap());
            const results = await Promise.all(promiseList);
            const isSuccess = results.every((res) => res?.success);
            if (isSuccess) {
                setOpenModal(false);
                // setUpdateList((prev) => !prev);
            }
        }
        catch (error) {
            console.error("Error deleting items:", error);
        }
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (_jsxs(Dialog, { open: true, onClose: () => setOpenModal(false), children: [_jsx(DialogTitle, { children: itemId ? "Delete Item" : "Delete Items" }), _jsx(DialogContent, { children: _jsx(Typography, { variant: "body1", gutterBottom: true, children: `Are you sure you want to delete ${itemId ? "this element" : "these elements"}?` }) }), _jsxs(DialogActions, { children: [_jsx(Button, { variant: "contained", color: "primary", onClick: itemId ? deleteItem : deleteSeveralItems, children: "OK" }), _jsx(Button, { onClick: handleCloseModal, color: "secondary", children: "Cancel" })] })] }));
};
export default DeleteModal;
