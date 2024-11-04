import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  useGetAdminsQuery,
  useGetProductsQuery,
  useGetOrdersQuery,
} from "../../../../redux/slices/shared/apiSlice";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/types";
import { barChart, chartBox } from "../../../../constants";

const AnalyticsChart = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const { data: productData, isLoading: productLoading } = useGetProductsQuery({
    perPage: 100,
  });
  const { data: adminsData } = useGetAdminsQuery(token);

  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery({
    perPage: 10,
    page: 1,
  });

  if (productLoading || ordersLoading) return <div>Loading...</div>;

  const productStockData =
    productData?.data?.product
      ?.map((product: { title: string; stock: number }) => ({
        name: product.title,
        stock: product.stock || 0,
      }))
      .sort(
        (a: { stock: number }, b: { stock: number }) => a.stock - b.stock
      ) || [];

  const clientUsers =
    adminsData?.data?.filter(
      (admin: { role: string }) => admin.role === "client"
    ) || [];

  const userOrderData = clientUsers?.map(
    (client: { _id: string; name: string; surname: string }) => {
      const userOrders = ordersData?.data?.data.filter(
        (order) => order.customer && order?.customer?.userId === client?._id
      );

      const totalOrders = userOrders.length;

      return {
        name: client.name + " " + client.surname,
        totalOrders,
      };
    }
  );

  return (
    <Sidebar>
      <Box style={chartBox}>
        <Box style={{ textAlign: "center", marginRight: "20px" }}>
          <Typography
            variant="h4"
            style={{ marginBottom: "10px", fontWeight: "bold" }}
          >
            Product Stock by Title
          </Typography>
          <ResponsiveContainer>
            <BarChart data={productStockData} style={barChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ marginBottom: "10px", fontWeight: "bold" }}
          >
            Total Orders by Client
          </Typography>
          <ResponsiveContainer>
            <BarChart data={userOrderData} style={barChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalOrders" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default AnalyticsChart;
