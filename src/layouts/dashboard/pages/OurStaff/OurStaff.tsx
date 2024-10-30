import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RootState } from "../../../../redux/types";
import { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useGetAdminsQuery } from "../../../../redux/slices/shared/apiSlice";
import { GetAdmin } from "./types";
import OurStaffTable from "../../components/OurStaff/OurStaffTable/OurStaffTable";
import OurStaffDrawer from "../../components/OurStaff/OurStaffFilter/OurStaffDrawer";
import { Box } from "@mui/system";
import { ourStaffBox } from "../../../../constants";

const OurStaff = () => {
  const [filteredAdminList, setFilteredAdminList] = useState<GetAdmin[]>([]);
  const [updateList, setUpdateList] = useState(false);

  const adminInfo = useSelector((state: RootState) => state?.auth?.user);
  const token = useSelector((state: RootState) => state?.auth?.token);
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

  const handleFilter = (filteredList: GetAdmin[]) => {
    setFilteredAdminList(filteredList);
  };

  return (
    <Sidebar>
      <Container>
        <Box>
          <Box sx={ourStaffBox}>
            <Typography variant="h4" gutterBottom>
              All Staff
            </Typography>
            <OurStaffDrawer
              setUpdateList={setUpdateList}
              updateList={updateList}
              onFilter={handleFilter}
              setFilteredAdminList={setFilteredAdminList}
            />
          </Box>
          <Box>
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">Error fetching data</Typography>
            ) : (
              <OurStaffTable
                list={filteredAdminList}
                setUpdateList={setUpdateList}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Sidebar>
  );
};

export default OurStaff;
