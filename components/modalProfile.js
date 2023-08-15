import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dialog, Transition, Fragment } from "@headlessui/react";
import allActions from "@/store/actions";
import Button from "@/components/button";

const ModalProfile = () => {
  const dispatch = useDispatch();
  const emailUser = useSelector((state) => state.login.email);
  const user = useSelector((state) => state.user.currentUser);
  const [name, setName] = useState(user?user.name:"");
  const [lastName, setLastName] = useState(user?user.lastName:"");
  const [email, setEmail] = useState(user?user.email:"");

  const [isOpen, setIsOpen] = useState(true);

  useEffect(()=>{
    dispatch(allActions.userActions.getUser(emailUser))
  },[])

  const updateUser = () =>{
    dispatch(allActions.userActions.updateUser(user._id,name,lastName,email))
  }

  const closeModal = () => {
    setIsOpen(false);
    dispatch(allActions.loginActions.showProfileModal(false));
  };

  return (
    <>
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
                    Mi perfil
                  </Dialog.Title>
                  <div className="container max-w-sm mx-auto flex-1 mt-4 flex flex-col items-center justify-center px-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="Name"
                      placeholder="Nombre"
                      className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      required
                    />
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      name="Name"
                      placeholder="Apellido"
                      className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      required
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Correo"
                      minLength="6"
                      className="w-full px-4 py-3 text-black rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />

                    <Button
                      onClick={()=>{updateUser();closeModal()}}
                      type="submit"
                      className="w-full text-center py-3 mt-6 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
                      label="Actualiza tu cuenta"
                    ></Button>
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

export default ModalProfile;
