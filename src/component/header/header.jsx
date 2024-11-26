import { NavLink, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";





    const Header=()=>{

      const cartDetails = useSelector((state) => state.cart);
      const nameDetails = useSelector((state)=>state.users);
  

        return (
          <header className="sticky top-0 bg-gray-500 p-4 flex justify-between items-center mb-1">
            <Link to="/" className="text-white text-3xl font-bold">
              SherylMart
            </Link>

            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 bg-gray-100 rounded-full 
               flex justify-center items-center relative"
              >
                <img
                  src="/images/icon/carts.png"
                  className="w-6"
                  alt="SherylMart"
                />

                {/* Cart item count badge */}
                {cartDetails.cartItems && cartDetails.cartItems.length > 0 && (
                  <Link to="/cart" className="absolute bottom-0 right-0">
                    <span
                      className="bg-red-500 text-white text-xs w-5 h-5
                     rounded-full flex justify-center items-center"
                    >
                      {cartDetails.cartItems.length}
                    </span>
                  </Link>
                )}
              </div>

              <div>
                {nameDetails.userInitials &&
                nameDetails.userInitials.length > 0 ? (
                  <span
                    className="
                                 absolute top-1/4 right-1/4 
                                 bg-gray-100 text-gray-500 font-bold text-sm w-12 h-12
                                 rounded-full flex justify-center items-center relative"
                  >
                    {nameDetails.userInitials}
                  </span>
                ) : null}
              </div>

           
            </div>
          </header>
        );
    }

    export default Header;