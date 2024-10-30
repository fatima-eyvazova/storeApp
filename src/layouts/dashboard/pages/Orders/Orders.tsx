import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useGetOrdersQuery } from "../../../../redux/slices/shared/apiSlice";
import OrderFilter from "../../components/Order/OrderFilter/OrderFilter";
import OrderTable from "../../components/Order/OrderTable/OrderTable";
import { GetOrderItem } from "./type";

const Orders: React.FC = () => {
  const [list, setList] = useState<GetOrderItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const { data, error, isLoading } = useGetOrdersQuery({
    perPage,
    page: page + 1,
    startDate,
    endDate,
    search: searchInput,
    status,
  });

  useEffect(() => {
    if (data?.data) {
      setList(data.data.data);
    }
  }, [data]);

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders...</p>;

  const totalCount = data?.data?.totalCount || 0;

  return (
    <>
      <Sidebar>
        <OrderFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          endDate={endDate}
          startDate={startDate}
          setStatus={setStatus}
          status={status}
        />
        <OrderTable
          list={list}
          searchInput={searchInput}
          totalCount={totalCount}
          page={page}
          perPage={perPage}
          setPage={setPage}
          setPerPage={setPerPage}
          setList={setList}
        />
      </Sidebar>
    </>
  );
};

export default Orders;
