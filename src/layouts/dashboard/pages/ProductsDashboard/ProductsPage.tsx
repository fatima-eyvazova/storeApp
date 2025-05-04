import { IoAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { CiCircleRemove } from "react-icons/ci";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from "../../../../redux/slices/shared/apiSlice";
import AddProduct from "../../components/Products/AddProduct/AddProduct";
import ProductsTable from "../../components/Products/ProductsTable/ProductsTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { drawerStyles } from "../../../../constants";
import { ProductData } from "./types";
import { getBase64 } from "../../../../utils/convertToBase64";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/types";
import { selectItem } from "../../../../redux/slices/dashboard/selectedItemSlice";

const ProductsDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [list, setList] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [selectedImages, setSelectedImages] = useState<
    { url: string; public_id: string }[]
  >([]);

  const [err, setErr] = useState("");
  const itemData = useSelector(
    (state: RootState) => state.selectedItem.itemData
  );
  const { data: productsData, refetch } = useGetProductsQuery({
    page,
    perPage,
  });
  const { data: categoriesData } = useGetCategoriesQuery();

  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    if (!open) {
      dispatch(selectItem({ itemData: { item: null, status: "" } }));
      setSelectedImages([]);
    }
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (productsData) {
      setList(productsData?.data?.product);
    }
  }, [productsData]);

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id).unwrap();
    refetch();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleFormSubmit = async (values: ProductData) => {
    try {
      let imgBase64: unknown[] = [];

      if (values.images && values.images.length > 0) {
        const newImages = values.images?.filter((img) => img instanceof File);

        if (newImages.length > 0) {
          imgBase64 = await Promise.all(newImages.map((img) => getBase64(img)));
        }
      }
      const finalImages = [...imgBase64];
      let res;

      if (itemData?.item && itemData.status === "edit") {
        const existingImages =
          values?.images?.filter((img) => !(img instanceof File)) || [];
        finalImages.push(...existingImages);
        res = await updateProduct({
          id: itemData?.item?._id,
          ...values,
          images: finalImages,
        });
      } else {
        res = await addProduct({ ...values, images: finalImages });
      }
      handleResponse(res);
    } catch (e) {
      console.error("Error submitting form:", e);
      setErr("An unexpected error occurred. Please try again.");
    }
  };

  const handleResponse = (res: {
    data: { success: boolean; message: string };
  }) => {
    const { success, message } = res.data;
    if (success) {
      setErr("");
      setOpen(false);
      dispatch(selectItem({ itemData: { item: null, status: "" } }));
    } else {
      setErr(message || "An error occurred");
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    const updatedSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelectedItems);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
    refetch();
  };

  const totalCount = productsData?.data?.totalCount || 0;

  return (
    <>
      <Sidebar>
        <Box>
          <Box>
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            <Box>
              <Stack direction="row" spacing={2} mb={3}>
                <Button onClick={toggleDrawer}>
                  <IoAddOutline />
                  <Typography>Add Product</Typography>
                  <Drawer
                    anchor="right"
                    open={open}
                    onClose={closeDrawer}
                    onClick={handleClick}
                  >
                    <CiCircleRemove
                      style={drawerStyles}
                      onClick={closeDrawer}
                    />
                    <AddProduct
                      selectedImages={selectedImages}
                      err={err}
                      handleFormSubmit={handleFormSubmit}
                      setSelectedImages={setSelectedImages}
                      setErr={setErr}
                      categoriesListData={categoriesData}
                    />
                  </Drawer>
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box>
            <ProductsTable
              list={productsData?.data?.product || []}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              onDeleteProduct={handleDeleteProduct}
              totalCount={totalCount}
              page={page}
              perPage={perPage}
              categories={categoriesData}
              setOpen={setOpen}
              handleCheckboxChange={handleCheckboxChange}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              setUpdateList={setUpdateList}
            />
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default ProductsDashboard;
