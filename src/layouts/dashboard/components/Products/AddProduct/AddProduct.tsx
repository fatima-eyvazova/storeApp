import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../../../../redux/slices/shared/apiSlice";
import { RootState } from "../../../../../redux/types";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import { getBase64 } from "../../../../../utils/convertToBase64";

interface Props {
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct = ({ setOpen, setUpdateList }: Props) => {
  const [err, setErr] = useState("");
  const [imgList, setImgList] = useState<FileList | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const dispatch = useDispatch();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMWViYzM5MC03Y2EwLTExZWYtODYwMS01YmFjMGM4NWMzYmEiLCJpYXQiOjE3MjgyMjE4NTcsImV4cCI6MTcyODMwODI1N30.SwVg2Bsw2oX5J4EKSb8vUUa9elrPFrv4JZArMrL5DZY";
  const itemData = useSelector(
    (state: RootState) => state.selectedItem.itemData
  );
  const item = itemData?.item;

  const { data: categoriesListData } = useGetCategoriesQuery(token);

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const schema = Yup.object({
    title: Yup.string().required("Produktun adı tələb olunur"),
    description: Yup.string().required("Produktun təsviri tələb olunur"),
    salePrice: Yup.number().required("Produktun satış qiyməti tələb olunur"),
    productPrice: Yup.number().required(
      "Produktun əvvəlki qiyməti tələb olunur"
    ),
    brandId: Yup.string().required("Produktun brendi tələb olunur"),
    stock: Yup.number().required(
      "Produktun hazırda stokda olan sayı tələb olunur"
    ),
    images: Yup.mixed().test(
      "fileCount",
      "Minimum iki şəkil tələb olunur",
      (value) => value && value.length >= 2
    ),
    isPublish: Yup.boolean().required(),
  }).required();

  useEffect(() => {
    return () => {
      dispatch(selectItem({ itemData: { item: null, status: "" } }));
    };
  }, [dispatch]);

  const imagesList = item?.images || [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      brandId: item?.brandId || "",
      salePrice: item?.salePrice || 0,
      productPrice: item?.productPrice || 0,
      stock: item?.stock || 0,
      images: imagesList || [],
      isPublish: item?.isPublish || false,
    },
    // mode: "onChange",
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values: any) => {
    console.log("Form values:", values);
    try {
      const base64ImgList = await Promise.all(
        Array.from(values.images).map((image: File) =>
          image?.public_id ? Promise.resolve(image) : getBase64(image)
        )
      );

      const body = {
        ...values,
        images: base64ImgList,
      };

      if (item) {
        await updateProduct({ id: item._id, body }).unwrap();
      } else {
        await addProduct(body).unwrap();
      }

      setErr("");
      setOpen(false);
      setUpdateList((prev) => !prev);
    } catch (error: any) {
      setErr(error?.data?.message || "Bir hata oluşdu.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imagesArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prev) => [...prev, ...imagesArray]);
      setValue("images", [
        ...imagesList,
        ...Array.from(files),
      ] as unknown as File[]);
      setImgList(files);
    }
  };

  return (
    <Box style={{ padding: "50px", width: "40vw" }}>
      <Typography
        variant="h4"
        style={{
          paddingBottom: "10px",
          fontFamily: "serif",
          fontSize: "24px",
          fontWeight: "600",
          color: "blue",
        }}
      >
        Məhsul əlavə et
      </Typography>
      <Typography style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
        Buradan məhsul məlumatlarınızı əlavə edin
      </Typography>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <TextField
          label="Brend adı"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextareaAutosize
          placeholder="Məhsul təsviri"
          minRows={4}
          style={{ width: "100%", padding: "8px", overflow: "hidden" }}
          {...register("description")}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}

        <input
          type="file"
          id="images-file-upload"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label
          htmlFor="images-file-upload"
          style={{
            width: "130px",
            padding: "14px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          Şəkil yüklə
        </label>

        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {imagesList.map((image, index) => (
            <img
              key={`${image.public_id}-${index}`}
              alt="product"
              style={{ width: 50, height: 50, objectFit: "cover" }}
              src={image.url}
            />
          ))}
          {selectedImages.map((image, index) => (
            <img
              key={`uploaded-${index}`}
              alt={`uploaded-${index}`}
              style={{ width: 50, height: 50, objectFit: "cover" }}
              src={image}
            />
          ))}
        </div>

        {errors.images && (
          <p style={{ color: "red" }}>{errors.images.message}</p>
        )}

        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel id="brand-label">Category</InputLabel>
          <Select
            label="Category"
            labelId="category-label"
            {...register("brandId")}
            defaultValue={item?.brandId}
          >
            {categoriesListData?.data?.map((category) => (
              <MenuItem key={category?._id} value={category?._id}>
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.brandId && (
          <p style={{ color: "red" }}>{errors.brandId.message}</p>
        )}

        <InputLabel id="original-price-label">Məhsulun qiyməti</InputLabel>
        <TextField
          type="number"
          placeholder="Əvvəlki qiymət"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          {...register("productPrice")}
          error={!!errors.productPrice}
          helperText={errors.productPrice?.message}
        />

        <InputLabel id="sale-price-label">Məhsulun satış qiyməti</InputLabel>
        <TextField
          type="number"
          placeholder="Satış qiyməti"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          {...register("salePrice")}
          error={!!errors.salePrice}
          helperText={errors.salePrice?.message}
        />

        <InputLabel id="stock-label">Stok</InputLabel>
        <TextField
          type="number"
          placeholder="Stok"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          {...register("stock")}
          error={!!errors.stock}
          helperText={errors.stock?.message}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <Switch
            {...register("isPublish")}
            defaultChecked={item?.isPublish || false}
            color="primary"
          />
          <Typography style={{ paddingLeft: "5px" }}>
            Məhsulu dərc et
          </Typography>
        </div>

        {err && <p style={{ color: "red" }}>{err}</p>}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isValid || !isDirty}
        >
          Yadda saxla
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
