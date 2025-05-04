import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../../../utils/convertToBase64";
import { selectItem } from "../../../../../redux/slices/dashboard/selectedItemSlice";
import { useAddCategoryMutation, useUpdateCategoryMutation, } from "../../../../../redux/slices/shared/apiSlice";
import { categorieForm, categorieFormLable, categorieTypography, } from "../../../../../constants";
import { schema } from "../../../../../validationSchema/addCategory";
const AddEditeCategory = ({ setOpen, setUpdateList }) => {
    const [err, setErr] = useState("");
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();
    const itemData = useSelector((state) => state.selectedItem.itemData);
    const item = itemData?.item;
    const oneMb = 1048576;
    const fourMb = oneMb * 4;
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const { register, handleSubmit, setValue, formState: { errors, isValid, isLoading, isDirty }, } = useForm({
        defaultValues: {
            name: item?.name || "",
            image: "",
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = async (values) => {
        try {
            let imgBase64 = "";
            if (values.image[0] && typeof values.image[0] !== "string") {
                imgBase64 = (await getBase64(values.image[0]));
            }
            if (!itemData.item) {
                const res = await addCategory({ name: values.name, image: imgBase64 });
                handleResponse(res);
            }
            else if (itemData?.status === "edit") {
                const res = await updateCategory({
                    id: itemData?.item?._id,
                    name: values.name,
                    image: imgBase64,
                });
                handleResponse(res);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const handleResponse = (res) => {
        const data = res?.data;
        if (data?.success) {
            setErr("");
            setOpen(false);
            setUpdateList((prev) => !prev);
            dispatch(selectItem({ itemData: { item: null, status: "" } }));
        }
        else {
            setErr(data?.message || "An error occurred");
        }
    };
    const handleImageChange = (e) => {
        const img = e.target.files;
        setValue("image", img);
        setUrl(URL.createObjectURL(img?.[0]));
        setErr("");
    };
    useEffect(() => {
        if (item?.image?.url) {
            setUrl(item?.image?.url || "");
            setValue("image", item?.image?.url);
        }
    }, [item?.image?.url, setValue]);
    const isBtnDisabled = !isValid || isLoading || (!isDirty && itemData?.status !== "edit");
    return (_jsxs(Box, { style: { padding: "50px", width: "40vw" }, children: [_jsxs(Box, { children: [_jsxs(Typography, { variant: "h4", sx: categorieTypography, children: [`${itemData?.status === "edit" ? "Update" : "Add"}`, " Category"] }), _jsx(Typography, { style: {
                            fontFamily: "sans-serif",
                            fontSize: "16px",
                        }, children: "Add your Product category and necessary information from here" })] }), _jsxs("form", { style: categorieForm, onSubmit: handleSubmit(handleFormSubmit), children: [_jsx(TextField, { label: "Category Title/Name", variant: "outlined", fullWidth: true, margin: "normal", ...register("name") }), !!errors.name?.message && (_jsx("p", { style: { color: "red" }, children: errors.name?.message })), _jsxs(Box, { children: [_jsx(Typography, { variant: "h5", sx: { marginBottom: 3 }, children: "Add Image:" }), _jsx("input", { id: "images-file-upload", type: "file", style: { display: "none", width: "200px" }, size: fourMb, multiple: false, onChange: handleImageChange }), _jsx("label", { htmlFor: "images-file-upload", style: categorieFormLable, children: "Upload Images" }), !!errors.image?.message && (_jsx("p", { style: { color: "red" }, children: errors.image?.message })), url && (_jsx("img", { src: url, alt: "Category Image", style: { height: 400 } })), err && _jsx("p", { style: { color: "red" }, children: err })] }), _jsx(Button, { style: { marginTop: 20 }, variant: "contained", color: "primary", size: "large", type: "submit", disabled: isBtnDisabled, children: itemData?.status === "edit" ? "Update Category" : "Add Category" })] })] }));
};
export default AddEditeCategory;
