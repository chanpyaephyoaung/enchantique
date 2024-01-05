import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/UI/FormContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/UI/Container.jsx";
import { saveUserDeliveryAddress } from "../slices/shoppingCartSlice.js";

const ShippingAddressPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const shoppingCart = useSelector((state) => state.shoppingCart);
   console.log(shoppingCart);
   const { userDeliveryAddress } = shoppingCart;

   const storedFirstLineAddr = userDeliveryAddress?.firstLineAddress || "";
   const storedSecondLineAddr = userDeliveryAddress?.secondLineAddress || "";
   const storedPostalCode = userDeliveryAddress?.postalCode || "";
   const storedCity = userDeliveryAddress?.city || "";

   const [firstLineAddress, setFirstLineAddress] = useState(storedFirstLineAddr);
   const [secondLineAddress, setSecondLineAddress] = useState(storedSecondLineAddr);
   const [postalCode, setPostalCode] = useState(storedPostalCode);
   const [city, setCity] = useState(storedCity);

   const submitHandler = async (e) => {
      e.preventDefault();
      dispatch(
         saveUserDeliveryAddress({
            address: { firstLineAddress, secondLineAddress, postalCode, city },
         })
      );
      navigate("/checkout");
   };

   return (
      <Container type="page">
         <FormContainer>
            <h2 className="text-xl text-clr-black md:text-3xl font-medium">Shipping Address</h2>
            <form className="grid gap-6" onSubmit={submitHandler}>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">first address line</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">
                     First Line of Address
                  </p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="first address line"
                        value={firstLineAddress}
                        onChange={(e) => setFirstLineAddress(e.target.value)}
                     />
                  </div>
               </label>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">second address line</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">
                     Second Line of Address
                  </p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="second address line"
                        value={secondLineAddress}
                        onChange={(e) => setSecondLineAddress(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">postal code</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">
                     Postal Code
                  </p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">shipping address</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">City</p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     />
                  </div>
               </label>
               <button
                  type="submit"
                  // disabled={isLoading}
                  className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  Confirm
               </button>
               {/* {isLoading && <h2>Loading...</h2>}
               {error && <h2 className="text-clr-danger text-sm md:text-base">{error}</h2>} */}
            </form>
         </FormContainer>
      </Container>
   );
};
export default ShippingAddressPage;
