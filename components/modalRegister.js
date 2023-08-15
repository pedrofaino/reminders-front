import { useState } from "react";
import { Dialog, Transition, Fragment } from "@headlessui/react";
import Button from "@/components/button";
import allActions from "@/store/actions";
import { useDispatch } from "react-redux";
import ModalConfirmation from "./modalConfirmation";

const ModalRegister = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const clear = () =>{
    setEmail("");
    setPassword("");  
    setRePassword("");  
  }

  const register = () => {
    dispatch(allActions.loginActions.register(email, password, rePassword));
    setShowConfirmationModal(true);
    clear();
  };

  return (
    <>
      <p className="mt-8 text-black">
        Necesitas una cuenta?{" "}
        <button onClick={() => openModal()}>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Crea una cuenta
          </a>
        </button>
      </p>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium text-center leading-6 text-gray-900"
                  >
                    Registro
                  </Dialog.Title>
                  <div className="container max-w-sm mx-auto flex-1 mt-4 flex flex-col items-center justify-center px-2">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="Email"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      required
                    />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Contraseña"
                      minLength="6"
                      className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />
                    <input
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      type="password"
                      name="rePassword"
                      placeholder="Confirmar Contraseña"
                      className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      required
                    />
                    <Button
                      onClick={() => register()}
                      type="submit"
                      className="w-full text-center py-3 mt-6 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
                      label="Crea una cuenta"
                    ></Button>
                    {showConfirmationModal && <ModalConfirmation setModal={setShowConfirmationModal} />}
                    <div className="text-center text-sm text-black mt-4">
                      Con el registro aceptas todos los
                      <a
                        className="no-underline border-b border-grey-dark text-black"
                        href="#"
                      >
                        terminos y servicios
                      </a>{" "}
                      y
                      <a
                        className="no-underline border-b border-grey-dark text-black"
                        href="#"
                      >
                        la politica de privacidad
                      </a>
                    </div>
                  </div>

                  <div className="text-black mt-6">
                    Ya tienes una cuenta?
                    <a
                      className="no-underline border-b border-blue text-blue"
                      href="../login/"
                    >
                      Inicia sesión
                    </a>
                    .
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ModalRegister;
