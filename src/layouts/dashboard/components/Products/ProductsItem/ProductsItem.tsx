import { GrView } from "react-icons/gr";
import { BiPencil, BiTrash } from "react-icons/bi";
import {
  TableRow,
  TableCell,
  Avatar,
  Switch,
  Tooltip,
  IconButton,
  Grid,
  Checkbox,
} from "@mui/material";

import { GetProductItem } from "../../../pages/ProductsDashboard/types";
import { useDispatch } from "react-redux";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import DeleteModal from "../../../../shared/DeleteModal/DeleteModal";
import { useState } from "react";

const label = { inputProps: { "aria-label": "Switch demo" } };

type Props = {
  item: GetProductItem;
  selectedItems: string[];
  handleCheckboxChange: (itemId: string) => void;
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductsItem = ({
  item,
  selectedItems,
  handleCheckboxChange,
  setUpdateList,
  setOpen,
}: Props) => {
  const dispatch = useDispatch();
  const url = item?.images?.[0] as { url: string };
  const [openModal, setOpenModal] = useState(false);

  const setSelectedItem = (status: "edit" | "view" | "delete") => {
    setOpen(true);
    dispatch(selectItem({ itemData: { item, status } }));
  };

  return (
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
          <Grid item>
            <Avatar alt={item?.title} src={url?.url} />
          </Grid>
          <Grid item>{item?.title}</Grid>
        </Grid>
      </TableCell>
      <TableCell>{item?.brandName}</TableCell>
      <TableCell>{item?.productPrice}</TableCell>
      <TableCell>{item?.salePrice}</TableCell>
      <TableCell>{item?.stock}</TableCell>
      <TableCell style={{ cursor: "pointer" }}>
        <GrView />
      </TableCell>
      <TableCell>
        <Switch {...label} checked={item?.isPublish} />
      </TableCell>
      <TableCell>
        <Tooltip title="Edit" arrow onClick={() => setSelectedItem("edit")}>
          <IconButton>
            <BiPencil />
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
            resource="products"
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default ProductsItem;
