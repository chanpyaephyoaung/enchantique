import Container from "../../components/UI/Container";
import { useGetAllUsersByAdminQuery } from "../../slices/usersApiSlice.js";

const UsersPage = () => {
   const { data: allUsers, error, isLoading } = useGetAllUsersByAdminQuery();
   console.log(allUsers);

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
                  <th className="p-2 border-2 border-clr-black-faded">Email</th>
                  <th className="p-2 border-2 border-clr-black-faded">Joined Date</th>
                  <th className="p-2 border-2 border-clr-black-faded">Telephone</th>
                  <th className="p-2 border-2 border-clr-black-faded">&nbsp;</th>
               </tr>
            </thead>
            <tbody>
               {allUsers.map((user) => {
                  return (
                     <tr key={user._id}>
                        <td className="p-2 border-2 border-clr-black-faded">{user._id}</td>
                        <td className="p-2 border-2 border-clr-black-faded">{user.name}</td>
                        <td className="p-2 border-2 border-clr-black-faded">{user.email}</td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           {new Date(user?.joinedDate).toLocaleString()}
                        </td>
                        <td className="p-2 border-2 border-clr-black-faded">{user.telephoneNum}</td>
                        <td className="p-2 border-2 border-clr-black-faded">
                           <button
                              // onClick={() => deleteProductHandler(product._id)}
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
      </Container>
   );
};
export default UsersPage;
