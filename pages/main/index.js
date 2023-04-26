import styles from "@/styles/Home.module.css";
import Button from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import allActions from "@/store/actions";
import { useEffect } from "react";

const main =()=>{
  const dispatch = useDispatch();
  const remindersState = useSelector(state => state)
  
  useEffect(()=>{
      dispatch(allActions.remindersActions.getReminders());
  },[])

  useEffect(()=>{
    dispatch(allActions.loginActions.refreshToken())
  },[])

  const handleClick = () => {
    console.log("estado:",remindersState);
  };

  return (
    <>
      <main>
        <div className="bg-primary pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
          <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
              <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-m mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-500">
                    Aqui estan todos tus reminders:
                  </h3>
                </div>
                <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                  <div className="relative">
                    <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
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
                      placeholder="Buscar"
                      type="search"
                      className="border block pt-2 pr-0 pb-2 pl-10 w-full py-2
                pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
                {remindersState.reminder.reminders.map((i,index) => (
                <div key={index}>
                  <div className="pt--10 pr-0 pb-10 pl-0">
                    <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                        <div className="flex items-center flex-1 min-w-0">
                          <img
                            src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill"
                            className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                          />
                          <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                            <p className="text-lg font-bold text-gray-800 truncate">{i.description}</p>
                            <p className="text-gray-600 text-md">{i.date}</p>
                            <p className="text-gray-600 text-md">{i.when}</p>
                          </div>
                        </div>
                        <div className="grid">
                          <Button onClick={handleClick} label="Modificar"></Button>
                          <Button onClick={handleClick} label="Borrar" className="mt-2"></Button> 
                        </div>

                      </div>
                    </div>
                  </div>
                  <hr className="my-6 border-gray-300 w-full"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

export default main;