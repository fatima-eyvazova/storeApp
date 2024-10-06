import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useDeleteCategoryMutation } from "../../../redux/slices/shared/apiSlice";

interface Props {
  setOpenModal: (bool: boolean) => void;
  itemId?: string;
  itemIdList?: string[];
  resource: string;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({
  setOpenModal,
  // setUpdateList,
  itemId,
  itemIdList,
  resource,
}: Props) => {
  // const token = useSelector((state: RootState) => state.auth.token);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMWViYzM5MC03Y2EwLTExZWYtODYwMS01YmFjMGM4NWMzYmEiLCJpYXQiOjE3MjgyMjE4NTcsImV4cCI6MTcyODMwODI1N30.SwVg2Bsw2oX5J4EKSb8vUUa9elrPFrv4JZArMrL5DZY";

  const [deleteCategory] = useDeleteCategoryMutation();

  const deleteItem = async () => {
    if (!itemId) return;

    try {
      const res = await deleteCategory(itemId).unwrap();
      if (res?.success) {
        setOpenModal(false);
        // setUpdateList((prev) => !prev);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const deleteSeveralItems = async () => {
    if (!itemIdList) return;

    try {
      const promiseList = itemIdList.map((id) => deleteCategory(id).unwrap());
      const results = await Promise.all(promiseList);

      const isSuccess = results.every((res) => res?.success);
      if (isSuccess) {
        setOpenModal(false);
        // setUpdateList((prev) => !prev);
      }
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  return (
    <Dialog open={true} onClose={() => setOpenModal(false)}>
      <DialogTitle>{itemId ? "Delete Item" : "Delete Items"}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {`Are you sure you want to delete ${
            itemId ? "this element" : "these elements"
          }?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={itemId ? deleteItem : deleteSeveralItems}
        >
          OK
        </Button>
        <Button onClick={() => setOpenModal(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
