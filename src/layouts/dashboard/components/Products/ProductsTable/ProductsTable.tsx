import React from "react";
// mui
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  TableHead,
  TableFooter,
  Table,
  TableContainer,
  TablePagination,
  Checkbox,
  TableRow,
  Paper,
} from "@mui/material";

import { styled } from "@mui/material/styles";

// react icons

import ProductsItem from "../../../../dashboard/components/Products/ProductsItem/ProductsItem";
import { GetProductItem } from "../../../pages/ProductsDashboard/types";

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

type Props = {
  list: GetProductItem[];
  refetch: () => void;
  selectedBrand: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  totalCount: number;
  page: number;
  perPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductsTable = ({
  list,
  selectedBrand,
  selectedItems,
  setUpdateList,
  setSelectedItems,
  totalCount,
  page,
  perPage,
  setPage,
  setPerPage,
  setOpen,
  refetch,
}: Props) => {
  const handleCheckboxChange = (itemId: string) => {
    const updatedSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelectedItems);
  };

  function selectCheckboxes() {
    if (selectedItems?.length === list?.length) {
      setSelectedItems([]);
    } else {
      const allItemIds = list.map((item) => item._id);
      setSelectedItems(allItemIds);
    }
  }

  const filteredList = selectedBrand
    ? list.filter((item) => item.brandId === selectedBrand)
    : list;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
    refetch();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Checkbox
                style={{ backgroundColor: "white" }}
                checked={selectedItems?.length === list?.length}
                onChange={() => {
                  selectCheckboxes();
                }}
              />
            </StyledTableCell>
            <StyledTableCell align="left">Product Name</StyledTableCell>
            <StyledTableCell align="left">Brand</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Sale Price</StyledTableCell>
            <StyledTableCell align="left">Stock</StyledTableCell>
            <StyledTableCell align="left">View</StyledTableCell>
            <StyledTableCell align="left">Published</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        {Array.isArray(filteredList)
          ? filteredList.map((item) => (
              <ProductsItem
                setOpen={setOpen}
                key={item?._id}
                item={item}
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
                setUpdateList={setUpdateList}
              />
            ))
          : []}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={totalCount}
              rowsPerPage={perPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
