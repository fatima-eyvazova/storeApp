import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useGetAdminsQuery } from "../../../../redux/slices/shared/apiSlice";
import OurStaffTable from "../../components/OurStaff/OurStaffTable/OurStaffTable";
import OurStaffDrawer from "../../components/OurStaff/OurStaffFilter/OurStaffDrawer";
import { Box } from "@mui/system";
import { ourStaffBox } from "../../../../constants";
const OurStaff = () => {
    const [filteredAdminList, setFilteredAdminList] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const adminInfo = useSelector((state) => state?.auth?.user);
    const token = useSelector((state) => state?.auth?.token);
    const userRole = adminInfo?.role;
    const { data, error, isLoading, refetch } = useGetAdminsQuery(token, {
        skip: !token,
    });
    useEffect(() => {
        if (data?.data) {
            const adminList = data?.data || [];
            setFilteredAdminList(adminList);
            refetch();
        }
    }, [data, updateList]);
    if (userRole !== "superadmin") {
        return null;
    }
    const handleFilter = (filteredList) => {
        setFilteredAdminList(filteredList);
    };
    return (_jsx(Sidebar, { children: _jsx(Container, { children: _jsxs(Box, { children: [_jsxs(Box, { sx: ourStaffBox, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "All Staff" }), _jsx(OurStaffDrawer, { setUpdateList: setUpdateList, updateList: updateList, onFilter: handleFilter, setFilteredAdminList: setFilteredAdminList })] }), _jsx(Box, { children: isLoading ? (_jsx(CircularProgress, {})) : error ? (_jsx(Typography, { color: "error", children: "Error fetching data" })) : (_jsx(OurStaffTable, { list: filteredAdminList, setUpdateList: setUpdateList })) })] }) }) }));
};
export default OurStaff;
