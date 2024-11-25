import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import Header from "./component/header/header";
 import Checkout from "./component/checkout/checkout";
import Home from "./component/home/home";
import Cart from "./component/cart/cart";
import {store,persistor} from "./store";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import CashOnDelivery from "./component/delivery/cashOnDelivery";
import UserRegistration from "./component/userRegistration/userNameRegistration";
import Footer from "./component/footer/footer";
import { lazy,Suspense } from "react";


// const Home = lazy(()=>import('./component/home/home'));
// const Cart = lazy(()=>import('./component/cart/cart'));
// const Checkout = lazy(()=>import('./component/checkout/checkout'));




createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order" element={<CashOnDelivery />} />
                <Route path="register" element={<UserRegistration />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
