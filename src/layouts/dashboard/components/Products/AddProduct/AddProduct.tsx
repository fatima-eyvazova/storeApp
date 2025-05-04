import { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  Switch,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { GetAddProductItem, RootState } from "../../../../../redux/types";
import { schema } from "../../../../../validationSchema/addProductForm";
import { PropsAddProduct } from "../../../pages/ProductsDashboard/types";
import {
  deleteButtonStyle,
  formStyles,
  productLable,
  titleStyle,
} from "../../../../../constants";

const AddProduct = ({
  categoriesListData,
  selectedImages,
  err,
  setErr,
  handleFormSubmit,
  setSelectedImages,
}: PropsAddProduct) => {
  const itemData = useSelector(
    (state: RootState) => state.selectedItem.itemData
  );
  // const item = itemData?.item;
  const item = itemData?.item as GetAddProductItem;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isLoading, isDirty },
  } = useForm({
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      categoryId: item?.categoryId,
      stock: item?.stock,
      images: item?.image || [],
      salePrice: item?.salePrice,
      productPrice: item?.productPrice,
      isPublish: item?.isPublish || false,
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleDeleteImage = async (index: number) => {
    try {
      const updatedImages = selectedImages.filter((_, i) => i !== index);
      setSelectedImages(updatedImages);
      setValue("images", updatedImages);
    } catch (error) {
      console.error("An error occurred while deleting the image:", error);
    }
  };
  const getDeleteHandler = (index: number) => () => handleDeleteImage(index);

  const handleImageChange = (event: {
    target: { files: Iterable<unknown> | ArrayLike<unknown> };
  }) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => {
      return {
        url: URL.createObjectURL(file as Blob | MediaSource),
        public_id: null,
      };
    });
    setSelectedImages([...selectedImages, ...imageUrls]);
    setValue("images", [...selectedImages, ...files]);
    setErr("");
  };

  useEffect(() => {
    if (item?.images && item?.images.length > 0) {
      const imageUrls = item?.images.map((img) => {
        return { url: img.url, public_id: img.public_id as string };
      });

      setSelectedImages(imageUrls);
      setValue("images", imageUrls);
    }
    if (item?.categoryId) {
      setValue("categoryId", item?.categoryId);
    }
  }, [item, setValue]);

  const handleNonNegativeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nonNegativeValue = Math.max(0, +value);
    setValue(
      name as
        | "categoryId"
        | "stock"
        | "salePrice"
        | "productPrice"
        | "title"
        | "description"
        | "images"
        | "isPublish",
      nonNegativeValue
    );
  };

  const isBtnDisabled =
    !isValid || isLoading || (!isDirty && itemData?.status !== "edit");

  return (
    <Box style={{ padding: "50px", width: "40vw" }}>
      <Typography variant="h4" sx={titleStyle}>
        {itemData?.status === "edit" ? "Update" : "Add"} Product
      </Typography>
      <Typography style={{ fontSize: "16px", marginBottom: 3 }}>
        Add your product and necessary information from here
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={formStyles}>
        <TextField
          label="Product Title"
          variant="outlined"
          fullWidth
          {...register("title")}
          sx={{ marginBottom: 3, marginTop: 3 }}
        />
        {errors.title?.message && (
          <p style={{ color: "red" }}>{errors.title?.message}</p>
        )}
        <TextareaAutosize
          minRows={4}
          placeholder="Description"
          style={{ width: "100%", padding: "14px" }}
          {...register("description")}
        />
        {errors.description?.message && (
          <p style={{ color: "red" }}>{errors.description?.message}</p>
        )}
        <TextField
          label="Sale Price"
          variant="outlined"
          type="number"
          fullWidth
          {...register("salePrice")}
          onChange={handleNonNegativeInput}
          sx={{ marginBottom: 3, marginTop: 3 }}
        />
        {errors.salePrice?.message && (
          <p style={{ color: "red" }}>{errors.salePrice?.message}</p>
        )}
        <TextField
          label="Product Price"
          variant="outlined"
          type="number"
          fullWidth
          {...register("productPrice")}
          onChange={handleNonNegativeInput}
          sx={{ marginBottom: 3 }}
        />
        {errors.productPrice?.message && (
          <p style={{ color: "red" }}>{errors.productPrice?.message}</p>
        )}

        <TextField
          label="Category"
          variant="outlined"
          select
          fullWidth
          {...register("categoryId")}
          sx={{ marginBottom: 3 }}
        >
          {categoriesListData?.data.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.categoryId?.message && (
          <p style={{ color: "red" }}>{errors.categoryId?.message}</p>
        )}
        <Box sx={{ marginBottom: 3 }}>
          <input
            id="images-file-upload"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="images-file-upload" style={productLable}>
            Upload Images
          </label>
          {errors.images?.message && (
            <p style={{ color: "red" }}>{errors.images?.message}</p>
          )}

          <Box sx={{ display: "flex", gap: 3 }}>
            {selectedImages.map((url, index) => (
              <Box key={index} sx={{ marginTop: 3, position: "relative" }}>
                <img
                  src={url.url}
                  alt={`Product ${index}`}
                  style={{ height: 100, margin: "5px" }}
                />
                <Button
                  size="small"
                  onClick={getDeleteHandler(index)}
                  sx={deleteButtonStyle}
                >
                  X
                </Button>
              </Box>
            ))}
          </Box>

          {err && <p style={{ color: "red" }}>{err}</p>}
          <TextField
            label="Stock"
            variant="outlined"
            type="number"
            fullWidth
            {...register("stock")}
            onChange={handleNonNegativeInput}
            sx={{ marginBottom: 3, marginTop: 4 }}
          />
          {errors.stock?.message && (
            <p style={{ color: "red" }}>{errors.stock?.message}</p>
          )}
          <Switch
            {...register("isPublish")}
            defaultChecked={item?.isPublish || false}
            color="primary"
            sx={{ marginTop: 2 }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isBtnDisabled}
        >
          {itemData?.status === "edit" ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
