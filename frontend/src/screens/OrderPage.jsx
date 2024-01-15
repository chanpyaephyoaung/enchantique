import { Link, useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/UI/Container";
import {
   useGetSingleOrderByIdQuery,
   useShipOrderMutation,
   useDeliverOrderMutation,
} from "../slices/ordersApiSlice.js";
import { useCreateNewNotiMutation } from "../slices/usersApiSlice.js";

const OrderPage = () => {
   const socket = useOutletContext();
   console.log("Socket From Order Page: ", socket);
   const { orderId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);

   const { data: orderInfo, error, isLoading, refetch } = useGetSingleOrderByIdQuery(orderId);
   const [createNewNoti] = useCreateNewNotiMutation();

   const [shipOrder, { isLoading: loadingShipping }] = useShipOrderMutation();
   const [deliverOrder, { isLoading: loadingDelivery }] = useDeliverOrderMutation();

   const shipOrderHandler = async () => {
      try {
         await shipOrder(orderId);
         refetch();

         socket.emit("sendShipOrderNoti", {
            buyerId: orderInfo.user._id.toString(),
            orderId: orderInfo._id,
         });
         createNewNoti({
            user: orderInfo.user._id,
            notificationMessage: `Your order (${orderInfo._id}) has been shipped.`,
            payload: {
               type: "Order",
               id: orderInfo._id,
            },
         });
      } catch (err) {
         return;
      }
   };

   const deliverOrderHandler = async () => {
      try {
         await deliverOrder(orderId);
         refetch();
         socket.emit("sendDeliverOrderNoti", {
            buyerId: orderInfo.user._id.toString(),
            orderId: orderInfo._id,
         });
         createNewNoti({
            user: orderInfo.user._id,
            notificationMessage: `Your order (${orderInfo._id}) has been delivered.`,
            payload: {
               type: "Order",
               id: orderInfo._id,
            },
         });
      } catch (err) {
         return;
      }
   };

   let contentMarkup = "";

   if (isLoading) {
      contentMarkup = <h2 className="mt-8">Please wait...</h2>;
   } else if (error) {
      contentMarkup = (
         <h2 className="text-clr-danger mt-8">{error?.data?.errMessage || error.error}</h2>
      );
   } else {
      contentMarkup = (
         <div className="grid">
            <div className="mb-8 grid gap-y-2">
               <h2 className="text-sm md:text-xl font-medium text-clr-primary">Delivery Address</h2>
               <p className="text-sm md:text-lg font-normal text-clr-black grid">
                  <span>{orderInfo.userDeliveryAddress.firstLineAddress}</span>
                  <span>{orderInfo.userDeliveryAddress.secondLineAddress}</span>
                  <span>{orderInfo.userDeliveryAddress.postalCode}</span>
                  <span>{orderInfo.userDeliveryAddress.city}</span>
               </p>
            </div>
            <div className="grid gap-y-3">
               <h2
                  className={`text-sm md:text-xl font-medium text-clr-${
                     orderInfo.hasBeenPaid ? "primary" : "danger"
                  } p-6 bg-clr-gray rounded`}
               >
                  {orderInfo.hasBeenPaid
                     ? "The order has been paid."
                     : "The order is not yet paid."}
               </h2>

               <h2
                  className={`flex justify-between items-center text-sm md:text-xl font-medium text-clr-${
                     orderInfo.hasBeenShipped ? "primary" : "danger"
                  } p-6 bg-clr-gray rounded`}
               >
                  <span>
                     {orderInfo.hasBeenShipped
                        ? "The order has been shipped."
                        : "The order is not yet shipped."}
                  </span>
                  {orderInfo.hasBeenShipped && (
                     <span>{new Date(orderInfo?.shippingDate).toLocaleString()}</span>
                  )}
                  {loadingShipping && <span className="">Loading...</span>}
                  {orderInfo.hasBeenPaid &&
                     userAccInfo &&
                     userAccInfo.isAdmin &&
                     !orderInfo.hasBeenShipped &&
                     !orderInfo.hasBeenDelivered && (
                        <button
                           type="button"
                           onClick={shipOrderHandler}
                           className="transition-all rounded bg-clr-danger text-clr-white border border-clr-black font-medium hover:bg-clr-primary hover:text-clr-white py-2 px-4"
                        >
                           Set to Shipped
                        </button>
                     )}
               </h2>

               <h2
                  className={`flex justify-between items-center text-sm md:text-xl font-medium text-clr-${
                     orderInfo.hasBeenDelivered ? "primary" : "danger"
                  } p-6 bg-clr-gray rounded`}
               >
                  <span>
                     {orderInfo.hasBeenDelivered
                        ? "The order has been delivered."
                        : "The order is not yet delivered."}
                  </span>
                  {orderInfo.hasBeenDelivered && (
                     <span>{new Date(orderInfo?.deliveryDate).toLocaleString()}</span>
                  )}
                  {loadingDelivery && <span className="">Loading...</span>}
                  {orderInfo.hasBeenPaid &&
                     orderInfo.hasBeenShipped &&
                     userAccInfo &&
                     userAccInfo.isAdmin &&
                     !orderInfo.hasBeenDelivered && (
                        <button
                           type="button"
                           onClick={deliverOrderHandler}
                           className="transition-all rounded bg-clr-danger text-clr-white border border-clr-black font-medium hover:bg-clr-primary hover:text-clr-white py-2 px-4"
                        >
                           Set to Delivered
                        </button>
                     )}
               </h2>
            </div>
            <div className="mt-8">
               <h2 className="text-sm md:text-xl font-medium text-clr-primary">Order Products</h2>
               <div className="grid gap-y-6 mt-8">
                  {orderInfo.orderedProducts.map((prod) => (
                     <div
                        key={prod._id}
                        className="grid grid-cols-3 sm:grid-cols-4 py-4 gap-4 justify-items-center border-b border-clr-black-faded"
                     >
                        <Link
                           to={`/product/${prod._id}`}
                           className="w-full col-span-1 mx-auto block"
                        >
                           <img src={prod.image} alt={prod.name} />
                        </Link>
                        <div className="w-full grid col-span-2 sm:col-span-3 self-start">
                           <div className="grid gap-y-2">
                              <Link
                                 to={`/product/${prod._id}`}
                                 className="text-sm md:text-lg font-medium text-clr-black"
                              >
                                 {prod.name}
                              </Link>
                              <p className="text-sm md:text-lg font-semibold text-clr-primary">
                                 ${prod.price}
                              </p>
                              <p className="text-sm md:text-lg font-semibold text-clr-black">
                                 x{prod.quantity}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-8 grid gap-y-2">
               <h2 className="text-sm md:text-xl font-medium text-clr-primary">Buyer Info</h2>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Name: {orderInfo.user.name}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Email: {orderInfo.user.email}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Telephone: {orderInfo.user.telephoneNum}
               </p>
            </div>

            <div className="mt-8 grid gap-y-2">
               <h2 className="text-sm md:text-xl font-medium text-clr-primary">Price Info</h2>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Products Price: ${orderInfo.totalRawProductPrice}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Tax: ${orderInfo.taxAmount.toFixed(2)}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Shipping Amount: ${orderInfo.shippingAmount.toFixed(2)}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Total Amount: ${orderInfo.totalAmount.toFixed(2)}
               </p>
            </div>
         </div>
      );
   }
   return (
      <Container type="page">
         <h2 className="text-xl text-clr-black md:text-3xl font-normal mb-9">
            Order ID - {orderId}
         </h2>
         <h2 className="text-sm md:text-lg font-medium text-clr-black mb-4">
            Order placed on {isLoading ? "..." : new Date(orderInfo?.createdAt).toLocaleString()}
         </h2>
         {contentMarkup}
      </Container>
   );
};
export default OrderPage;
