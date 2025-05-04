import * as Yup from "yup";
export const schema = Yup.object({
    name: Yup.string().required("Adminin adi tələb olunur"),
    surname: Yup.string().required("Adminin soyadi tələb olunur"),
    email: Yup.string().email().required("Adminin emaili tələb olunur"),
    password: Yup.string().required("Password tələb olunur"),
}).required();
