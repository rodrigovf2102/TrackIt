import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import UserContext from "../context/UserContext";
import { useEffect, useState, useContext } from "react";
import { getHistoricoHabitos } from "../Services/TrackIt";

const dayjs = require('dayjs');
dayjs().format();
dayjs.locale('pt-br');

export default function Historico() {

    const [habitos, setHabitos] = useState([]);
    const { tasks, setTasks } = useContext(UserContext);
    console.log(tasks);
    console.log(habitos);

    const config = {
        headers: {
            "Authorization": `Bearer ${tasks.token}`
        }
    }

    useEffect(() => {
        if (Object.values(tasks).length > 0) {
            const promise = getHistoricoHabitos(config);
            promise.then(autorizado)
            promise.catch(desautorizado)
        }
    }, [tasks])

    function autorizado(response) {
        setHabitos([...response.data])
    }

    function desautorizado() {
        alert("Faça login novamente");
    }



    return (
        <Container>
            <Titulo>Histórico</Titulo>
            <Texto></Texto>
            <CalendarContainer>
                <Calendar />
            </CalendarContainer>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #E5E5E5; ;
    margin-top: 70px;
    padding-left: 17px;
`
const Titulo = styled.div`
    color: #126BA5;
    font-size: 23px;
    padding-top: 28px;
`

const Texto = styled.div`
    color: #666666;
    margin-top: 20px;
    font-size: 18px;
`
const CalendarContainer = styled.div`
    div{
        width: 400px;
        border-radius: 10px;
        border: none;
    }

`