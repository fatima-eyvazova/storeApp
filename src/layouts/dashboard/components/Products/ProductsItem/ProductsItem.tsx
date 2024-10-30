import { GrView } from "react-icons/gr";
import { BiPencil, BiTrash } from "react-icons/bi";
import {
  TableRow,
  TableCell,
  Avatar,
  Tooltip,
  IconButton,
  Grid,
  Checkbox,
} from "@mui/material";

import { PropsItem } from "../../../pages/ProductsDashboard/types";
import { useDispatch } from "react-redux";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import DeleteModal from "../../../../shared/modals/DeleteModal/DeleteModal";
import { useState } from "react";

const ProductsItem = ({
  item,
  selectedItems,
  handleCheckboxChange,
  setUpdateList,
  setOpen,
  onDeleteProduct,
  categories,
}: PropsItem) => {
  const dispatch = useDispatch();
  const url = item?.images?.[0] as { url: string };
  const [openModal, setOpenModal] = useState(false);

  const categoryName =
    categories?.data?.find(
      (category: { _id: string }) => category._id === item.categoryId
    )?.name || "Unknown";

  console.log("categories", categories);

  const setSelectedItem = (status: "edit" | "view" | "delete") => {
    setOpen(true);
    dispatch(selectItem({ itemData: { item, status } }));
  };
  const isChecked = selectedItems.includes(item._id);

  const handleCheckboxChangeLocal = () => handleCheckboxChange(item._id);

  const handleEditItem = () => setSelectedItem("edit");

  const handleDeleteModalOpen = () => setOpenModal(true);

  const handleDelete = () => {
    onDeleteProduct(item._id);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isChecked} onChange={handleCheckboxChangeLocal} />
      </TableCell>
      <TableCell>
        <Grid
          container
          spacing={2}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid item>
            <Avatar alt={item?.title} src={url?.url} />
          </Grid>
          <Grid item>{item?.title}</Grid>
        </Grid>
      </TableCell>
      <TableCell>{categoryName}</TableCell>
      <TableCell>{item?.productPrice}</TableCell>
      <TableCell>{item?.salePrice}</TableCell>
      <TableCell>{item?.stock}</TableCell>
      <TableCell style={{ cursor: "pointer" }}>
        <GrView />
      </TableCell>
      <TableCell>{item?.isPublish ? "True" : "False"}</TableCell>
      <TableCell>
        <Tooltip title="Edit" arrow onClick={handleEditItem}>
          <IconButton>
            <BiPencil />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow onClick={handleDeleteModalOpen}>
          <IconButton onClick={handleDelete}>
            <BiTrash />
          </IconButton>
        </Tooltip>
        {openModal && (
          <DeleteModal
            setOpenModal={setOpenModal}
            setUpdateList={setUpdateList}
            itemId={item._id}
            resource="products"
            onDelete={handleDelete}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default ProductsItem;
