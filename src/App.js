import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalSyles';
import Topo from './Topo/Topo';
import Login from './Login/Login';
import Hoje from './Hoje/Hoje';
import {Habitos} from './Habitos/Habitos';
import Fundo from './Fundo/Fundo';
import Cadastro from './Cadastro/Cadastro';
import UserContext from './context/UserContext'
import { useState } from 'react';


export default function App() {
  const [tasks,setTasks] = useState({});
  

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <UserContext.Provider value={{tasks,setTasks}}>
          <Topo />
          <Fundo />
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path={"/cadastro"} element={<Cadastro />} />
            <Route path={"/habitos"} element={<Habitos />} />
            <Route path={"/hoje"} element={<Hoje />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}