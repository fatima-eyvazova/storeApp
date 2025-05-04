import * as React from "react";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TableItemProps } from "../../../pages/Orders/type";
import { useUpdateOrderStatusMutation } from "../../../../../redux/slices/shared/apiSlice";
import { TableCell, TableRow } from "@mui/material";
import {
  orderTableStyle,
  selectStyles,
  tableRowStyles,
} from "../../../../../constants";

const TableItem: React.FC<TableItemProps> = ({
  item,
  setList,
}: TableItemProps) => {
  const [selectedAction, setSelectedAction] = useState(item.status);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    setSelectedAction(item.status);
  }, [item.status]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await updateOrderStatus({
        orderId: item._id,
        status: newStatus,
      }).unwrap();

      if (response.success) {
        setList((orders) =>
          orders.map((order) =>
            order._id === item._id ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert(response.message || "Statusu dəyişmək mümkün olmadı");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error?.data?.message || "Xəta baş verdi");
      console.error("Error updating order status:", error);
    }
  };
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const newStatus = e.target.value;
    setSelectedAction(newStatus);
    handleStatusChange(newStatus);
  };

  return (
    <TableRow sx={tableRowStyles}>
      <TableCell sx={orderTableStyle}>
        {item?.createdAt?.split("T")?.[0]}
      </TableCell>
      <TableCell sx={orderTableStyle}>{item?.customer?.name}</TableCell>
      <TableCell sx={orderTableStyle}>{item?.total} $</TableCell>
      <TableCell sx={orderTableStyle}>{item?.status}</TableCell>
      <TableCell>
        <Select
          sx={selectStyles}
          value={selectedAction}
          onChange={handleSelectChange}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="cancel">Cancel</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
