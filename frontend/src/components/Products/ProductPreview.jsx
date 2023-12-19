import { StarIcon } from "@heroicons/react/24/outline";

const ProductPreview = ({ name, imagePath, price, rating, ratingCount }) => {
   return (
      <div className="w-full grid gap-1 rounded cursor-pointer">
         <img className="" src={imagePath} alt={name} />
         <span className="w-full block text-base font-medium md:text-lg text-ellipsis overflow-hidden whitespace-nowrap hover:text-clr-primary">
            {name}
         </span>
         <span className="text-base md:text-lg font-bold">${price.toFixed(2)}</span>
         <div className="flex gap-x-2 items-center">
            <div className="flex">
               <StarIcon className="w-5 fill-clr-yellow" />
               <StarIcon className="w-5 fill-clr-yellow" />
               <StarIcon className="w-5 fill-clr-yellow" />
               <StarIcon className="w-5 fill-clr-yellow" />
               <StarIcon className="w-5" />
            </div>
            <span>({ratingCount})</span>
         </div>
      </div>
   );
};
export default ProductPreview;
