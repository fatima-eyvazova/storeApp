import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Box, Typography, TextField, Button, TextareaAutosize, Switch, MenuItem, } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { schema } from "../../../../../validationSchema/addProductForm";
import { deleteButtonStyle, formStyles, productLable, titleStyle, } from "../../../../../constants";
const AddProduct = ({ categoriesListData, selectedImages, err, setErr, handleFormSubmit, setSelectedImages, }) => {
    const itemData = useSelector((state) => state.selectedItem.itemData);
    // const item = itemData?.item;
    const item = itemData?.item;
    const { register, handleSubmit, setValue, formState: { errors, isValid, isLoading, isDirty }, } = useForm({
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
    const handleDeleteImage = async (index) => {
        try {
            const updatedImages = selectedImages.filter((_, i) => i !== index);
            setSelectedImages(updatedImages);
            setValue("images", updatedImages);
        }
        catch (error) {
            console.error("An error occurred while deleting the image:", error);
        }
    };
    const getDeleteHandler = (index) => () => handleDeleteImage(index);
    const handleImageChange = (event) => {
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
            setSelectedImages(imageUrls);
            setValue("images", imageUrls);
        }
        if (item?.categoryId) {
            setValue("categoryId", item?.categoryId);
        }
    }, [item, setValue]);
    const handleNonNegativeInput = (e) => {
        const { name, value } = e.target;
        const nonNegativeValue = Math.max(0, +value);
        setValue(name, nonNegativeValue);
    };
    const isBtnDisabled = !isValid || isLoading || (!isDirty && itemData?.status !== "edit");
    return (_jsxs(Box, { style: { padding: "50px", width: "40vw" }, children: [_jsxs(Typography, { variant: "h4", sx: titleStyle, children: [itemData?.status === "edit" ? "Update" : "Add", " Product"] }), _jsx(Typography, { style: { fontSize: "16px", marginBottom: 3 }, children: "Add your product and necessary information from here" }), _jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), style: formStyles, children: [_jsx(TextField, { label: "Product Title", variant: "outlined", fullWidth: true, ...register("title"), sx: { marginBottom: 3, marginTop: 3 } }), errors.title?.message && (_jsx("p", { style: { color: "red" }, children: errors.title?.message })), _jsx(TextareaAutosize, { minRows: 4, placeholder: "Description", style: { width: "100%", padding: "14px" }, ...register("description") }), errors.description?.message && (_jsx("p", { style: { color: "red" }, children: errors.description?.message })), _jsx(TextField, { label: "Sale Price", variant: "outlined", type: "number", fullWidth: true, ...register("salePrice"), onChange: handleNonNegativeInput, sx: { marginBottom: 3, marginTop: 3 } }), errors.salePrice?.message && (_jsx("p", { style: { color: "red" }, children: errors.salePrice?.message })), _jsx(TextField, { label: "Product Price", variant: "outlined", type: "number", fullWidth: true, ...register("productPrice"), onChange: handleNonNegativeInput, sx: { marginBottom: 3 } }), errors.productPrice?.message && (_jsx("p", { style: { color: "red" }, children: errors.productPrice?.message })), _jsx(TextField, { label: "Category", variant: "outlined", select: true, fullWidth: true, ...register("categoryId"), sx: { marginBottom: 3 }, children: categoriesListData?.data.map((category) => (_jsx(MenuItem, { value: category._id, children: category.name }, category._id))) }), errors.categoryId?.message && (_jsx("p", { style: { color: "red" }, children: errors.categoryId?.message })), _jsxs(Box, { sx: { marginBottom: 3 }, children: [_jsx("input", { id: "images-file-upload", type: "file", multiple: true, style: { display: "none" }, onChange: handleImageChange }), _jsx("label", { htmlFor: "images-file-upload", style: productLable, children: "Upload Images" }), errors.images?.message && (_jsx("p", { style: { color: "red" }, children: errors.images?.message })), _jsx(Box, { sx: { display: "flex", gap: 3 }, children: selectedImages.map((url, index) => (_jsxs(Box, { sx: { marginTop: 3, position: "relative" }, children: [_jsx("img", { src: url.url, alt: `Product ${index}`, style: { height: 100, margin: "5px" } }), _jsx(Button, { size: "small", onClick: getDeleteHandler(index), sx: deleteButtonStyle, children: "X" })] }, index))) }), err && _jsx("p", { style: { color: "red" }, children: err }), _jsx(TextField, { label: "Stock", variant: "outlined", type: "number", fullWidth: true, ...register("stock"), onChange: handleNonNegativeInput, sx: { marginBottom: 3, marginTop: 4 } }), errors.stock?.message && (_jsx("p", { style: { color: "red" }, children: errors.stock?.message })), _jsx(Switch, { ...register("isPublish"), defaultChecked: item?.isPublish || false, color: "primary", sx: { marginTop: 2 } })] }), _jsx(Button, { variant: "contained", color: "primary", type: "submit", disabled: isBtnDisabled, children: itemData?.status === "edit" ? "Update Product" : "Add Product" })] })] }));
};
export default AddProduct;
