import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/UI/Container";
import { useGetAllOrdersByUserQuery } from "../slices/ordersApiSlice.js";

const UserProfilePage = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   const { data: myOrders, error, isLoading } = useGetAllOrdersByUserQuery();

   let contentMarkup = "";

   if (isLoading) {
      contentMarkup = <h2 className="mt-8">Please wait...</h2>;
   } else if (!myOrders) {
      contentMarkup = <h2 className="text-clr-danger mt-8">No orders made yet.</h2>;
   } else if (error) {
      contentMarkup = (
         <h2 className="text-clr-danger mt-8">{error?.data?.errMessage || error.error}</h2>
      );
   } else {
      contentMarkup = (
         <table className="w-full table-auto">
            <thead>
               <tr className="bg-clr-black-faded text-clr-white">
                  <th className="p-2 border-2 border-clr-black-faded">ID</th>
                  <th className="p-2 border-2 border-clr-black-faded">Order Placed Date</th>
                  <th className="p-2 border-2 border-clr-black-faded">Total Amount</th>
                  <th className="p-2 border-2 border-clr-black-faded">Details</th>
               </tr>
            </thead>
            <tbody>
               {myOrders.map((order) => {
                  return (
                     <tr key={order._id}>
                        <td className="p-2 border-2 border-clr-black-faded">{order._id}</td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           {new Date(order?.createdAt).toLocaleString()}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           <Link
                              to={`/order/${order._id}`}
                              className="mt-2 text-sm md:text-base font-light text-clr-primary hover:underline"
                           >
                              View
                           </Link>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      );
   }

   return (
      <Container type="page">
         <div>
            <h2 className="text-xl text-clr-black md:text-3xl font-normal mb-9">My Profile</h2>
            <div className="mt-8 grid gap-y-2">
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Name: {userAccInfo.name}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Email: {userAccInfo.email}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Telephone: {userAccInfo.telephoneNum}
               </p>
               <Link
                  to="/account-profile/update"
                  className="mt-2 text-sm md:text-base font-light text-clr-primary hover:underline"
               >
                  Update my profile
               </Link>
            </div>
         </div>

         <div className="mt-8">
            <h2 className="text-xl text-clr-black md:text-3xl font-normal mb-9">
               My Order History
            </h2>
            {contentMarkup}
         </div>
      </Container>
   );
};
export default UserProfilePage;
