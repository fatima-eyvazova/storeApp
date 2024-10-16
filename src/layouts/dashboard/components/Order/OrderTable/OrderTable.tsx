import * as React from "react";
// mui
import { tableCellClasses } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";

import {
  IconButton,
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
// react icons

import { GetOrderItem } from "../../../pages/Orders/type";
import TableItem from "../TableItem/TableItem";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;

  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = (
  props
) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

interface OrderTableProps {
  list: GetOrderItem[];
  searchInput: string;
  totalCount: number;
  page: number;
  perPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setList: React.Dispatch<React.SetStateAction<GetOrderItem[]>>;
}

const OrderTable: React.FC<OrderTableProps> = ({
  list,
  searchInput,
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

  // const filteredList = list.filter((item) => {
  //   const productsString = String(item.customer.name);
  //   return (
  //     productsString.toLowerCase().includes(searchInput.toLowerCase()) || null
  //   );
  // });

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
                <StyledTableCell align="left">Order Time</StyledTableCell>
                <StyledTableCell align="left">Customer Name</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
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
                onPageChange={(_, newPage) => {
                  if (page < 0) return null;
                  setPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  setPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default OrderTable;
