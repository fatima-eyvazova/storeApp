import React from "react";
// mui
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

interface Props {
  list: [];
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryTable = ({
  list,
  setOpen,
  setUpdateList,
  selectedItems,
  setSelectedItems,
}: Props) => {
  const handleCheckboxChange = (itemId: string) => {
    const updatedSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelectedItems);
  };

  function selectCheckboxes() {
    if (selectedItems.length === list.length) {
      setSelectedItems([]);
    } else {
      const allItemIds = list.map((item) => item._id);
      setSelectedItems(allItemIds);
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                minWidth: "120px",
              }}
            >
              <Checkbox
                style={{ backgroundColor: "white" }}
                checked={selectedItems.length === list.length}
                onChange={() => {
                  selectCheckboxes();
                }}
              />
            </TableCell>
            <TableCell
              align="left"
              sx={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                minWidth: "120px",
              }}
            >
              Icon
            </TableCell>
            <TableCell
              align="left"
              sx={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                minWidth: "120px",
              }}
            >
              Name
            </TableCell>
            <TableCell
              align="left"
              sx={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                minWidth: "120px",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {Array.isArray(list)
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
