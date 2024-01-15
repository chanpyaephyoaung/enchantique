import { Link } from "react-router-dom";
import Container from "../../components/UI/Container";
import { useGetAllOrdersByAdminQuery } from "../../slices/ordersApiSlice.js";

const OrdersPage = () => {
   const { data: allOrders, error, isLoading } = useGetAllOrdersByAdminQuery();

   let contentMarkup = "";
   console.log(allOrders);

   if (isLoading) {
      contentMarkup = <h2 className="mt-8">Please wait...</h2>;
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
                  <th className="p-2 border-2 border-clr-black-faded">Buyer</th>
                  <th className="p-2 border-2 border-clr-black-faded">Total Amount</th>
                  <th className="p-2 border-2 border-clr-black-faded">Paid</th>
                  <th className="p-2 border-2 border-clr-black-faded">Shipped</th>
                  <th className="p-2 border-2 border-clr-black-faded">Delivered</th>
                  <th className="p-2 border-2 border-clr-black-faded">Details</th>
               </tr>
            </thead>
            <tbody>
               {allOrders.map((order) => {
                  return (
                     <tr key={order._id}>
                        <td className="p-2 border-2 border-clr-black-faded">{order._id}</td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           {new Date(order?.createdAt).toLocaleString()}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">{order?.user?.name}</td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           {order.hasBeenPaid ? "Yes" : "No"}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           {order.hasBeenShipped ? "Yes" : "No"}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           {order.hasBeenDelivered ? "Yes" : "No"}
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
         <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">User Orders</h2>
         {contentMarkup}
      </Container>
   );
};
export default OrdersPage;
