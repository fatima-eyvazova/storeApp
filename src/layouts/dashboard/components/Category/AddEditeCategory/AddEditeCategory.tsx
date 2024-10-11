import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../../../utils/convertToBase64";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import { RootState } from "../../../../../redux/types";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../../redux/slices/shared/apiSlice";

interface FormValues {
  name: string;
  image: File[] | string;
}

interface Props {
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEditeCategory = ({ setOpen, setUpdateList }: Props) => {
  const [err, setErr] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const itemData = useSelector(
    (state: RootState) => state.selectedItem.itemData
  );

  const item = itemData?.item;
  const oneMb = 1048576;
  const fourMb = oneMb * 4;

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const schema = Yup.object({
    name: Yup.string().required("Kateqoriyanınin adı tələb olunur"),
    image: Yup.mixed<File[] | string>().required(
      "Kateqoriyanınin şəkili tələb olunur"
    ),
  }).required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isLoading, isDirty },
  } = useForm({
    defaultValues: {
      name: item?.name || "",
      image: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values: FormValues) => {
    try {
      let imgBase64 = "";
      if (values.image[0] && typeof values.image[0] !== "string") {
        imgBase64 = (await getBase64(values.image[0] as File)) as string;
      }

      if (!itemData.item) {
        const res = await addCategory({ name: values.name, image: imgBase64 });
        handleResponse(res);
      } else if (itemData?.status === "edit") {
        const res = await updateCategory({
          id: itemData?.item?._id,
          name: values.name,
          image: imgBase64,
        });

        handleResponse(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResponse = (res: any) => {
    const data = res?.data as { success: boolean; message?: string };
    if (data?.success) {
      setErr("");
      setOpen(false);
      setUpdateList((prev) => !prev);
      dispatch(selectItem({ itemData: { item: null, status: "" } }));
    } else {
      setErr(data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (item?.image?.url) {
      setUrl(item?.image?.url);
      setValue("image", item?.image?.url);
    }
  }, [item?.image?.url, setValue]);

  const isBtnDisabled =
    !isValid || isLoading || (!isDirty && itemData?.status !== "edit");

  return (
    <Box style={{ padding: "50px", width: "40vw" }}>
      <Box>
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
          {`${itemData?.status === "edit" ? "Update" : "Add"}`} Category
        </Typography>
        <Typography
          style={{
            fontFamily: "sans-serif",
            fontSize: "16px",
          }}
        >
          Add your Product category and necessary information from here
        </Typography>
      </Box>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <TextField
          label="Category Title/Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("name")}
        />
        {!!errors.name?.message && (
          <p style={{ color: "red" }}>{errors.name?.message}</p>
        )}
        <div className="App">
          <h2>Add Image:</h2>
          <input
            id="images-file-upload"
            type="file"
            style={{ display: "none", width: "200px" }}
            size={fourMb}
            multiple={false}
            onChange={(e) => {
              const img = e.target.files as unknown as File[];
              setValue("image", img);
              setUrl(URL.createObjectURL(img?.[0]));
              setErr("");
            }}
          />
          <label
            htmlFor="images-file-upload"
            style={{
              width: "130px",
              padding: "14px ",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Images
          </label>

          {!!errors.image?.message && (
            <p style={{ color: "red" }}>{errors.image?.message}</p>
          )}
          {url && (
            <img src={url} alt="Category Image" style={{ height: 400 }} />
          )}
          {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={isBtnDisabled}
        >
          {itemData?.status === "edit" ? "Update Category" : "Add Category"}
        </Button>
      </form>
    </Box>
  );
};

export default AddEditeCategory;
