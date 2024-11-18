import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, AddToCartPage } from "../../store/utils/thunk";
import { addToCart } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // Importing the cart icon

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [clickedItems, setClickedItems] = useState([]); // Track clicked items
  const homeProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAccount = useSelector((state) => state.users.customerName);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProducts({ page: 1, order: "desc", limit: 20 }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const handleAddtoCart = (item) => {
    if (userAccount === 0) {
      navigate("/register", { replace: true });
    } else {
      setClickedItems((prev) => [...prev, item.id]); // Add item to clicked list
      dispatch(addToCart(item)); // Add to Redux store
      dispatch(AddToCartPage(item)); // Add to JSON server
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

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

      <div className="bg-[#C0C0C0]">
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
                <button
                  type="button"
                  className={`py-2 px-4 text-sm font-medium text-white rounded-lg ${
                    clickedItems.includes(item.id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={() => handleAddtoCart(item)}
                >
                  {clickedItems.includes(item.id) ? "Added" : "Add to Cart"}
                </button>

                {clickedItems.includes(item.id) && (
                  <div
                    className="mt-2 cursor-pointer text-blue-600 flex items-center"
                    onClick={handleViewCart}
                  >
                    <FiShoppingCart className="mr-1" />
                    View Cart
                  </div>
                )}
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
