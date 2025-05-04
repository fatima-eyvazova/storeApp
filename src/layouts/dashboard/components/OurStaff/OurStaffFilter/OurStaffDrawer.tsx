import { useState } from "react";
import { Drawer, Button, IconButton, Box } from "@mui/material";
import { MdPersonAddAlt } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { GetAdmin } from "../../../pages/OurStaff/types";
import AddStaff from "../AddStaff/AddStaff";
import { ourStaffIconeButton } from "../../../../../constants";

interface Props {
  updateList: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  onFilter: (filteredList: GetAdmin[]) => void;
  setFilteredAdminList: (filteredList: GetAdmin[]) => void;
}

const OurStaffDrawer = ({
  setUpdateList,
}: // updateList
Props) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button
        variant="contained"
        startIcon={<MdPersonAddAlt />}
        onClick={toggleDrawer}
      >
        Add Staff
      </Button>

      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Box
          sx={{
            padding: 2,
            position: "relative",
          }}
        >
          <IconButton onClick={closeDrawer} sx={ourStaffIconeButton}>
            <CiCircleRemove size={24} />
          </IconButton>
          <AddStaff
            setOpen={setOpen}
            setUpdateList={setUpdateList}
            // updateList={updateList}
          />
        </Box>
      </Drawer>
    </form>
  );
};

export default OurStaffDrawer;
