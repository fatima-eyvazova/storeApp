import * as Yup from "yup";
export const schema = Yup.object({
    title: Yup.string().required("Product name is required"),
    description: Yup.string().required("Product description is required"),
    salePrice: Yup.number().required("Product sale price is required"),
    productPrice: Yup.number().required("Product original price is required"),
    categoryId: Yup.string().required("Product brand is required"),
    stock: Yup.number().required("Current stock quantity is required"),
    images: Yup.mixed().test("fileCount", "At least two images are required", 
    // (value) => value && value.length >= 2
    (value) => Array.isArray(value) && value.length >= 2),
    isPublish: Yup.boolean().required(),
}).required();
