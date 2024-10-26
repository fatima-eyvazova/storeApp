import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import Drawer from "@mui/material/Drawer";
import { Box, Typography, Button } from "@mui/material";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../../redux/slices/shared/apiSlice";
import CategoryTable from "../../components/Category/CategoryTable/CategoryTable";
import AddEditeCategory from "../../components/Category/AddEditeCategory/AddEditeCategory";
import Sidebar from "../../components/Sidebar/Sidebar";
import { headerStyles } from "../../../../constants";

const CategoryPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleDeleteSelectedItems = async () => {
    for (const itemId of selectedItems) {
      await deleteCategory(itemId);
    }
    setSelectedItems([]);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading categories</Typography>;

  const listData = data?.data || [];
  return (
    <Sidebar>
      <Box sx={{ padding: "20px" }}>
        <Box sx={headerStyles}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Category
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RiDeleteBin6Line />}
              sx={{ marginRight: "10px" }}
              onClick={handleDeleteSelectedItems}
              disabled={!selectedItems.length}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IoAddOutline />}
              onClick={toggleDrawer}
            >
              Add Category
            </Button>
          </Box>
        </Box>

        <CategoryTable
          list={listData}
          setOpen={setOpen}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />

        <Drawer anchor="right" open={open} onClose={closeDrawer}>
          <AddEditeCategory setOpen={setOpen} setUpdateList={() => {}} />
        </Drawer>
      </Box>
    </Sidebar>
  );
};

export default CategoryPage;
