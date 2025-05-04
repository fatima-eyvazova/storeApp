import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/types";
import { ROUTES } from "../../../router/routeNames";
import { useGetProfileQuery } from "../../../redux/slices/shared/apiSlice";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

interface Props {
  isClient: boolean;
  children: JSX.Element;
}

const InnerRouteGuard = ({ isClient, children }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role;

  const isAvailablePage =
    (isClient && userRole === "client") ||
    (!isClient && (userRole === "admin" || userRole === "superadmin"));

  const navigate = useNavigate();

  const { error, isLoading } = useGetProfileQuery(token, {
    skip: !token,
  });

  const redirectToHome = () => {
    if (error) {
      navigate(ROUTES.login);
      return;
    }

    if (!token || !isAvailablePage) {
      navigate(ROUTES.login);
      return;
    }

    navigate(-1);
  };

  const renderRedirectBtn = isLoading || error || !isAvailablePage;

  return (
    <>
      {renderRedirectBtn ? (
        <NotFoundPage>
          <button onClick={redirectToHome}>Return</button>
        </NotFoundPage>
      ) : (
        children
      )}
    </>
  );
};

export default InnerRouteGuard;
