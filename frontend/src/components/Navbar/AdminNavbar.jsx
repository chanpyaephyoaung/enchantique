import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "../UI/Container.jsx";
import { useSignOutMutation } from "../../slices/usersApiSlice.js";
import { removeSignInDetails } from "../../slices/authUserSlice.js";

const AdminNavBar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [signOut] = useSignOutMutation();

   const signOutHandler = async () => {
      try {
         await signOut();
         dispatch(removeSignInDetails());
         navigate("/");
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <div className="bg-clr-bg">
         <Container>
            <div className="relative flex h-16 md:py-10 items-center justify-between">
               <div className="flex flex-shrink-0 items-center">
                  <Link
                     to="/"
                     className="font-['Playfair_Display_SC'] text-lg md:text-xl lg:text-2xl"
                  >
                     Enchantique
                  </Link>
               </div>

               <div className="flex gap-x-2">
                  <Link
                     to="/"
                     className="flex items-center gap-x-2 text-black hover:text-clr-primary rounded-md px-1 py-2 text-base font-normal"
                  >
                     Admin
                  </Link>

                  <Link
                     onClick={signOutHandler}
                     to="/"
                     className="flex items-center gap-x-2 text-black hover:text-clr-primary rounded-md px-1 py-2 text-base font-normal"
                  >
                     Sign out
                  </Link>
               </div>
            </div>
         </Container>
      </div>
   );
};
export default AdminNavBar;
