const Container = ({ children, type }) => {
   return (
      <div
         className={`mx-auto w-[90%] max-w-7xl px-2 sm:px-6 lg:px-8 ${
            type === "page" ? "py-12" : ""
         }`}
      >
         {children}
      </div>
   );
};
export default Container;
