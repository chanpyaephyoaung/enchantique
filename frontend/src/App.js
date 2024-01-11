import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar.jsx";
import AdminNavBar from "./components/Navbar/AdminNavbar.jsx";
import io from "socket.io-client";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io.connect("http://localhost:3001");

const App = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   useEffect(() => {
      socket.emit("newUser", userAccInfo?._id);

      console.log("Socket from App.js: ", socket);
   }, [userAccInfo?._id]);

   return (
      <div>
         {userAccInfo?.isAdmin ? <AdminNavBar /> : <Navbar socket={socket} />}

         <Outlet context={socket} />
         <ToastContainer />
      </div>
   );
};
export default App;
