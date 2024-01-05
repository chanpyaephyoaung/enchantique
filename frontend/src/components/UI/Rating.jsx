const Rating = ({ ratingVal, reviewsCount }) => {
   return (
      <div data-testid="ratingComp" className="flex items-center">
         <span className="text-sm text-clr-black">
            Avg rating:{" "}
            <span data-testid="ratingVal" className="text-clr-yellow font-semibold">
               {ratingVal}
            </span>
         </span>

         <span data-testid="reviewsCount" className="text-base">
            {reviewsCount && `${reviewsCount} reviews`}
         </span>
      </div>
   );
};
export default Rating;
