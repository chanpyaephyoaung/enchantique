import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import Container from "../UI/Container.jsx";
import SearchForm from "../Forms/SearchForm.jsx";

const Navbar = () => {
   return (
      <Disclosure as="nav" className="bg-clr-bg">
         {({ open }) => (
            <>
               <Container>
                  <div className="relative flex h-16 md:py-10 items-center justify-between">
                     <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                           <span className="absolute -inset-0.5" />
                           <span className="sr-only">Open main menu</span>
                           {open ? (
                              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                           ) : (
                              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                           )}
                        </Disclosure.Button>
                     </div>
                     <div className="flex flex-1 items-center justify-between sm:items-stretch">
                        <div className="flex flex-shrink-0 items-center">
                           <span className="font-['Playfair_Display_SC'] text-lg md:text-xl lg:text-2xl pl-3">
                              Enchantique
                           </span>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                           <div className="flex gap-x-2 items-center">
                              <SearchForm />
                              <a
                                 href="#"
                                 className="flex items-center gap-x-2 text-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                              >
                                 <span className="relative">
                                    <ShoppingCartIcon className="h-7 w-7 md:h-8 md:w-8" />
                                    <span className="flex justify-center leading-none items-center w-5 h-5 text-xs md:text-sm md:w-7 md:h-7 absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-clr-primary text-clr-white rounded-full">
                                       1
                                    </span>
                                 </span>
                                 <span className="text-base md:text-lg">Cart</span>
                              </a>

                              <a
                                 href="#"
                                 className="flex items-center gap-x-2 text-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                              >
                                 <UserIcon className="h-7 w-7 md:h-8 md:w-8" />
                                 <span className="text-base md:text-lg">Login</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </Container>

               <Disclosure.Panel className="sm:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                     <Disclosure.Button
                        as="a"
                        className="flex items-center gap-x-2 text-clr-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                     >
                        <span className="relative">
                           <ShoppingCartIcon className="h-7 w-7 md:h-8 md:w-8" />
                           <span className="flex justify-center leading-none items-center w-5 h-5 text-xs md:text-sm md:w-7 md:h-7 absolute -top-3 -right-3 bg-clr-primary text-clr-white rounded-full">
                              1
                           </span>
                        </span>
                        Cart
                     </Disclosure.Button>

                     <Disclosure.Button
                        as="a"
                        className="flex items-center gap-x-2 text-clr-black hover:text-clr-primary rounded-md px-3 py-2 text-sm font-normal"
                     >
                        <UserIcon className="h-7 w-7 md:h-8 md:w-8" />
                        Sign In
                     </Disclosure.Button>

                     <div className="px-3 py-2">
                        <SearchForm />
                     </div>
                  </div>
               </Disclosure.Panel>
            </>
         )}
      </Disclosure>
   );
};
export default Navbar;
