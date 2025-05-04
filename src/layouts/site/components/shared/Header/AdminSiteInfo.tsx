import { SetStateAction, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  useGetSiteInfoQuery,
  useUpdateSiteInfoMutation,
} from "../../../../../redux/slices/shared/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/types";

const AdminSiteInfo = () => {
  const { data: siteInfo, refetch } = useGetSiteInfoQuery(null);
  const [updateSiteInfo] = useUpdateSiteInfoMutation();
  const [siteName, setSiteName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { user, token } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role;

  useEffect(() => {
    if (siteInfo) {
      setSiteName(siteInfo.data.name);
    }
  }, [siteInfo]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSiteName(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const updatedSiteInfo = { _id: siteInfo.data._id, name: siteName };
      await updateSiteInfo(updatedSiteInfo).unwrap();
      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating site info:", error);
    }
  };

  return (
    <Box sx={{ padding: 2, width: "500px" }}>
      {!token ? (
        <Typography variant="h6">{siteName}</Typography>
      ) : userRole === "admin" || userRole === "superadmin" ? (
        <>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Site Name"
                variant="outlined"
                fullWidth
                value={siteName}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <Box sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </Box>
            </form>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ marginRight: 2 }}>
                {siteName}
              </Typography>
              <Button variant="contained" onClick={() => setIsEditing(true)}>
                Change
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography variant="h6">{siteName}</Typography>
      )}
    </Box>
  );
};

export default AdminSiteInfo;
