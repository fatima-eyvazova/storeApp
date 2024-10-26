import TableCell from "@mui/material/TableCell";
import {
  TableHead,
  Table,
  TableContainer,
  Checkbox,
  TableRow,
  Paper,
} from "@mui/material";

import CategoryItem from "../CategoryItem/CategoryItem";
import { tableCellStyle } from "../../../../../constants";
import { CategoryProps } from "../../../pages/CategoryDashboard/types";

const CategoryTable = ({
  list,
  setOpen,
  setUpdateList,
  selectedItems,
  setSelectedItems,
}: CategoryProps) => {
  const handleCheckboxChange = (itemId: string) => {
    const updatedSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelectedItems);
  };

  const selectCheckboxes = () => {
    if (selectedItems.length === list.length) {
      setSelectedItems([]);
    } else {
      const allItemIds = list.map((item) => item._id);
      setSelectedItems(allItemIds);
    }
  };
  const listArr = Array.isArray(list);
  const isChecked = selectedItems.length === list.length;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyle}>
              <Checkbox
                style={{ backgroundColor: "white" }}
                checked={isChecked}
                onChange={selectCheckboxes}
              />
            </TableCell>
            <TableCell align="left" sx={tableCellStyle}>
              Icon
            </TableCell>
            <TableCell align="left" sx={tableCellStyle}>
              Name
            </TableCell>
            <TableCell align="left" sx={tableCellStyle}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {listArr
          ? list.map((item) => (
              <CategoryItem
                key={item?._id}
                item={item}
                setOpen={setOpen}
                setUpdateList={setUpdateList}
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))
          : []}
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
