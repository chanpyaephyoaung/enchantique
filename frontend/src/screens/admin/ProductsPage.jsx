import { Link } from "react-router-dom";
import Container from "../../components/UI/Container";
import {
   useGetAllProductsQuery,
   useDeleteSingleProductMutation,
} from "../../slices/productsApiSlice.js";

const ProductsPage = () => {
   const { data: allProducts, error, isLoading, refetch } = useGetAllProductsQuery();
   const [deleteSingleProduct, { isLoading: loadingDelete }] = useDeleteSingleProductMutation();

   const deleteProductHandler = async (productId) => {
      const deleteConfirm = window.confirm("Do you really want to delete this product?");
      if (deleteConfirm) {
         try {
            await deleteSingleProduct({ productId });
            console.log("Delete");
            refetch();
         } catch (err) {
            return;
         }
      }
   };

   let contentMarkup = "";

   if (isLoading) {
      contentMarkup = <h2 className="mt-8">Please wait...</h2>;
   } else if (error) {
      contentMarkup = (
         <h2 className="text-clr-danger mt-8">{error?.data?.errMessage || error.error}</h2>
      );
   } else {
      contentMarkup = (
         <table className="w-full table-auto">
            <thead>
               <tr className="bg-clr-black-faded text-clr-white">
                  <th className="p-2 border-2 border-clr-black-faded">ID</th>
                  <th className="p-2 border-2 border-clr-black-faded">Name</th>
                  <th className="p-2 border-2 border-clr-black-faded">Price</th>
                  <th className="p-2 border-2 border-clr-black-faded">Brand Name</th>
                  <th className="p-2 border-2 border-clr-black-faded">Category</th>
                  <th className="p-2 border-2 border-clr-black-faded">Stock Count</th>
                  <th className="p-2 border-2 border-clr-black-faded">&nbsp;</th>
                  <th className="p-2 border-2 border-clr-black-faded">&nbsp;</th>
               </tr>
            </thead>
            <tbody>
               {allProducts.map((product) => {
                  return (
                     <tr key={product._id}>
                        <td className="p-2 border-2 border-clr-black-faded">{product._id}</td>
                        <td className="p-2 border-2 border-clr-black-faded">{product.name}</td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           ${product.price.toFixed(2)}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">{product.brandName}</td>
                        <td className="p-2 border-2 border-clr-black-faded">{product.category}</td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           {product.stocksCount <= 0 ? "Out of Stock" : "In Stock"}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           <Link
                              to={`/product/${product._id}`}
                              className="mt-2 text-sm md:text-base font-light text-clr-primary hover:underline"
                           >
                              View
                           </Link>
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           <button
                              onClick={() => deleteProductHandler(product._id)}
                              className="text-sm md:text-base font-light text-clr-danger hover:underline"
                           >
                              Remove
                           </button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      );
   }

   return (
      <Container type="page">
         <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">Products</h2>
         {contentMarkup}
         {loadingDelete && <h2>Deleting. Please wait...</h2>}
      </Container>
   );
};
export default ProductsPage;
