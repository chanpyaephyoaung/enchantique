import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedComponent = () => {
   const authUserState = useSelector((state) => state.authUser);
   const { userAccInfo } = authUserState;

   let contentMarkup;

   if (userAccInfo) contentMarkup = <Outlet />;
   else contentMarkup = <Navigate to={"/signin"} replace />;

   return contentMarkup;
};
export default ProtectedComponent;
