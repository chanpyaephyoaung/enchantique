import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import {
   Bars3Icon,
   XMarkIcon,
   ShoppingCartIcon,
   UserIcon,
   ArrowRightStartOnRectangleIcon,
   BellIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import Container from "../UI/Container.jsx";
import SearchForm from "../Forms/SearchForm.jsx";
import UserAccountDropdown from "./UserAccountDropdown.jsx";
import { useCreateNewNotiMutation } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";

let firstLoaded = false;

const Navbar = ({ socket }) => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { productsInCart } = useSelector((state) => state.shoppingCart);

   const [createNewNoti] = useCreateNewNotiMutation();

   useEffect(() => {
      if (!firstLoaded) {
         firstLoaded = true;

         socket.on("getShipOrderNoti", ({ message }) => {
            toast.success(message);
         });

         socket.on("getDeliverOrderNoti", ({ message }) => {
            toast.success(message);
         });

         socket.on("getCreateNewProductNoti", ({ message }) => {
            toast.success(message);
         });

         console.log("Socket from App.js: ", socket);
      }
   }, [socket, createNewNoti, userAccInfo?._id]);

   console.log("Socket From Navbar: ", socket);

   return (
      <Disclosure as="nav" className="bg-clr-bg">
         {({ open }) => (
            <>
               <Container>
                  <div className="relative flex h-16 md:py-10 items-center justify-between">
                     <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                           <span className="absolute -inset-0.5" />
                           <span className="sr-only">Open main menu</span>
                           {open ? (
                              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                           ) : (
                              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                           )}
                        </Disclosure.Button>
                     </div>
                     <div className="flex flex-1 items-center justify-between sm:items-stretch">
                        <div className="flex flex-shrink-0 items-center">
                           <Link
                              to="/"
                              className="font-['Playfair_Display_SC'] text-lg md:text-xl lg:text-2xl"
                           >
                              Enchantique
                           </Link>
                        </div>

                        <div className="hidden sm:ml-6 sm:block">
                           <div className="flex gap-x-3 items-center">
                              <SearchForm />
                              <Link
                                 to="/shopping-cart"
                                 className="flex items-center gap-x-2 text-black hover:text-clr-primary rounded-md px-1 py-2 text-sm font-normal"
                              >
                                 <span className="relative">
                                    <ShoppingCartIcon className="h-7 w-7" />

                                    {productsInCart.length > 0 && (
                                       <span className="flex justify-center leading-none items-center w-5 h-5 text-xs md:w-6 md:h-6 absolute -top-3 -right-3 bg-clr-primary text-clr-white rounded-full">
                                          {productsInCart.reduce(
                                             (acc, curProd) => acc + curProd.quantity,
                                             0
                                          )}
                                       </span>
                                    )}
                                 </span>
                                 <span className="text-base">Cart</span>
                              </Link>

                              {userAccInfo ? (
                                 <>
                                    <Link
                                       to={`/user/${userAccInfo._id}/notifications`}
                                       className="flex items-center gap-x-2 text-black hover:text-clr-primary rounded-md px-1 py-2 text-sm font-normal"
                                    >
                                       <BellIcon className="h-7 w-7" />

                                       <span className="text-base">Notifications</span>
                                    </Link>
                                    <div className="flex items-center gadiv-x-2 text-black hover:text-clr-primary rounded-md px-1 py-2 text-sm font-normal">
                                       <UserAccountDropdown
                                          username={userAccInfo.name.split(" ")[0]}
                                       />
                                    </div>
                                 </>
                              ) : (
                                 <Link
                                    to="/signin"
                                    className="flex items-center gap-x-2 text-black hover:text-clr-primary rounded-md px-1 py-2 text-sm font-normal"
                                 >
                                    <UserIcon className="h-7 w-7" />
                                    <span className="text-base">Sign In</span>
                                 </Link>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </Container>

               <Disclosure.Panel className="sm:hidden">
                  <div className="grid space-y-1 px-2 pb-3 pt-2">
                     <Disclosure.Button as="button">
                        <Link
                           to="/shopping-cart"
                           className="flex items-center gap-x-2 text-clr-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                        >
                           <span className="relative">
                              <ShoppingCartIcon className="h-7 w-7 md:h-8 md:w-8" />
                              {productsInCart.length > 0 && (
                                 <span className="flex justify-center leading-none items-center w-5 h-5 text-xs md:w-6 md:h-6 absolute -top-3 -right-3 bg-clr-primary text-clr-white rounded-full">
                                    {productsInCart.reduce(
                                       (acc, curProd) => acc + curProd.quantity,
                                       0
                                    )}
                                 </span>
                              )}
                           </span>
                           Cart
                        </Link>
                     </Disclosure.Button>

                     {userAccInfo ? (
                        <>
                           <Disclosure.Button as="button">
                              <Link
                                 to={`/user/${userAccInfo._id}/notifications`}
                                 className="flex items-center gap-x-2 text-clr-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                              >
                                 <BellIcon className="h-7 w-7" />
                                 Notifications
                              </Link>
                           </Disclosure.Button>
                           <Disclosure.Button as="button">
                              <Link
                                 to="/profile"
                                 className="flex items-center gap-x-2 text-clr-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                              >
                                 <UserIcon className="h-7 w-7 md:h-8 md:w-8" />
                                 My Profile
                              </Link>
                           </Disclosure.Button>
                           <Disclosure.Button as="button">
                              <Link
                                 to="/signout"
                                 className="flex items-center gap-x-2 text-clr-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                              >
                                 <ArrowRightStartOnRectangleIcon className="h-7 w-7 md:h-8 md:w-8" />
                                 Sign out
                              </Link>
                           </Disclosure.Button>
                        </>
                     ) : (
                        <Disclosure.Button as="button">
                           <Link
                              to="/signin"
                              className="flex items-center gap-x-2 text-clr-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                           >
                              <UserIcon className="h-7 w-7 md:h-8 md:w-8" />
                              Sign In
                           </Link>
                        </Disclosure.Button>
                     )}

                     <div className="px-3 py-2">
                        <SearchForm />
                     </div>
                  </div>
               </Disclosure.Panel>
            </>
         )}
      </Disclosure>
   );
};
export default Navbar;
