import TableCell from "@mui/material/TableCell";
import {
  TableHead,
  TableFooter,
  Table,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";

import ProductsItem from "../../../../dashboard/components/Products/ProductsItem/ProductsItem";
import { PropsProductsTable } from "../../../pages/ProductsDashboard/types";
import { tableCellStyles } from "../../../../../constants";

const ProductsTable = ({
  list,
  selectedItems,
  totalCount,
  page,
  perPage,
  setOpen,
  onDeleteProduct,
  handleCheckboxChange,
  handleChangePage,
  handleChangeRowsPerPage,
  setUpdateList,
  categories,
}: PropsProductsTable) => {
  const listArr = Array.isArray(list);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles.head}>Product Name</TableCell>
            <TableCell sx={tableCellStyles.head} align="left">
              Category
            </TableCell>
            <TableCell sx={tableCellStyles.head} align="left">
              Price
            </TableCell>
            <TableCell sx={tableCellStyles.head} align="left">
              Sale Price
            </TableCell>
            <TableCell sx={tableCellStyles.head} align="left">
              Stock
            </TableCell>
            <TableCell sx={tableCellStyles.head} align="left">
              View
            </TableCell>
            <TableCell sx={tableCellStyles.head} align="left">
              Published
            </TableCell>
            <TableCell sx={tableCellStyles.head} align="left">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {listArr
          ? list.map((item) => (
              <ProductsItem
                setOpen={setOpen}
                key={item?._id}
                item={item}
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
                setUpdateList={setUpdateList}
                onDeleteProduct={onDeleteProduct}
                categories={categories}
              />
            ))
          : []}
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
