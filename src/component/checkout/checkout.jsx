import {  useFormik } from "formik";
import { useDispatch,useSelector } from "react-redux";
import * as Yup from "yup";
import { showToast } from "../utils/tools";
import { sendMessage } from "../../store/utils/thunk";
import { useNavigate } from "react-router-dom";
import { storeOrderDetails } from "../../store/reducers/orders";
import { clearCart } from "../../store/reducers/cartItems";

const Checkout=()=>{
    const dispatch =useDispatch();

    const navigate = useNavigate();

    const cartItems = useSelector((state)=>state.cart)
    
    const registeredName=useSelector((state)=>state.users)

 


  const formik = useFormik({
    initialValues: {
      name: registeredName.customerName || "",
      email: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, The email is required")
        .email("This is an invalid email format"),
      name: Yup.string().required("This field is required"),
      address: Yup.string().required("This field is required"),
      phone: Yup.string().required("Your phone number  is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendMessage(values))
        .unwrap()
        .then((response) => {
          if (response) {
            resetForm();
            showToast("SUCCESS", "Your Order has been placed successfully");
             
             dispatch(storeOrderDetails(cartItems));
             dispatch(clearCart());
             navigate("/order", { replace: true });
          }
        })
        .catch((err) => {
          console.log("Error", err);
          showToast("ERROR", "Unfortunately your order has not booked");
        });

        console.log(values);
    },
  });
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="container mx-auto max-w-lg bg-white p-6 rounded shadow-lg">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <div className="form-group mt-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Name
                </label>
                <br />

                <input
                  type="text"
                  className="form-control bg-neutral-300 rounded border-2 border-gray-400 w-full p-2"
                  name="name"
                  {...formik.getFieldProps("name")}
                />

                {formik.errors.name && formik.touched.name ? (
                  <div className="flex max-w-lg rounded bg-red-100 text-red-700 overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      <div className="space-y-1">{formik.errors.name}</div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="form-group mt-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <br />
                <input
                  type="email"
                  className="form-control bg-neutral-300 rounded border-2 border-gray-400 w-full p-2"
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="flex max-w-lg rounded bg-red-100 text-red-700 overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      <div className="space-y-1">{formik.errors.email}</div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="form-group mt-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-gray-700"
                >
                  Phone
                </label>{" "}
                <br />
                <input
                  type="tel"
                  className="form-control bg-neutral-300 rounded border-2 border-gray-400 w-full p-2"
                  name="phone"
                  {...formik.getFieldProps("phone")}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="flex max-w-lg rounded bg-red-100 text-red-700 overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      <div className="space-y-1">{formik.errors.phone}</div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="form-group mt-2">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-gray-700"
                >
                  Address
                </label>
                <br />
                <input
                  type="text"
                  className="form-control bg-neutral-300 rounded border-2 border-gray-400 w-full p-2"
                  name="address"
                  {...formik.getFieldProps("address")}
                />
                {formik.errors.address && formik.touched.address ? (
                  <div className="flex max-w-lg rounded bg-red-100 text-red-700 overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      <div className="space-y-1">{formik.errors.address}</div>
                    </div>
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </>
    );
}

export default Checkout;