import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, AddToCartPage } from "../../store/utils/thunk";
import { addToCart } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; 
import { FaTruck, FaLaptop, FaCartPlus, FaUserAlt } from "react-icons/fa";




const Home = () => {
    const [loading,setLoading]= useState(true);
    const [addedToCart, setAddedToCart] = useState([]);
    const homeProducts = useSelector((state) => state.products);
    const dispatch = useDispatch();

        useEffect(() => {
          setLoading(true);
           dispatch(fetchProducts({ page: 1, order: "desc", limit: 4 }))
           .then(()=>setLoading(false)) //stop loading when fetch completes
           .catch(()=>setLoading(false));
        }, []);

    const navigate = useNavigate();
    const userAccount = useSelector((state)=>state.users.customerName)

    const handleAddtoCart=(item)=>{
       if(userAccount==0){
         navigate("/register", { replace: true });
       }
       else{
           navigate("/", {replace:true})
       }
    dispatch(addToCart(item)); // used to add in the store
    dispatch(AddToCartPage(item))// used to add in th json server 
    setAddedToCart((prev)=>[...prev,item.id]) // used to track the added product in cart
  }


  const handleViewCart=()=>{
    navigate("/cart")
  }




  
  return (
    <>
      <section
        className="sm:h-48 md:h-80 lg:h-96 bg-center bg-no-repeat bg-[length:100%_100%]"
        style={{ backgroundImage: "url(images/sherylmart.webp)" }}
      >
        <div className="w-full h-full grid grid-cols-2">
          <div className="flex items-center justify-center bg-white p-4 md:p-6 lg:p-8">
            <div className="text-center text-gray-700 ">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Welcome to SherylMart
              </h1>
              <p className="text-sm md:text-lg mt-1 md:mt-2">
                Your one-stop shop for quality products at great prices!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center "></div>
        </div>
      </section>

      <section>
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex gap-4 justify-start bg-gray-500 py-6">
            <div className="flex-none w-48">
              <img
                src="/images/hawaiian-shirt.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
            <div className="flex-none w-48">
              <img
                src="/images/woman.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
            <div className="flex-none w-48">
              <img
                src="/images/converse.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
            <div className="flex-none w-48">
              <img
                src="/images/overall.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
            <div className="flex-none w-48">
              <img
                src="/images/pendant.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
            <div className="flex-none w-48">
              <img
                src="/images/shopping.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
            <div className="flex-none w-48">
              <img
                src="/images/desktop.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
            <div className="flex-none w-48">
              <img
                src="/images/hoodie.png"
                alt="SherylMart"
                className="w-full h-48 object-contain rounded-md p-4"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
              <div className="text-5xl mb-4">
                <FaTruck />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
              <p className="text-sm">
                Experience seamless shopping with our Cash on Delivery option,
                ensuring convenience and trust in every purchase.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
              <div className="text-5xl mb-4">
                <FaLaptop />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-sm">
                Navigate with ease! Our intuitive design makes finding and
                purchasing your favorite products a breeze.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
              <div className="text-5xl mb-4">
                <FaCartPlus />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Dynamic Cart System
              </h3>
              <p className="text-sm">
                Enjoy real-time updates on your cart, with the ability to adjust
                quantities and see prices change instantly.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
              <div className="text-5xl mb-4">
                <FaUserAlt />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Personalized Experience
              </h3>
              <p className="text-sm">
                Your initials greet you near the shopping cart, adding a
                personal touch to your SherylMart journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            Find Your Perfect Fit
          </h2>

          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="border border-red-500 bg-white p-4 rounded-lg shadow-md w-full sm:w-[48%] md:w-[23%] transition-transform transform hover:scale-105 hover:shadow-lg">
              <img
                src="/images/hoodies.webp"
                alt="Hoodies"
                className="w-full h-64 sm:h-72 lg:h-80 object-contain rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Hoodies
              </h3>
              <p className="text-sm text-gray-600">
                Cozy and stylish hoodies for every season.
              </p>
            </div>

            <div className="border border-red-500 bg-white p-4 rounded-lg shadow-md w-full sm:w-[48%] md:w-[23%] transition-transform transform hover:scale-105 hover:shadow-lg">
              <img
                src="/images/shirts.webp"
                alt="Shirts"
                className="w-full h-64 sm:h-72 lg:h-80 object-contain rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Shirts
              </h3>
              <p className="text-sm text-gray-600">
                Trend-setting shirts for all occasions.
              </p>
            </div>

            <div className="border border-red-500 bg-white p-4 rounded-lg shadow-md w-full sm:w-[48%] md:w-[23%] transition-transform transform hover:scale-105 hover:shadow-lg">
              <img
                src="/images/jeans.webp"
                alt="Jeans"
                className="w-full h-64 sm:h-72 lg:h-80 object-contain rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Jeans
              </h3>
              <p className="text-sm text-gray-600">
                Premium denim tailored for comfort.
              </p>
            </div>

            <div className="border border-red-500 bg-white p-4 rounded-lg shadow-md w-full sm:w-[48%] md:w-[23%] transition-transform transform hover:scale-105 hover:shadow-lg">
              <img
                src="/images/jacket.webp"
                alt="Jackets"
                className="w-full h-64 sm:h-72 lg:h-80 object-contain rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Jackets
              </h3>
              <p className="text-sm text-gray-600">
                Keep warm and stylish this season.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#C0C0C0]">
        <div className="text-center py-6 px-4 bg-white">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-2 animate-pulse">
            Limited Stock Alert - Only 20 Units Left!
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            Secure your order today before items sell out.
          </p>
          <p className="text-base text-gray-500 mt-2">
            Act fast—once these products are gone, they're gone for good!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-4 bg-white">
          {homeProducts.lists ? (
            homeProducts.lists.items.map((item) => (
              <div
                className="flex flex-col items-center justify-between h-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                key={item.id}
              >
                <img
                  className="w-3/4 h-48 object-contain mb-4"
                  src={`${item.image}?${item.id}`}
                  alt="SherylMart"
                />
                <div className="text-center font-medium text-gray-700 mb-2 h-12 overflow-hidden text-ellipsis line-clamp-2">
                  {item.title}
                </div>

                <div className="text-gray-800 font-semibold mb-4">
                  Price: {item.price}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    onClick={() => handleAddtoCart(item)}
                  >
                    Add to Cart
                  </button>
                  {addedToCart.includes(item.id) && (
                    <FiShoppingCart
                      className="text-2xl text-red-600 cursor-pointer hover:text-red-700"
                      onClick={handleViewCart}
                      title="View Cart"
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No Products are here</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
