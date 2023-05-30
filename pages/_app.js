import '@/styles/globals.css';
import store from '../store/index.js';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import Login from './login/index.js';
import Nav from '@/components/nav.js';

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
        <Nav/>
        <Login/>
      </Provider>
    ) 
  }
  
  return(
    <Provider store={store}>
      <Nav/>
      <Component {...pageProps} />
    </Provider>
  ) 
}
