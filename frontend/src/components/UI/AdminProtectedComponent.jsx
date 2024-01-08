import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedComponent = () => {
   const authUserState = useSelector((state) => state.authUser);
   const { userAccInfo } = authUserState;

   let contentMarkup;

   if (userAccInfo && userAccInfo.isAdmin) contentMarkup = <Outlet />;
   else contentMarkup = <Navigate to={"/signin"} replace />;

   return contentMarkup;
};
export default AdminProtectedComponent;
