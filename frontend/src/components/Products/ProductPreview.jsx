import { Link } from "react-router-dom";
import Rating from "../UI/Rating.jsx";

const ProductPreview = ({ id, name, imagePath, price, rating, reviewsCount }) => {
   return (
      <div className="w-full grid gap-1 rounded cursor-pointer">
         <Link to={`/product/${id}`}>
            <img className="" src={imagePath} alt={name} />
         </Link>
         <Link
            to={`/product/${id}`}
            className="w-full block text-base font-medium md:text-lg text-ellipsis overflow-hidden whitespace-nowrap hover:text-clr-primary"
         >
            {name}
         </Link>
         <span className="text-base md:text-lg font-bold">${price.toFixed(2)}</span>
         <div className="flex gap-x-2 items-center">
            <Rating ratingVal={rating} reviewsCount={reviewsCount} />
         </div>
      </div>
   );
};
export default ProductPreview;
