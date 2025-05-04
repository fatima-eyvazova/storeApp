import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, } from "recharts";
import { useGetAdminsQuery, useGetProductsQuery, useGetOrdersQuery, } from "../../../../redux/slices/shared/apiSlice";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { barChart, chartBox } from "../../../../constants";
const AnalyticsChart = () => {
    const { token } = useSelector((state) => state.auth);
    const { data: productData, isLoading: productLoading } = useGetProductsQuery({
        perPage: 100,
    });
    const { data: adminsData } = useGetAdminsQuery(token);
    const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery({
        perPage: 10,
        page: 1,
    });
    if (productLoading || ordersLoading)
        return _jsx("div", { children: "Loading..." });
    const productStockData = productData?.data?.product
        ?.map((product) => ({
        name: product.title,
        stock: product.stock || 0,
    }))
        .sort((a, b) => a.stock - b.stock) || [];
    const clientUsers = adminsData?.data?.filter((admin) => admin.role === "client") || [];
    const userOrderData = clientUsers?.map((client) => {
        const userOrders = ordersData?.data?.data.filter((order) => order.customer && order?.customer?.userId === client?._id);
        const totalOrders = userOrders.length;
        return {
            name: client.name + " " + client.surname,
            totalOrders,
        };
    });
    return (_jsx(Sidebar, { children: _jsxs(Box, { style: chartBox, children: [_jsxs(Box, { style: { textAlign: "center", marginRight: "20px" }, children: [_jsx(Typography, { variant: "h4", style: { marginBottom: "10px", fontWeight: "bold" }, children: "Product Stock by Title" }), _jsx(ResponsiveContainer, { children: _jsxs(BarChart, { data: productStockData, style: barChart, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "stock", fill: "#82ca9d" })] }) })] }), _jsxs(Box, { style: { textAlign: "center" }, children: [_jsx(Typography, { variant: "h4", style: { marginBottom: "10px", fontWeight: "bold" }, children: "Total Orders by Client" }), _jsx(ResponsiveContainer, { children: _jsxs(BarChart, { data: userOrderData, style: barChart, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "totalOrders", fill: "#ff7300" })] }) })] })] }) }));
};
export default AnalyticsChart;
