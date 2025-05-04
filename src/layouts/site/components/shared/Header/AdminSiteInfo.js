import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useGetSiteInfoQuery, useUpdateSiteInfoMutation, } from "../../../../../redux/slices/shared/apiSlice";
import { useSelector } from "react-redux";
const AdminSiteInfo = () => {
    const { data: siteInfo, refetch } = useGetSiteInfoQuery(null);
    const [updateSiteInfo] = useUpdateSiteInfoMutation();
    const [siteName, setSiteName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const { user, token } = useSelector((state) => state.auth);
    const userRole = user?.role;
    useEffect(() => {
        if (siteInfo) {
            setSiteName(siteInfo.data.name);
        }
    }, [siteInfo]);
    const handleInputChange = (e) => {
        setSiteName(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedSiteInfo = { _id: siteInfo.data._id, name: siteName };
            await updateSiteInfo(updatedSiteInfo).unwrap();
            await refetch();
            setIsEditing(false);
        }
        catch (error) {
            console.error("Error updating site info:", error);
        }
    };
    return (_jsx(Box, { sx: { padding: 2, width: "500px" }, children: !token ? (_jsx(Typography, { variant: "h6", children: siteName })) : userRole === "admin" || userRole === "superadmin" ? (_jsx(_Fragment, { children: isEditing ? (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx(TextField, { label: "Site Name", variant: "outlined", fullWidth: true, value: siteName, onChange: handleInputChange, sx: { marginBottom: 2 } }), _jsx(Box, { sx: { textAlign: "right" }, children: _jsx(Button, { variant: "contained", color: "primary", type: "submit", onClick: handleSubmit, children: "Update" }) })] })) : (_jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [_jsx(Typography, { variant: "h6", sx: { marginRight: 2 }, children: siteName }), _jsx(Button, { variant: "contained", onClick: () => setIsEditing(true), children: "Change" })] })) })) : (_jsx(Typography, { variant: "h6", children: siteName })) }));
};
export default AdminSiteInfo;
