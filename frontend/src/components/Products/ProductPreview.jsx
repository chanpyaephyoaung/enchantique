import { Link } from "react-router-dom";
import Rating from "../UI/Rating.jsx";

const ProductPreview = ({ id, name, imagePath, price, rating, reviewsCount }) => {
   return (
      <div data-testid="productPreview" className="w-full grid gap-1 rounded cursor-pointer">
         <Link data-testid="productImgLink" to={`/product/${id}`}>
            <img data-testid="productImg" className="" src={imagePath} alt={name} />
         </Link>
         <Link
            data-testid="productNameLink"
            to={`/product/${id}`}
            className="w-full block text-base font-medium md:text-lg text-ellipsis overflow-hidden whitespace-nowrap hover:text-clr-primary"
         >
            {name}
         </Link>
         <span data-testid="productPrice" className="text-base md:text-lg font-bold">
            ${price.toFixed(2)}
         </span>
         <div className="flex gap-x-2 items-center">
            <Rating ratingVal={rating} reviewsCount={reviewsCount} />
         </div>
      </div>
   );
};
export default ProductPreview;
