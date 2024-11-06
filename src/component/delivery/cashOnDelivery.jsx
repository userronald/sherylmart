import { useSelector } from "react-redux";

const CashOnDelivery = () => {
  const purchasedOrder = useSelector((state) => state.orders);
  const orderedItems = purchasedOrder?.orderDetails?.cartItems || [];

  const orderTotal = orderedItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Order Summary
          </h1>

          {orderedItems.length === 0 ? (
            <p className="text-center text-gray-500">No items in the cart</p>
          ) : (
            orderedItems.map((item) => (
              <div key={item.id} className="border-b py-4">
                <h5 className="text-lg font-semibold text-gray-700">
                  Product: {item.title}
                </h5>
                <p className="text-gray-600">
                  Price:{" "}
                  <span className="text-green-600 font-medium">
                    ₹{item.price}
                  </span>
                </p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            ))
          )}

          {orderedItems.length > 0 && (
            <div className="mt-6">
              <h5 className="text-lg font-semibold text-gray-800">
                Total Amount:
              </h5>
              <p className="text-2xl font-bold text-green-600">
                ₹{orderTotal.toFixed(2)}
              </p>
              {/* toFixed change the number in to two decimal,for example the amount is 60  the toFixed chnag in to 60.00 */}
            </div>
          )}

          {orderedItems.length > 0 && (
            <div className="mt-8 p-4 bg-yellow-50 rounded-md border border-yellow-200">
              <p className="text-yellow-800 font-medium">
                <span className="font-semibold">Delivery Update:</span>
                Your order will arrive within the estimated period. Payment will
                be collected at delivery (Cash on Delivery).
              </p>
            </div>
          )}
        </div>
      </div>
  
    </>
  );
};

export default CashOnDelivery;
