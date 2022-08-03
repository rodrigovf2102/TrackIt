export default function App() {
    return (
        <>
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