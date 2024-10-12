import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/types";
import { ROUTES } from "../../../router/routeNames";
import { useGetProfileQuery } from "../../../redux/slices/shared/apiSlice";

interface Props {
  children: JSX.Element;
}

const AuthGuard = ({ children }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role;

  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProfileQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (error) {
      console.error("Auth error:", error);
    } else if (data) {
      if (userRole === "admin" || userRole === "superadmin") {
        navigate(ROUTES.orders);
      } else if (userRole === "client") {
        navigate(ROUTES.home);
      }
    }
  }, [data, error, userRole, navigate]);

  if (isLoading || error) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
