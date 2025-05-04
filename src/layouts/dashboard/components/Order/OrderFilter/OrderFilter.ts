import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, Typography } from "@mui/material";
import { containerStyle3, dateFieldContainerStyle, datePickerContainerStyle, } from "../../../../../constants";
const OrderFilter = ({ setStartDate, setEndDate }) => {
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    return (_jsx(Box, { sx: containerStyle3, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { marginBottom: "20px" }, children: "Orders" }), _jsx(Box, { component: "form", sx: { display: "flex", gap: "20px" }, children: _jsx(Box, { sx: dateFieldContainerStyle, children: _jsxs(Box, { sx: datePickerContainerStyle, children: [_jsx(TextField, { label: "Start Date", type: "date", InputLabelProps: { shrink: true }, onChange: handleStartDateChange }), _jsx(TextField, { label: "End Date", type: "date", InputLabelProps: { shrink: true }, onChange: handleEndDateChange })] }) }) })] }) }));
};
export default OrderFilter;
