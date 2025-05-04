import * as Yup from "yup";
import { useTranslation } from "react-i18next";
export const useLoginSchema = () => {
    const { t } = useTranslation();
    return Yup.object({
        email: Yup.string().email(t("invalidEmail")).required(t("requiredEmail")),
        password: Yup.string()
            .required(t("requiredPassword"))
            .min(6, t("passwordMinLength")),
    }).required();
};
