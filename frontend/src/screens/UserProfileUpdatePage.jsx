import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/UI/FormContainer.jsx";
import { useDispatch } from "react-redux";
import Container from "../components/UI/Container.jsx";
import { setSignInDetails } from "../slices/authUserSlice.js";
import { useUpdateUserAccProfileMutation } from "../slices/usersApiSlice.js";

const UserProfileUpdatePage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [telephoneNum, setTelephoneNum] = useState("");
   const [error, setError] = useState(null);

   const [updateUserAccProfile, { isLoading }] = useUpdateUserAccProfileMutation();

   const submitHandler = async (e) => {
      console.log("hello");
      e.preventDefault();
      if (password !== confirmPassword) {
         setError("Passwords do not match. Please try again.");
      } else {
         try {
            const res = await updateUserAccProfile({
               name: username,
               email,
               password,
               telephoneNum,
            }).unwrap();
            console.log(res);
            dispatch(setSignInDetails({ ...res }));
            navigate("/account-profile");
         } catch (err) {
            setError(err?.data?.errMessage || err.error);
         }
      }
   };

   return (
      <Container type="page">
         <FormContainer>
            <h2 data-testid="heading" className="text-xl text-clr-black md:text-3xl font-medium">
               Update Profile
            </h2>
            <form className="grid gap-6" onSubmit={submitHandler}>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">username</span>
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
                              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                           />
                        </svg>
                     </span>

                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>
               </label>

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
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        placeholder="Email Address"
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
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">confirm password</span>
                  <div className="justify-self-stretch relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth="1.5"
                           stroke="currentColor"
                           className="w-6 h-6 text-clr-black-faded"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                           />
                        </svg>
                     </span>

                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        placeholder="Confirm Password"
                        type="password"
                        name="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">telephone number</span>
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
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                           />
                        </svg>
                     </span>

                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        placeholder="Telephone Number"
                        type="text"
                        name="telephone number"
                        value={telephoneNum}
                        onChange={(e) => setTelephoneNum(e.target.value)}
                     />
                  </div>
               </label>

               <button
                  type="submit"
                  // disabled={isLoading}
                  className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  Update
               </button>
               {isLoading && <h2>Loading...</h2>}
               {error && <h2 className="text-clr-danger text-sm md:text-base">{error}</h2>}
            </form>
         </FormContainer>
      </Container>
   );
};
export default UserProfileUpdatePage;
