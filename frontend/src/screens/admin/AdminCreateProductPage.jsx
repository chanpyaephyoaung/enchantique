import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import FormContainer from "../../components/UI/FormContainer.jsx";
import Container from "../../components/UI/Container.jsx";
import { useCreateNewProductMutation } from "../../slices/productsApiSlice.js";
import { useCreateNewNotiMutation } from "../../slices/usersApiSlice.js";

const AdminCreateProductPage = () => {
   const socket = useOutletContext();
   const navigate = useNavigate();

   const { userAccInfo } = useSelector((state) => state.authUser);

   const [createNewProduct, { isLoading }] = useCreateNewProductMutation();
   const [createNewNoti] = useCreateNewNotiMutation();

   const [prodName, setProdName] = useState();
   const [prodPrice, setProdPrice] = useState();
   const [prodDescription, setProdDescription] = useState();
   const [prodImage, setProdImage] = useState();
   const [prodBrandName, setProdBrandName] = useState();
   const [prodCategory, setProdCategory] = useState();
   const [error, setError] = useState("");

   const submitHandler = async (e) => {
      e.preventDefault();
      if (
         !prodName ||
         !prodPrice ||
         !prodDescription ||
         !prodImage ||
         !prodBrandName ||
         !prodCategory
      ) {
         setError("All fields are required to fill up.");
      } else {
         try {
            const newProduct = {
               name: prodName,
               price: prodPrice,
               description: prodDescription,
               image: prodImage,
               brandName: prodBrandName,
               category: prodCategory,
            };
            const savedProd = await createNewProduct(newProduct).unwrap();
            socket.emit("sendCreateNewProductNoti", {
               productId: savedProd._id,
            });
            createNewNoti({
               user: userAccInfo._id,
               notificationMessage: `A new product has been added to the store.`,
               payload: {
                  type: "Product",
                  id: savedProd._id,
               },
               isGeneral: true,
            });
            navigate("/admin/products/list");
         } catch (err) {
            setError(err?.data?.errMessage || err.error);
         }
      }
   };

   return (
      <Container type="page">
         <FormContainer>
            <h2 className="text-xl text-clr-black md:text-3xl font-medium">Create A New Product</h2>
            <form className="grid gap-6" onSubmit={submitHandler}>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">product</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">Name</p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="name"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                     />
                  </div>
               </label>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">product price</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">Price</p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="price"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">product description</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">
                     Description
                  </p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="description"
                        value={prodDescription}
                        onChange={(e) => setProdDescription(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">product image</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">Image URL</p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="image"
                        value={prodImage}
                        onChange={(e) => setProdImage(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">product brand</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">Brand</p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="brand"
                        value={prodBrandName}
                        onChange={(e) => setProdBrandName(e.target.value)}
                     />
                  </div>
               </label>

               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">product category</span>
                  <p className="capitalize text-base text-clr-black-faded font-medium">Category</p>
                  <div className="justify-self-stretch relative">
                     <input
                        required
                        className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                        type="text"
                        name="category"
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                     />
                  </div>
               </label>

               <button
                  type="submit"
                  className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  Create
               </button>
               {isLoading && <h2>Loading...</h2>}
               {error && <h2 className="text-clr-danger text-sm md:text-base">{error}</h2>}
            </form>
         </FormContainer>
      </Container>
   );
};
export default AdminCreateProductPage;
