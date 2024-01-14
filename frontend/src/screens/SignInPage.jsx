import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FormContainer from "../components/UI/FormContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/UI/Container.jsx";
import { useSignInMutation } from "../slices/usersApiSlice.js";
import { setSignInDetails } from "../slices/authUserSlice.js";
import { toast } from "react-toastify";

const SignInPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

   // Retrieve the redirect path if there is one
   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const redirectPath = searchParams.get("redirect") || "/";

   const { userAccInfo } = useSelector((state) => state.authUser);

   const [login, { isLoading }] = useSignInMutation();

   // When the user hit checkout, redirect them to 'shipping' page if the user is already signed in
   useEffect(() => {
      if (userAccInfo) {
         navigate(redirectPath);
      }
   }, [redirectPath, userAccInfo, navigate]);

   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         const res = await login({ email, password }).unwrap();
         dispatch(setSignInDetails({ ...res }));
         navigate(redirectPath);
         toast.success("You are now signed in!");
      } catch (err) {
         setError(err?.data?.errMessage || err.error);
      }
   };

   return (
      <Container type="page">
         <FormContainer>
            <h2 data-testid="heading" className="text-xl text-clr-black md:text-3xl font-medium">
               Sign In
            </h2>
            <form className="grid gap-6" onSubmit={submitHandler}>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">email address</span>
                  <div className="justify-self-stretch relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-5 h-5 text-clr-black-faded"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                           />
                        </svg>
                     </span>

                     <input
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        placeholder="email address"
                        type="email"
                        name="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
               </label>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">password</span>
                  <div className="justify-self-stretch relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-5 h-5 text-clr-black-faded"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                           />
                        </svg>
                     </span>

                     <input
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        placeholder="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
               </label>
               <button
                  type="submit"
                  disabled={isLoading}
                  className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  Sign In
               </button>
               {isLoading && <h2>Loading...</h2>}
               {error && <h2 className="text-clr-danger text-sm md:text-base">{error}</h2>}
            </form>
            <p className="text-clr-black-faded text-xs md:text-sm">
               {`Don't have an account? `}
               <Link
                  to={redirectPath ? `/signup?redirect=${redirectPath}` : "/signup"}
                  className="text-clr-primary font-normal hover:underline"
               >
                  Sign up
               </Link>
            </p>
         </FormContainer>
      </Container>
   );
};
export default SignInPage;
