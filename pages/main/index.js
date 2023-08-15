import styles from "@/styles/Home.module.css";
import Button from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import allActions from "@/store/actions";
import { useEffect, useState } from "react";
import ModalReminders from "@/components/modalReminders";
import ModalUpdateReminders from "@/components/modalUpdateReminder";
import ModalProfile from "@/components/modalProfile";

const main = () => {
  const dispatch = useDispatch();
  const [reminder,setReminder] = useState();
  const [search, setSearch] = useState("");
  const remindersState = useSelector((state) => state);
  const showModalProfile = useSelector((state)=>state.login.showModal)

  useEffect(() => {
    dispatch(allActions.remindersActions.getReminders(search));
    dispatch(allActions.loginActions.refreshToken());
  }, [search]);
  
  const deleteReminder = (id) =>{
    dispatch(allActions.remindersActions.deleteReminder(id))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const timeZoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);
    const options = {
      month: 'long',
      day: 'numeric',
    };
    return adjustedDate.toLocaleDateString('es-ES', options);
  };

  const formatNumberIco= (dateString)=>{
    const date = new Date(dateString);
    const timeZoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);
    const options = {
      day: 'numeric',
    };
    return adjustedDate.toLocaleDateString('es-ES', options);
  }

  return (
    <>
      <main>
        <div className="bg-primary pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20 bg-[rose]">
          <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
              <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                <div className="flex">
                  <h3 className="text-m mt-1 mr-9 mb-0 ml-0 font-semi-bold text-gray-500">
                    Aqui estan todos tus reminders:
                  </h3>
                  <h3 className="text-m mt-1 mb-0 ml-24 mr-0 font-bold text-gray-500"> 
                    Nuevo recordatorio: 
                  </h3>
                </div>
                <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0 flex">
                  {showModalProfile?<ModalProfile></ModalProfile>:null}
                  <ModalReminders></ModalReminders>
                  <div className="relative">
                    <div className="flex items-center pt-0 pr-0 pb- pl-3 absolute inset-y-0 left-0 pointer-events-none">
                      <p>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21
                    21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </p>
                    </div>
                    <input
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                      placeholder="Buscar"
                      type="search"
                      className=" block pt-2 pr-0 pb-2 w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
                {remindersState.reminder.reminders.map(
                  ({ description, date, when, other, _id}, index) => (
                    <div key={index}>
                      <div className="pt--10 pr-0 pb-10 pl-0">
                        <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                            <div className="flex items-center flex-1 min-w-0">
                              <div className="relative">
                                <img
                                  src="/calendar.png"
                                  className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                                  alt="icon-calendar"
                                />
                                <span className="absolute font-bold text-xs top-0 right-0 text-black rounded-full w-3 h-3 flex pt-4 pr-8">{formatNumberIco(date)}</span>
                              </div>
                              
                              <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                <p className="text-lg font-bold text-gray-800 truncate">
                                  {description}
                                </p>
                                <p className="text-black text-md">Es el día: {formatDate(date)}</p>
                                <p className="text-black text-md">Recordarme el: {formatDate(when)}</p>
                                {other?<p className="text-black text-md">Algo que pense: {other}</p>:null}
                              </div>
                            </div>
                            <div className="grid">
                              <ModalUpdateReminders id={_id} setReminder={setReminder}></ModalUpdateReminders>
                              <Button
                                onClick={()=>deleteReminder(_id)}
                                className="pt-2 pb-2 mt-2"
                                img="/borrar.png"
                              ></Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-6 border-gray-300 w-full" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}

export default main;
