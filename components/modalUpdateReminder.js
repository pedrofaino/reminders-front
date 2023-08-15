import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Button from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import allActions from "@/store/actions";

const ModalUpdateReminders = ({ id, setReminder }) => {
  const dispatch = useDispatch();
  const reminder = useSelector((state) => state.reminder.currentReminder?.reminder);
  const email = useSelector((state) => state.login.email);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState(reminder?reminder.week:false);
  const [yesterday, setYesterday] = useState(reminder?reminder.yesterday:false);
  const [when, setWhen] = useState("");
  const [other, setOther] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const timeZoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return adjustedDate.toLocaleDateString('en-CA', options);
  };
  const openModal = () => {
    dispatch(allActions.remindersActions.getReminder(id));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (reminder) {
      setDescription(reminder?.description);
      setDate(formatDate(reminder?.date));
      setYesterday(reminder?.yesterday)
      setWeek(reminder?.week)
      setWhen(formatDate(reminder?.when));
      setOther(reminder?.other);
    }
  }, [reminder]);

  const updateReminder = () => {
    dispatch(allActions.remindersActions.updateReminder(id,description,date,when,other,email,yesterday,week))
  };

  useEffect(()=>{
    setReminder({description,date,when,other,yesterday,week})
  },[description,date,when,other,yesterday,week])

  return (
    <>
      <Button onClick={openModal} className="pt-2 pb-2" img="/lapiz.png"></Button>

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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Actualizar recordatorio.
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"
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
                        onChange={(e)=>setOther(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-1 text-black bg-white" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal(), updateReminder();
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

export default ModalUpdateReminders;
