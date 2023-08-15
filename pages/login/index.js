import allActions from "@/store/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getGoogleOAuthURL from "@/utils/getGoogleUrl"
import ModalRegister from "@/components/modalRegister";
import { useRouter } from "next/router";



export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector(state=>state.login.error)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    dispatch(allActions.loginActions.refreshToken())
  },[])

  const access = (email, password) =>{
    dispatch(allActions.loginActions.login(email,password));
    if(error!=null){
      alert(error);
    }
    router.push("/main");
  }

  return (
    <div className="flex bg-primary flex-col md:flex-row h-screen items-center">
      <div
        className="bg-white max-h-[40rem] rounded md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full">
          <h1 className="text-xl md:text-2xl font-bold text-black leading-tight mt-12">
            Inicia sesión con tu cuenta
          </h1>

          <div className="mt-6">
            <div>
              <label className="block text-black">Dirección de Correo</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name=""
                id="email"
                placeholder="Ingresa tu dirección de correo"
                className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-black">Contraseña</label>
              <input
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                id="password"
                placeholder="Ingresa la contraseña"
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
                Olvidaste la contraseña?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full block bg-4 hover:bg-secondary focus:bg-rose text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              onClick={()=>access(email,password)}
            >
              Inicia sesión
            </button>
          </div>

          <hr className="my-6 border-gray-300 w-full"/>
          <a href={getGoogleOAuthURL()}>
            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <span className="ml-4">Inicia sesión con google</span>
              </div>
            </button>
          </a>
          <ModalRegister></ModalRegister>
        </div>
      </div>
    </div>
  );
}
