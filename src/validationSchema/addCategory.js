import * as Yup from "yup";
export const schema = Yup.object({
    name: Yup.string().required("Kateqoriyanınin adı tələb olunur"),
    image: Yup.mixed().required("Kateqoriyanınin şəkili tələb olunur"),
}).required();
