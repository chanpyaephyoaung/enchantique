import { Link } from "react-router-dom";

const AdminDashboard = () => {
   return (
      <ul className="list-disc grid gap-y-2">
         <li>
            <Link
               to="/admin/orders"
               className="text-sm md:text-lg font-light text-clr-primary hover:underline"
            >
               Orders
            </Link>
         </li>
         <li>
            <Link
               to="/admin/products"
               className="text-sm md:text-lg font-light text-clr-primary hover:underline"
            >
               Products
            </Link>
         </li>
         <li>
            <Link
               to="/admin/users"
               className="text-sm md:text-lg font-light text-clr-primary hover:underline"
            >
               Users
            </Link>
         </li>
      </ul>
   );
};
export default AdminDashboard;
