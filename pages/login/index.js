import allActions from "@/store/actions";
import { all } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    dispatch(allActions.loginActions.refreshToken())
  },[])

  const access = (email, password) =>{
    dispatch(allActions.loginActions.login(email,password));
  }

  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-rose hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold text-black leading-tight mt-12">
            Log in to your account
          </h1>

          <div className="mt-6">
            <div>
              <label className="block text-black">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-black">Password</label>
              <input
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-timber hover:bg-rose focus:bg-rose text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              onClick={()=>access(email,password)}
            >
              Log In
            </button>
          </div>

          <hr className="my-6 border-gray-300 w-full"/>

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <span className="ml-4">Log in with Google</span>
            </div>
          </button>

          <p className="mt-8 text-black">
            Need an account?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
