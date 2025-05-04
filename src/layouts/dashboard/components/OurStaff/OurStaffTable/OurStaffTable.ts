import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OurStaffItem from "../OurStaffItem/OurStaffItem";
import { tableCell } from "../../../../../constants";
const OurStaffTable = ({ setUpdateList, list }) => {
    return (_jsx(TableContainer, { component: Paper, children: _jsxs(Table, { "aria-label": "custom pagination table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { sx: tableCell, align: "left", children: "Name" }), _jsx(TableCell, { sx: tableCell, align: "left", children: "Surname" }), _jsx(TableCell, { sx: tableCell, align: "left", children: "Email" }), _jsx(TableCell, { sx: tableCell, align: "left", children: "Joining Date" }), _jsx(TableCell, { sx: tableCell, align: "left", children: "Role" }), _jsx(TableCell, { sx: tableCell, align: "left", children: "Actions" })] }) }), Array.isArray(list)
                    ? list.map((admin) => (_jsx(OurStaffItem, { admin: admin, setUpdateList: setUpdateList }, admin?.id)))
                    : []] }) }));
};
export default OurStaffTable;
