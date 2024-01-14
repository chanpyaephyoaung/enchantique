import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../components/UI/Container";
import { useGetAllUsersNotificationsQuery } from "../slices/usersApiSlice";

const NotificationsPage = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   const {
      data: myNotis,
      error,
      isLoading: loadingNoti,
      refetch,
   } = useGetAllUsersNotificationsQuery(userAccInfo._id);

   useEffect(() => {
      refetch();
   }, [refetch]);

   let contentMarkup = "";

   if (loadingNoti) {
      contentMarkup = <h2 className="mt-8">Please wait...</h2>;
   } else if (!myNotis || myNotis.length === 0) {
      contentMarkup = <h2 className="text-clr-danger mt-8">No notifications.</h2>;
   } else if (error) {
      contentMarkup = (
         <h2 className="text-clr-danger mt-8">{error?.data?.errMessage || error.error}</h2>
      );
   } else {
      contentMarkup = myNotis.map((noti) => {
         return (
            <div
               className="flex gap-4 items-center justify-between border-b border-clr-black-faded py-2"
               key={noti._id}
            >
               <h2 className="text-clr-black text-base md:text-lg flex gap-x-2">
                  {noti.notificationMessage}
                  {noti.payload.type === "Order" && (
                     <Link
                        to={`/order/${noti.payload.id}`}
                        className="inline-block text-sm md:text-base font-light text-clr-primary hover:underline"
                     >
                        View
                     </Link>
                  )}

                  {noti.payload.type === "Product" && (
                     <Link
                        to={`/product/${noti.payload.id}`}
                        className="inline-block text-sm md:text-base font-light text-clr-primary hover:underline"
                     >
                        View
                     </Link>
                  )}
               </h2>

               <h2 className="text-clr-black-faded text-sm text-light">
                  {new Date(noti?.createdAt).toLocaleString()}
               </h2>
            </div>
         );
      });
   }

   return (
      <Container type="page">
         <div>
            <h2 className="text-xl text-clr-black md:text-3xl font-normal mb-9">
               My Notifications
            </h2>
            {contentMarkup}
         </div>
      </Container>
   );
};
export default NotificationsPage;
