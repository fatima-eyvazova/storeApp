import * as React from "react";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Grid,
  TableBody,
  TablePagination,
} from "@mui/material";

import TableItem from "../TableItem/TableItem";
import { orderTableStyle } from "../../../../../constants";
import { OrderTableProps } from "../../../pages/Orders/type";

const OrderTable: React.FC<OrderTableProps> = ({
  list,
  totalCount,
  page,
  perPage,
  setPage,
  setPerPage,
  setList,
}) => {
  if (!list) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage >= 0) setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Grid container>
        <Grid item xs={12}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              sx={{ backgroundColor: "#000", color: "#fff" }}
              style={{ backgroundColor: "red" }}
            >
              <TableRow>
                <TableCell sx={orderTableStyle} align="left">
                  Order Time
                </TableCell>
                <TableCell sx={orderTableStyle} align="left">
                  Customer Name
                </TableCell>
                <TableCell sx={orderTableStyle} align="left">
                  Amount
                </TableCell>
                <TableCell sx={orderTableStyle} align="left">
                  Status
                </TableCell>
                <TableCell sx={orderTableStyle} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflow: "auto" }}>
              {list.length
                ? list.map((item) => (
                    <TableItem item={item} key={item?._id} setList={setList} />
                  ))
                : null}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
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
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default OrderTable;
