import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/UI/Container";
import { useGetSingleOrderByIdQuery } from "../slices/ordersApiSlice.js";

const OrderPage = () => {
   const { orderId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);
   console.log(userAccInfo);

   const { data: orderInfo, error, isLoading } = useGetSingleOrderByIdQuery(orderId);
   console.log(orderInfo);

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
                  className={`text-sm md:text-xl font-medium text-clr-${
                     orderInfo.hasBeenShipped ? "primary" : "danger"
                  } p-6 bg-clr-gray rounded`}
               >
                  {orderInfo.hasBeenShipped
                     ? "The order has been shipped."
                     : "The order is not yet shipped."}
               </h2>

               <h2
                  className={`text-sm md:text-xl font-medium text-clr-${
                     orderInfo.hasBeenDelivered ? "primary" : "danger"
                  } p-6 bg-clr-gray rounded`}
               >
                  {orderInfo.hasBeenDelivered
                     ? "The order has been delivered."
                     : "The order is not yet delivered."}
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
                  Name: {userAccInfo.name}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Email: {userAccInfo.email}
               </p>
               <p className="text-sm md:text-lg font-normal text-clr-black">
                  Telephone: {userAccInfo.telephoneNum}
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
            Order placed on {new Date(orderInfo?.createdAt).toLocaleString()}
         </h2>
         {contentMarkup}
      </Container>
   );
};
export default OrderPage;
