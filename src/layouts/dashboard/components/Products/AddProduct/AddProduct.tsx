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
import { RootState } from "../../../../../redux/types";
import { schema } from "../../../../../validationSchema/addProductForm";
import { PropsAddProduct } from "../../../pages/ProductsDashboard/types";
import {
  deleteButtonStyle,
  formStyles,
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
  const item = itemData?.item;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isLoading, isDirty },
  } = useForm({
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      categoryId: item?.categoryId || "",
      stock: item?.stock || "",
      images: item?.images || [],
      salePrice: item?.salePrice || "",
      productPrice: item?.productPrice || "",
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

  const handleImageChange = (event: {
    target: { files: Iterable<unknown> | ArrayLike<unknown> };
  }) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => {
      return {
        url: URL.createObjectURL(file),
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
        return { url: img.url, public_id: img.public_id };
      });
      console.log({ imageUrls });

      setSelectedImages(imageUrls);
      setValue("images", imageUrls);
    }
    if (item?.categoryId) {
      setValue("categoryId", item?.categoryId);
    }
  }, [item, setValue]);

  const isBtnDisabled =
    !isValid || isLoading || (!isDirty && itemData?.status !== "edit");

  return (
    <Box style={{ padding: "50px", width: "40vw" }}>
      <Typography variant="h4" sx={titleStyle}>
        {itemData?.status === "edit" ? "Update" : "Add"} Product
      </Typography>
      <Typography style={{ fontSize: "16px" }}>
        Add your product and necessary information from here
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} sx={formStyles}>
        <TextField
          label="Product Title"
          variant="outlined"
          fullWidth
          {...register("title")}
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
        />
        {errors.productPrice?.message && (
          <p style={{ color: "red" }}>{errors.productPrice?.message}</p>
        )}
        <TextField
          label="Stock"
          variant="outlined"
          type="number"
          fullWidth
          {...register("stock")}
        />
        {errors.stock?.message && (
          <p style={{ color: "red" }}>{errors.stock?.message}</p>
        )}

        <TextField
          label="Category"
          variant="outlined"
          select
          fullWidth
          {...register("categoryId")}
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
        <div>
          <input
            id="images-file-upload"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label
            htmlFor="images-file-upload"
            style={{
              padding: "14px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Upload Images
          </label>
          {errors.images?.message && (
            <p style={{ color: "red" }}>{errors.images?.message}</p>
          )}

          {selectedImages.map((url, index) => (
            <Box key={index} position="relative">
              <img
                src={url.url}
                alt={`Product ${index}`}
                style={{ height: 100, margin: "5px" }}
              />
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteImage(index, url)}
                sx={deleteButtonStyle}
              >
                Delete
              </Button>
            </Box>
          ))}

          {err && <p style={{ color: "red" }}>{err}</p>}
          <Switch
            {...register("isPublish")}
            defaultChecked={item?.isPublish || false}
            color="primary"
          />
        </div>
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
