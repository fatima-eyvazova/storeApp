import React, { useState } from "react";
// import { GrView } from "react-icons/gr";
import { BiPencil, BiTrash } from "react-icons/bi";
// import { styled } from "@mui/material/styles";
import {
  TableBody,
  // tableCellClasses,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Grid,
  Checkbox,
  // Modal,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import DeleteModal from "../../../../shared/modals/DeleteModal/DeleteModal";
// const label = { inputProps: { "aria-label": "Switch demo" } };

interface Props {
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
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [confirmOpen, setConfirmOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const setSelectedItem = (status: "edit" | "view" | "delete") => {
    setOpen(true);
    dispatch(selectItem({ itemData: { item, status } }));
  };
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={selectedItems.includes(item._id)}
            onChange={() => handleCheckboxChange(item._id)}
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
            <IconButton onClick={() => setSelectedItem("edit")}>
              <BiPencil
                style={{
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" arrow onClick={() => setOpenModal(true)}>
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
