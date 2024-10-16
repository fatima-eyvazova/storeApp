import * as React from "react";
import { useState, useEffect } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { GetOrderItem } from "../../../pages/Orders/type";
import { useUpdateOrderStatusMutation } from "../../../../../redux/slices/shared/apiSlice";

interface TableItemProps {
  setList: React.Dispatch<React.SetStateAction<GetOrderItem[]>>;
  item: GetOrderItem;
}

const TableItem: React.FC<TableItemProps> = ({
  item,
  setList,
}: TableItemProps) => {
  const [selectedAction, setSelectedAction] = useState(item.status);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    setSelectedAction(item.status);
  }, [item.status]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    minWidth: "120px",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
    } catch (error) {
      alert(error?.data?.message || "Xəta baş verdi");
      console.error("Error updating order status:", error);
    }
  };

  console.log("item", item);

  return (
    <StyledTableRow>
      <StyledTableCell>{item?.createdAt?.split("T")?.[0]}</StyledTableCell>
      <StyledTableCell>{item?.customer?.name}</StyledTableCell>
      <StyledTableCell>{item?.total}</StyledTableCell>
      <StyledTableCell>{item?.status}</StyledTableCell>
      <StyledTableCell>
        <Select
          sx={{
            width: "80%",
            height: "30px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
          value={selectedAction}
          onChange={(e) => {
            const newStatus = e.target.value;
            setSelectedAction(newStatus);
            handleStatusChange(newStatus);
          }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="cancel">Cancel</MenuItem>
        </Select>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableItem;
