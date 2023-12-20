import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ ratingVal, reviewsCount }) => {
   return (
      <div className="flex items-center">
         <span className="w-5 text-clr-yellow">
            {ratingVal >= 1 ? <FaStar /> : ratingVal >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
         </span>
         <span className="w-5 text-clr-yellow">
            {ratingVal >= 2 ? <FaStar /> : ratingVal >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
         </span>
         <span className="w-5 text-clr-yellow">
            {ratingVal >= 3 ? <FaStar /> : ratingVal >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
         </span>
         <span className="w-5 text-clr-yellow">
            {ratingVal >= 4 ? <FaStar /> : ratingVal >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
         </span>
         <span className="w-5 text-clr-yellow">
            {ratingVal >= 5 ? <FaStar /> : ratingVal >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
         </span>

         <span className="text-sm">{reviewsCount && `${reviewsCount} reviews`}</span>
      </div>
   );
};
export default Rating;
