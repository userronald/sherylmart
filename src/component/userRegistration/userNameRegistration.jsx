import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/utils/thunk";
import { addToUser } from "../../store/reducers/users";
import { useNavigate } from "react-router-dom";



export const UserRegistration=()=>{

     const dispatch = useDispatch()
     const navigate = useNavigate();
   const formik = useFormik({
      initialValues:{
        name:"",
      },
      validationSchema:Yup.object({
         name:Yup.string().required("Your name is required")
      }),

      onSubmit:(values,{resetForm})=>{
         dispatch(sendMessage(values))
         .unwrap()
         .then((response)=>{
            if(response){
                resetForm();
                dispatch(addToUser(values.name))
                navigate("/cart",{replace:true})
                
            }
         })
         .catch((err)=>{
            console.log("Error: ",err)
         })
      }
   })

   
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
          <div className="container mx-auto max-w-md bg-white p-8 rounded-lg shadow-lg md:max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Hello!!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please enter your name below to create your account.
            </p>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <div className="form-group mt-2">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Enter Your Name
                </label>
                <br />
                <input
                  type="text"
                  className="bg-neutral-100 text-gray-700 border 
                             border-gray-300 rounded-lg w-full p-3 
                             focus:outline-none focus:ring-2 focus:ring-gray-400 
                             focus:border-gray-400 transition-all duration-150"
                  name="name"
                  {...formik.getFieldProps("name")}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="flex max-w-lg rounded bg-green-100 text-green-700 overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      <div className="space-y-1">{formik.errors.name}</div>
                    </div>
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="w-full py-3 mt-4 text-white 
                             font-semibold bg-gray-600 rounded-lg 
                             hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 
                             focus:ring-offset-2 transition-all duration-150"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default UserRegistration;