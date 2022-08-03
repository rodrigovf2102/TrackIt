import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GlobalStyles from './GlobalSyles';
import Topo from './Topo/Topo';
import Login from './Login/Login';
import Hoje from './Hoje/Hoje';
import Habitos from './Habitos/Habitos';
import Fundo from './Fundo/Fundo';
import Cadastro from './Cadastro/Cadastro';


export default function App() {
    return (
        <>
          <GlobalStyles/>
          <BrowserRouter>
            <Topo/>
            <Fundo/>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path={"/cadastro"} element={<Cadastro/>} />
              <Route path={"/habitos"} element={<Habitos/>} />
              <Route path={"/hoje"} element={<Hoje/>} />
            </Routes>
          </BrowserRouter>
        </>
      );
    }