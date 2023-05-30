import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Button from "@/components/button";
import { useDispatch } from 'react-redux';
import allActions from '@/store/actions';


const ModalReminders = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [when, setWhen] = useState("")

  const closeModal=()=>{
    setIsOpen(false)
  }

  const openModal=()=>{
    setIsOpen(true)
  }

  const createReminder = () =>{
    dispatch(allActions.remindersActions.createReminder(description,date,when))
    dispatch(allActions.remindersActions.getReminders())
  }

  return (
    <>
      
        <Button
          onClick={openModal}
          className="mr-3"
          label="+"
        >
        </Button>


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
                    New Reminder.
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="rounded px-8 pt-6 pb-8 w-full">
                        <label className="block text-black text-sm font-bold mb-1">
                        Description
                        </label>
                        <input 
                          value={description} 
                          onChange={(e)=>setDescription(e.target.value)}
                          className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"/>
                        <label className="block text-black text-sm font-bold mb-1">
                        Date
                        </label>
                        <input 
                          type="date"
                          value={date} 
                          onChange={(e)=>setDate(e.target.value)}
                          className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"/>
                        <label className="block text-black text-sm font-bold mb-1">
                        When?
                        </label>
                        <input 
                          type="date"
                          value={when} 
                          onChange={(e)=>setWhen(e.target.value)}
                          className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"/>
                        <label className="block text-black text-sm font-bold mb-1">
                        Other
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-1 text-black bg-white"/>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>{closeModal(),createReminder()}}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="inline-flex ml-3 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Exit whitout saving
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalReminders;