import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import allActions from "@/store/actions";

const ModalReminders = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState(false);
  const [yesterday, setYesterday] = useState(false);
  const [when, setWhen] = useState("");
  const [other, setOther] = useState("");

  const clear = () =>{
    setYesterday(false);
    setWeek(false);  
    setDescription("");
    setDate("");
    setWhen("");
    setOther("");  
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const createReminder = () => {
    dispatch(
      allActions.remindersActions.createReminder(
        description,
        date,
        when,
        state.login.email,
        other,
        week,
        yesterday
      )
    );
    dispatch(allActions.remindersActions.getReminders(""));
  };

 

  return (
    <>
      <Button onClick={openModal} className="mr-3" label="+"></Button>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Nuevo Recordatorio.
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Descripción
                      </label>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-1 text-black bg-white "
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        Fecha
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        Cuando te recuerdo?
                      </label>
                      <div className="grid">
                        <label className="text-black">
                          <input
                            type="checkbox"
                            onChange={(e) => {setYesterday(e.target.checked)}}
                          />{" "}
                          1 día antes
                        </label>
                        <label className="text-black">
                          <input
                            type="checkbox"
                            onChange={(e) => {setWeek(e.target.checked)}}
                          />{" "}
                          1 semana antes
                        </label>
                      </div>
                      <label className="block text-black text-sm font-bold mb-1">Fecha en específico</label>
                      <input
                        type="date"
                        value={when}
                        onChange={(e) => setWhen(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        Nota
                      </label>
                      <input
                        type="text"
                        value={other}
                        className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"
                        onChange={(e) => setOther(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal(); createReminder(); clear();
                      }}
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="inline-flex ml-3 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Salir sin guardar
                    </button>
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

export default ModalReminders;
