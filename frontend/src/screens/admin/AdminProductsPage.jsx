import AdminProductDashboard from "../../components/Admin/AdminProductDashboard";
import Container from "../../components/UI/Container";

const AdminProductsPage = () => {
   return (
      <Container type="page">
         <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">
            Admin Products Options
         </h2>
         <AdminProductDashboard />
      </Container>
   );
};
export default AdminProductsPage;
