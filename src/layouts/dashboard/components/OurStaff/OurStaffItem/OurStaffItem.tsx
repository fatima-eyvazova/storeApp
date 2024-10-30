import * as React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Grid,
} from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { GetAdmin } from "../../../pages/OurStaff/types";
import DeleteModal from "../../../../shared/modals/DeleteModal/DeleteModal";
import { useDeleteUserMutation } from "../../../../../redux/slices/shared/apiSlice";

type Props = {
  admin: GetAdmin;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
};

const OurStaffItem = ({ admin, setUpdateList }: Props) => {
  const [openModal, setOpenModal] = React.useState(false);

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({ user_id: userId }).unwrap();
      setUpdateList((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  const handleDeleteUserClick = () => {
    handleDeleteUser(admin._id);
  };

  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <Grid item>{admin?.name}</Grid>
          </TableCell>
          <TableCell>
            <Grid item>{admin?.surname}</Grid>
          </TableCell>
          <TableCell>{admin?.email}</TableCell>
          <TableCell>{admin?.createdAt?.split("T")?.[0] || ""}</TableCell>
          <TableCell>{admin?.role}</TableCell>
          <TableCell>
            <Tooltip title="Delete" arrow onClick={handleDeleteUserClick}>
              <IconButton>
                <BiTrash />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
      {openModal && (
        <DeleteModal
          setOpenModal={setOpenModal}
          setUpdateList={setUpdateList}
          itemId={admin?._id}
          resource="users"
        />
      )}
    </>
  );
};

export default OurStaffItem;
