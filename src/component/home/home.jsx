import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, AddToCartPage } from "../../store/utils/thunk";
import { addToCart } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; 



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

  const loadMoreProducts = () => {
  const nextPage = homeProducts.lists.page + 1;
  dispatch(fetchProducts({ page: nextPage, limit: 16 })); // Adjust the limit as needed
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

      <section>
        <div className="flex flex-col md:flex-row gap-4 justify-center bg-gray-500">
          <div className="flex-1">
            <img
              src="/images/hawaiian-shirt.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/woman.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/converse.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/overall.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/pendant.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/shopping.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/desktop.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
          <div className="flex-1">
            <img
              src="/images/hoodie.png"
              alt="SherylMart"
              className="w-full h-48 md:h-56 object-contain rounded-md p-4 md:p-6"
            />
          </div>
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
                  className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  onClick={() => handleAddtoCart(item)}
                >
                  Add to Cart
                </button>
                {addedToCart.includes(item.id) && (
                  <FiShoppingCart
                    className="text-2xl text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={handleViewCart}
                    title="View Cart"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No Products are here</p>
          )}
        </div>
        {homeProducts.lists &&
          homeProducts.lists.items.length < 20 && ( // Highlight: Button will render only if less than 20 products are loaded
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                onClick={loadMoreProducts}
              >
                Load More Products
              </button>
            </div>
          )}
      </div>
    </>
  );
};

export default Home;
