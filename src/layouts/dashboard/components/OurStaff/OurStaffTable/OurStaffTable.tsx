import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { GetAdmin } from "../../../pages/OurStaff/types";
import OurStaffItem from "../OurStaffItem/OurStaffItem";
import { tableCell } from "../../../../../constants";

interface Props {
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  list: GetAdmin[];
}

const OurStaffTable = ({ setUpdateList, list }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableCell} align="left">
              Name
            </TableCell>
            <TableCell sx={tableCell} align="left">
              Surname
            </TableCell>
            <TableCell sx={tableCell} align="left">
              Email
            </TableCell>
            <TableCell sx={tableCell} align="left">
              Joining Date
            </TableCell>
            <TableCell sx={tableCell} align="left">
              Role
            </TableCell>
            <TableCell sx={tableCell} align="left">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {Array.isArray(list)
          ? list.map((admin) => (
              <OurStaffItem
                key={admin.id}
                admin={admin}
                setUpdateList={setUpdateList}
              />
            ))
          : []}
      </Table>
    </TableContainer>
  );
};

export default OurStaffTable;
