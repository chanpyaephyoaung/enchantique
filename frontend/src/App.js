import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar.jsx";
import AdminNavBar from "./components/Navbar/AdminNavbar.jsx";
import io from "socket.io-client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io.connect("http://localhost:3001");

let firstLoaded = false;

const App = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   useEffect(() => {
      if (!firstLoaded) {
         firstLoaded = true;
         socket.emit("newUser", userAccInfo?._id);

         socket.on("getShipProductNoti", (data) => {
            toast.success(data.message);
         });

         socket.on("getDeliverProductNoti", (data) => {
            toast.success(data.message);
         });

         socket.on("getCreateNewProductNoti", (data) => {
            toast.success(data.message);
         });

         console.log("Socket from App.js: ", socket);
      }
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
