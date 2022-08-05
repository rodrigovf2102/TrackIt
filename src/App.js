import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalSyles';
import Topo from './Topo/Topo';
import Login from './Login/Login';
import Hoje from './Hoje/Hoje';
import Historico from './Historico/Historico';
import {Habitos} from './Habitos/Habitos';
import Fundo from './Fundo/Fundo';
import Cadastro from './Cadastro/Cadastro';
import UserContext from './context/UserContext'
import { useState } from 'react';
import HabitContext from './context/HabitContext';


export default function App() {
  const [tasks,setTasks] = useState({});
  const [habitTasks,setHabitTasks] = useState(0);

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <UserContext.Provider value={{tasks,setTasks}}>
        <HabitContext.Provider value={{habitTasks,setHabitTasks}}>
          <Topo />
          <Fundo />
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path={"/cadastro"} element={<Cadastro />} />
            <Route path={"/habitos"} element={<Habitos />} />
            <Route path={"/hoje"} element={<Hoje />} />
            <Route path={"/historico"} element={<Historico />} />
          </Routes>
        </HabitContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}