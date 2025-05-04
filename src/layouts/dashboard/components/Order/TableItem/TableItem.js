import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useUpdateOrderStatusMutation } from "../../../../../redux/slices/shared/apiSlice";
import { TableCell, TableRow } from "@mui/material";
import { orderTableStyle, selectStyles, tableRowStyles, } from "../../../../../constants";
const TableItem = ({ item, setList, }) => {
    const [selectedAction, setSelectedAction] = useState(item.status);
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    useEffect(() => {
        setSelectedAction(item.status);
    }, [item.status]);
    const handleStatusChange = async (newStatus) => {
        try {
            const response = await updateOrderStatus({
                orderId: item._id,
                status: newStatus,
            }).unwrap();
            if (response.success) {
                setList((orders) => orders.map((order) => order._id === item._id ? { ...order, status: newStatus } : order));
            }
            else {
                alert(response.message || "Statusu dəyişmək mümkün olmadı");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            alert(error?.data?.message || "Xəta baş verdi");
            console.error("Error updating order status:", error);
        }
    };
    const handleSelectChange = (e) => {
        const newStatus = e.target.value;
        setSelectedAction(newStatus);
        handleStatusChange(newStatus);
    };
    return (_jsxs(TableRow, { sx: tableRowStyles, children: [_jsx(TableCell, { sx: orderTableStyle, children: item?.createdAt?.split("T")?.[0] }), _jsx(TableCell, { sx: orderTableStyle, children: item?.customer?.name }), _jsxs(TableCell, { sx: orderTableStyle, children: [item?.total, " $"] }), _jsx(TableCell, { sx: orderTableStyle, children: item?.status }), _jsx(TableCell, { children: _jsxs(Select, { sx: selectStyles, value: selectedAction, onChange: handleSelectChange, children: [_jsx(MenuItem, { value: "pending", children: "Pending" }), _jsx(MenuItem, { value: "delivered", children: "Delivered" }), _jsx(MenuItem, { value: "processing", children: "Processing" }), _jsx(MenuItem, { value: "cancel", children: "Cancel" })] }) })] }));
};
export default TableItem;
