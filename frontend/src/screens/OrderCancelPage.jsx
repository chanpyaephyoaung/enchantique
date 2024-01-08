import Container from "../components/UI/Container";
import { useParams } from "react-router-dom";
import { useCancelOrderMutation } from "../slices/ordersApiSlice.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderCancelPage = () => {
   const { orderId } = useParams();

   const [message, setMessage] = useState("");
   const [cancelOrder] = useCancelOrderMutation();

   useEffect(() => {
      const cancelCurrentOrder = async () => {
         if (orderId) {
            const res = await cancelOrder(orderId).unwrap();
            setMessage(res.message);
         } else return;
      };

      cancelCurrentOrder();
   }, [orderId, cancelOrder]);

   return (
      <Container type="page">
         <Link
            to="/"
            className="inline-block transition-all rounded-full text-sm md:text-base text-clr-black py-3 px-5 border border-clr-black font-medium hover:bg-clr-primary hover:text-clr-white"
         >
            Go Back
         </Link>
         <h2 className="text-xl text-clr-black md:text-3xl font-normal mt-9">{message}</h2>
      </Container>
   );
};
export default OrderCancelPage;
