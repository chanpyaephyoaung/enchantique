import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSignOutMutation } from "../../slices/usersApiSlice.js";
import { removeSignInDetails } from "../../slices/authUserSlice.js";
import { removeShoppingCartInfo } from "../../slices/shoppingCartSlice.js";

const UserAccountDropdown = ({ username }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [signOut] = useSignOutMutation();

   const signOutHandler = async () => {
      try {
         await signOut().unwrap();
         dispatch(removeSignInDetails());
         dispatch(removeShoppingCartInfo());
         navigate("/signin");
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Menu as="div" className="relative inline-block text-left z-40">
         <div className="grid items-center">
            <Menu.Button className="inline-flex gap-x-2 w-full justify-center rounded-md items-center">
               <UserIcon className="h-7 w-7" />
               <span className="text-base">{username}</span>
            </Menu.Button>
         </div>
         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg border border-1 border-clr-black">
               <div className="p-2">
                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to="/account-profile"
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-clr-black"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Profile
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to="/signout"
                           onClick={signOutHandler}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-clr-black"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Sign out
                        </Link>
                     )}
                  </Menu.Item>
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
};

export default UserAccountDropdown;
