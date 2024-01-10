import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedComponent = () => {
   const socket = useOutletContext();
   const authUserState = useSelector((state) => state.authUser);
   const { userAccInfo } = authUserState;

   let contentMarkup;

   if (userAccInfo) contentMarkup = <Outlet context={socket} />;
   else contentMarkup = <Navigate to={"/signin"} replace />;

   return contentMarkup;
};
export default ProtectedComponent;
