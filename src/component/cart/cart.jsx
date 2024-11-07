import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AddToCartPage } from "../../store/utils/thunk";
import { increaseTheQuantity,decreaseTheQuantity,removeItem } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";


const Cart=()=>{
  const cartDetails = useSelector((state)=>state.cart);
  const dispatch = useDispatch()
   
  const addQuantity = (item)=>{
    dispatch(increaseTheQuantity(item))
  }

    const reduceQuantity = (item) => {
      dispatch(decreaseTheQuantity(item));
    };


    const deleteItem = (item)=>{
      dispatch(removeItem(item));
    }


    const cartTotal=cartDetails.cartItems.reduce((total,item)=>{
        return total +(item.price * item.quantity)
    },0)

    

  useEffect(()=>{
      dispatch(AddToCartPage());
       },[]);
      

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Your Cart Items
        </h1>
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
            {cartDetails.cartItems && cartDetails.cartItems.length > 0 ? (
              cartDetails.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-200 py-4"
                >
                  <img
                    src={item.image}
                    alt="SherylMart"
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1 ml-4">
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-500">Price: ₹{item.price}</p>
                    <p className="text-gray-500">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => reduceQuantity(item.id)}
                      className="text-gray-700 px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addQuantity(item.id)}
                      className="text-gray-700 px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <FaTrash
                      size={20}
                      className="text-red-500 hover:text-red-700"
                    />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Your cart is empty</p>
            )}
            <button
              onClick={() => navigate("/")}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Continue Shopping
            </button>
          </div>

       
          <div className="bg-white p-6 rounded-lg shadow-md md:w-1/3 flex flex-col justify-between h-full">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span>Total Quantity</span>
              <span>{cartDetails.cartItems.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span>Total Price</span>
              <span>₹{cartTotal}</span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/checkout", { replace: true })}
              className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;