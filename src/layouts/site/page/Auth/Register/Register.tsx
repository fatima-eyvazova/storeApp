import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Container,
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

type FormValues = {
  name: string;
  password: string;
  email: string;
  surname: string;
};

const Register = () => {
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
      <Box
        sx={{
          mt: 4,
          padding: 7,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "sm",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Account
            </Typography>
            <List
              className="navigation"
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ListItem>
                <Link
                  to={ROUTES.home}
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
                <IoIosArrowForward className="row-icon" />
              </ListItem>
              <ListItem>
                <Typography variant="body1">Account</Typography>
              </ListItem>
            </List>
          </Box>

          <div className="register-wrapper">
            <div
              className="register-nav"
              style={{
                display: "flex",
                marginBottom: "2px",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Link
                to={ROUTES.login}
                className="link-register"
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h6" sx={{ color: "black" }}>
                  Log in |
                </Typography>
              </Link>
              <Link
                to={ROUTES.register}
                className="link-active"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#26c6d0" }}
                >
                  Register
                </Typography>
              </Link>
            </div>

            <div className="tab-content">
              <div className="form-container">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <TextField
                    label="First Name"
                    fullWidth
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label="Last Name"
                    fullWidth
                    {...register("surname")}
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label="Email"
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
                    label="Password"
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
                      sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#115293",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Register;
