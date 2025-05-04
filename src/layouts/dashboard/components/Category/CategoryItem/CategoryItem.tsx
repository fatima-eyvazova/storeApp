import React, { useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import {
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Grid,
  Checkbox,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import DeleteModal from "../../../../shared/modals/DeleteModal/DeleteModal";
import { GetCategoryItem } from "../../../pages/CategoryDashboard/types";

interface Props {
  item: GetCategoryItem;
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: string[];
  handleCheckboxChange: (itemId: string) => void;
}

const CategoryItem = ({
  item,
  setOpen,
  setUpdateList,
  selectedItems,
  handleCheckboxChange,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const setSelectedItem = (status: "edit" | "view" | "delete") => {
    setOpen(true);
    dispatch(selectItem({ itemData: { item, status } }));
  };

  const handleCheckboxChangeClick = () => handleCheckboxChange(item._id);
  const handleEditClick = () => setSelectedItem("edit");
  const handleDeleteClick = () => setOpenModal(true);
  const selectedCheck = selectedItems.includes(item._id);
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={selectedCheck}
            onChange={handleCheckboxChangeClick}
          />
        </TableCell>
        <TableCell>
          <Grid
            container
            spacing={2}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={item?.image?.url}
              alt="category"
              style={{ height: 30, width: 30 }}
            />
          </Grid>
        </TableCell>
        <TableCell>
          <Grid
            container
            spacing={2}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid item>{item?.name}</Grid>
          </Grid>
        </TableCell>

        <TableCell>
          <Tooltip title="Edit" arrow>
            <IconButton onClick={handleEditClick}>
              <BiPencil
                style={{
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" arrow onClick={handleDeleteClick}>
            <IconButton>
              <BiTrash />
            </IconButton>
          </Tooltip>
          {openModal && (
            <DeleteModal
              setOpenModal={setOpenModal}
              setUpdateList={setUpdateList}
              itemId={item._id}
              resource="category"
            />
          )}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CategoryItem;
