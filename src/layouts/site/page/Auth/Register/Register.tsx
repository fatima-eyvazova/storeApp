import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import { ROUTES } from "../../../../../router/routeNames";
import MainLayout from "../../../components/shared/MainLayout/MainLayout";
import { registerSchema } from "../../../../../validationSchema/register";
import { useRegisterUserMutation } from "../../../../../redux/slices/shared/apiSlice";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { FormValues } from "./type";
import {
  boxStyles,
  buttonStyles,
  innerBoxStyles,
  navigationListStyles,
  registerNavStyles,
} from "../../../../../constants";

const Register = () => {
  const { t } = useTranslation();
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      email: "",
      surname: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const response = await registerUser(values).unwrap();
      if (response?.success) {
        navigate(ROUTES.login);
      } else {
        setErr(response?.message || "Registration failed");
      }
    } catch (error) {
      setErr("An error occurred. Please try again.");
    }
  };

  return (
    <MainLayout>
      <Box sx={boxStyles}>
        <Box sx={innerBoxStyles}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {t("account")}
            </Typography>
            <List style={navigationListStyles}>
              <ListItem>
                <Link
                  to={ROUTES.home}
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  {t("homeLogin")}
                </Link>
                <IoIosArrowForward />
              </ListItem>
              <ListItem>
                <Typography variant="body1"> {t("account")}</Typography>
              </ListItem>
            </List>
          </Box>

          <Box>
            <Box sx={registerNavStyles}>
              <Link to={ROUTES.login} style={{ textDecoration: "none" }}>
                <Typography variant="h6" sx={{ color: "black" }}>
                  {t("login")} |
                </Typography>
              </Link>
              <Link to={ROUTES.register} style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#26c6d0" }}
                >
                  {t("register")}
                </Typography>
              </Link>
            </Box>

            <div>
              <div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <TextField
                    label={t("first_name")}
                    fullWidth
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label={t("last_name")}
                    fullWidth
                    {...register("surname")}
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label={t("emailRegister")}
                    type="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label={t("passwordRegister")}
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  {err && (
                    <Typography color="error" sx={{ mb: 2 }}>
                      {err}
                    </Typography>
                  )}

                  <div className="button-box" style={{ marginTop: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={!isValid || isLoading || !isDirty}
                      endIcon={isLoading && <CircularProgress size={20} />}
                      sx={buttonStyles}
                    >
                      {t("register")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Register;
