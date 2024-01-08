import { Link } from "react-router-dom";

const AdminProductDashboard = () => {
   return (
      <ul className="list-disc grid gap-y-2">
         <li>
            <Link
               to="/admin/products/new"
               className="text-sm md:text-lg font-light text-clr-primary hover:underline"
            >
               Create New Product
            </Link>
         </li>
         <li>
            <Link
               to="/admin/products/list"
               className="text-sm md:text-lg font-light text-clr-primary hover:underline"
            >
               Products
            </Link>
         </li>
      </ul>
   );
};
export default AdminProductDashboard;
