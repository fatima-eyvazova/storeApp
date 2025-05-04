import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { TableBody, TableRow, TableCell, Tooltip, IconButton, Grid, } from "@mui/material";
import { BiTrash } from "react-icons/bi";
import DeleteModal from "../../../../shared/modals/DeleteModal/DeleteModal";
import { useDeleteUserMutation } from "../../../../../redux/slices/shared/apiSlice";
const OurStaffItem = ({ admin, setUpdateList }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [deleteUser] = useDeleteUserMutation();
    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser({ user_id: userId }).unwrap();
            setUpdateList((prev) => !prev);
        }
        catch (error) {
            console.error("Failed to delete user:", error);
        }
    };
    const handleDeleteUserClick = () => {
        handleDeleteUser(admin._id);
    };
    return (_jsxs(_Fragment, { children: [_jsx(TableBody, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Grid, { item: true, children: admin?.name }) }), _jsx(TableCell, { children: _jsx(Grid, { item: true, children: admin?.surname }) }), _jsx(TableCell, { children: admin?.email }), _jsx(TableCell, { children: admin?.createdAt?.split("T")?.[0] || "" }), _jsx(TableCell, { children: admin?.role }), _jsx(TableCell, { children: _jsx(Tooltip, { title: "Delete", arrow: true, onClick: handleDeleteUserClick, children: _jsx(IconButton, { children: _jsx(BiTrash, {}) }) }) })] }) }), openModal && (_jsx(DeleteModal, { setOpenModal: setOpenModal, setUpdateList: setUpdateList, itemId: admin?._id, resource: "users" }))] }));
};
export default OurStaffItem;
