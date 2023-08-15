import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "@/store/actions";
import Dropdown from "./dropdown";

const Nav = () => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state) => state.login.token);

  const showProfileModal = () =>{
    dispatch(allActions.loginActions.showProfileModal(true));
  }

  return (
    <>
      <nav className="bg-white shadow fixed max-w-screen-md z-10 mx-auto inset-x-0 top-0 flex justify-between items-center">
        <Link
          href="/"
          className="font-extrabold m-3 uppercase inline-flex text-black hover:text-pink-700 transition-all duration-500"
        >
          R<span className="text-[#D5C7BC]">.</span>
          <span className="text-[#DEE8D5]">.</span>
          <span className="text-[#E9FAE3]">.</span>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 focus:outline-none md:hidden"
          title="Open side menu"
        >
          <svg
            id="mobileMenuButtonClose"
            className={`w-6 h-6 ${isMobileMenuOpen ? "" : "hidden"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            id="mobileMenuButtonOpen"
            className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          id="sideMenuHideOnMobile"
          className="bg-white font-semibold z-10 rounded-bl-md flex absolute top-0 right-0 transition-all duration-500 transform translate-x-0
                                                        w-1/2 md:w-auto
                                                        px-3 md:px-0
                                                        flex-col md:flex-row
                                                        -translate-y-full md:translate-y-0
                                                        md:mt-1 md:items-center md:mx-1 md:uppercase"
        >

          {!token?true:<Link
            href="/main"
            className="mx-0 text-black sm:mx-2 my-2 border-b-2 border-transparent hover:border-pink-600 hover:text-pink-700 transition-all duration-500 py-1 sm:p-0"
          >
            Recordatorios
          </Link>}
        
          {!token?null:<Dropdown showProfileModal={showProfileModal}/>}
            

          {!token ? (
            <Link
              href="/main"
              className="mx-0 text-black sm:mx-2 my-2 border-b-2 border-transparent hover:border-pink-600 hover:text-pink-700 transition-all duration-500 py-1 sm:p-0"
            >
              Iniciar sesión
            </Link>
          ) : null
          }
        </div>
      </nav>
    </>
  );
};

export default Nav;
