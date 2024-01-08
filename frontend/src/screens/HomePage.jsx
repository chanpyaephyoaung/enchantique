import { useSelector } from "react-redux";
import ProductList from "../components/Products/ProductList.jsx";
import Container from "../components/UI/Container.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";

const HomePage = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   let contentMarkup = "";

   if (!userAccInfo?.isAdmin) {
      contentMarkup = (
         <>
            <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">Our Products</h2>
            <ProductList />
         </>
      );
   } else {
      contentMarkup = (
         <>
            <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">Admin Options</h2>
            <AdminDashboard />
         </>
      );
   }

   return <Container type="page">{contentMarkup}</Container>;
};
export default HomePage;
