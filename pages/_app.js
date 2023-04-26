import '@/styles/globals.css';
import store from '../store/index.js';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import Login from './login/index.js';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(store.getState().login.token)
  
  store.subscribe(()=>setIsLogged(store.getState().login.token))

  useEffect(()=>{
    setUser(isLogged);
  }, [isLogged])

  if(pageProps.protected && !user){
    return(
      <Provider store={store}>
        <Login/>
      </Provider>
    ) 
  }
  
  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) 
}
