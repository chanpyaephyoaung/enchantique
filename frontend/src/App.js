import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar.jsx";
import AdminNavBar from "./components/Navbar/AdminNavbar.jsx";

const App = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   return (
      <div>
         {userAccInfo?.isAdmin ? <AdminNavBar /> : <Navbar />}

         <Outlet />
      </div>
   );
};
export default App;
