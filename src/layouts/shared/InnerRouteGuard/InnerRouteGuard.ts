import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../router/routeNames";
import { useGetProfileQuery } from "../../../redux/slices/shared/apiSlice";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
const InnerRouteGuard = ({ isClient, children }) => {
    const { token, user } = useSelector((state) => state.auth);
    const userRole = user?.role;
    const isAvailablePage = (isClient && userRole === "client") ||
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
    return (_jsx(_Fragment, { children: renderRedirectBtn ? (_jsx(NotFoundPage, { children: _jsx("button", { onClick: redirectToHome, children: "Return" }) })) : (children) }));
};
export default InnerRouteGuard;
