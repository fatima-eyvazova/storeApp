import { useState } from "react";
import * as Yup from "yup";
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

const Login = () => {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = Yup.object({
    email: Yup.string()
      .email("Bu e-poçt olmalıdır")
      .required("E-poçt tələb olunur"),
    password: Yup.string()
      .required("Parol tələb olunur")
      .min(6, "Parol 6 simvoldan ibarət olmalıdır"),
  }).required();

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
      setErr("Giriş sırasında bir hata oluştu.");
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          mt: 5,
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <Box mb={3}>
          <Typography variant="h4">Account</Typography>
          <List style={{ display: "flex", listStyle: "none" }}>
            <ListItem>
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
              <IoIosArrowForward className="row-icon" />
            </ListItem>
            <ListItem>
              <Typography
                variant="body1"
                sx={{
                  color: "#26c6d0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Account
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Link
              to={ROUTES.login}
              style={{
                color: "#26c6d0",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "23px" }}
              >
                Log in
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
                | Register
              </Typography>
            </Link>
          </Box>
          <Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                {err && <Typography color="error">{err}</Typography>}
                <Box className="button-box" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid || isLoading || !isDirty}
                  >
                    {isLoading ? "Loading..." : "Sign In"}
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
