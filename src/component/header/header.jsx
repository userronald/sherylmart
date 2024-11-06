import { NavLink, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";




    const Header=()=>{

      const cartDetails = useSelector((state) => state.cart);
      const nameDetails = useSelector((state)=>state.users);

        return (
          <header className="bg-gray-500 p-4 flex justify-between items-center mb-1">
            <Link to="/" className="text-white text-3xl font-bold">
              SherylMart
            </Link>

            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 bg-gray-100 rounded-full 
              flex justify-center items-center relative "
              >
                <img
                  src="/src/assets/images/icon/carts.png"
                  className="w-6"
                  alt="SherylMart"
                />

                {cartDetails.cartItems && cartDetails.cartItems.length > 0
                  ? cartDetails.cartItems.map((item) => (
                      <Link to="./cart" className="ml-4 text-white">
                        <span
                          className="absolute top-1/2 right-1/4 
                             bg-red-500 text-white text-sm w-5 h-5
                              rounded-full flex justify-center items-center"
                          key={item.id}
                        >
                          {cartDetails.cartItems.length}
                        </span>
                      </Link>
                    ))
                  : null}
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