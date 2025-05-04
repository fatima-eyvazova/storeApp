import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useGetOrdersQuery } from "../../../../redux/slices/shared/apiSlice";
import OrderFilter from "../../components/Order/OrderFilter/OrderFilter";
import OrderTable from "../../components/Order/OrderTable/OrderTable";
const Orders = () => {
    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const { data, error, isLoading } = useGetOrdersQuery({
        perPage,
        page: page + 1,
        startDate,
        endDate,
        status,
    });
    useEffect(() => {
        if (data?.data) {
            setList(data.data.data);
        }
    }, [data]);
    if (isLoading)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsx("p", { children: "Error loading orders..." });
    const totalCount = data?.data?.totalCount || 0;
    return (_jsx(_Fragment, { children: _jsxs(Sidebar, { children: [_jsx(OrderFilter, { setStartDate: setStartDate, setEndDate: setEndDate, endDate: endDate, startDate: startDate, setStatus: setStatus, status: status }), _jsx(OrderTable, { list: list, totalCount: totalCount, page: page, perPage: perPage, setPage: setPage, setPerPage: setPerPage, setList: setList })] }) }));
};
export default Orders;
