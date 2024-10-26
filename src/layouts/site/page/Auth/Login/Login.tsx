import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";

import { ROUTES } from "../../../../../router/routeNames";
import { useLoginUserMutation } from "../../../../../redux/slices/shared/apiSlice";
import { loginUser } from "../../../../../redux/slices/shared/authSlice";
import { Profile } from "../../../../../redux/types";
import MainLayout from "../../../components/shared/MainLayout/MainLayout";
import { useTranslation } from "react-i18next";
import { useLoginSchema } from "../../../../../validationSchema/login";
import {
  accountInfo,
  containerStyle,
  linkStyle,
  loginBox,
} from "../../../../../constants";

const Login = () => {
  const { t } = useTranslation();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = useLoginSchema();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [loginUserApi, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const data = await loginUserApi(values).unwrap();
      const isSuccess = data.success;

      if (isSuccess) {
        dispatch(loginUser(data.data as Profile));
        const userRole = data.data.user?.role;
        if (userRole === "admin" || userRole === "superadmin") {
          navigate(ROUTES.orders);
        } else if (userRole === "client") {
          navigate(ROUTES.home);
        }
      } else {
        setErr(data.message);
      }
    } catch (error) {
      setErr(t("error"));
    }
  };

  return (
    <MainLayout>
      <Box sx={containerStyle}>
        <Box mb={3}>
          <Typography variant="h4">{t("account")}</Typography>
          <List style={{ display: "flex", listStyle: "none" }}>
            <ListItem>
              <Link to="/" style={{ textDecoration: "none" }}>
                {t("homeLogin")}
              </Link>
              <IoIosArrowForward />
            </ListItem>
            <ListItem>
              <Typography variant="body1" sx={accountInfo}>
                {t("account")}
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Box sx={loginBox}>
            <Link to={ROUTES.login} style={linkStyle}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "23px" }}
              >
                {t("login")}
              </Typography>
            </Link>
            <Link
              to={ROUTES.register}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "23px" }}
              >
                | {t("register")}
              </Typography>
            </Link>
          </Box>
          <Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label={t("email")}
                  type="email"
                  fullWidth
                  margin="normal"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label={t("password")}
                  type="password"
                  fullWidth
                  margin="normal"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                {err && <Typography color="error">{err}</Typography>}
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid || isLoading || !isDirty}
                  >
                    {isLoading ? t("loading") : t("signIn")}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Login;
