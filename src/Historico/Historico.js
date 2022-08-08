import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import UserContext from "../context/UserContext";
import { useEffect, useState, useContext } from "react";
import { getHistoricoHabitos } from "../Services/TrackIt";
import CheckBox from "./CheckBox";

const dayjs = require('dayjs');
dayjs().format();
dayjs.locale('pt-br');

export default function Historico() {

    const [habitos, setHabitos] = useState([]);
    const [habits, setHabits] = useState([]);
    const { tasks, setTasks } = useContext(UserContext);
    const [color, setColor] = useState(false);
    let contador=habitos.length-1;
    console.log(habitos);
    console.log(habits);

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

    function colorirDia(date, view) {
        if (habitos.length > 0 && contador >=0) {
            let classe;
            if (dayjs(date).format('DD/MM/YYYY') === habitos[contador].day) {
                let habitosInconcluidos = habitos[contador].habits.filter(habit => habit.done === false);
                habitosInconcluidos.length > 0 ? classe = 'vermelho' : classe = 'verde';
                contador--;
                return classe;
            }
        }
    }

    function diaClicado(dia){
        let index;
        console.log(dayjs(dia).format('DD/MM/YYYY'));
        for(let i=0;i<habitos.length;i++){
            if(habitos[i].day === dayjs(dia).format('DD/MM/YYYY')){  
                index=i;
            }
        }
        if(index!==undefined){setHabits([...habitos[index].habits])};
        if(index===undefined){setHabits([])};
    }


    return (
        <Container>
            <Titulo>Histórico</Titulo>
            <Texto></Texto>
            <CalendarContainer color={color} >
                <Calendar tileClassName={({date, view }) => colorirDia(date, view)} onClickDay={(value)=> diaClicado(value)}  />
            </CalendarContainer>
            {habits.length>0 ? habits.map(habit=>
            <Habito>
                Hábito:  {habit.name}
                {<CaixaStatus color={habit.done}>
                    <CheckBox habitDone={habit.done}></CheckBox>
                 </CaixaStatus>}
            </Habito>) : ""
            }
            
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    background-color: #E5E5E5; ;
    margin-top: 70px;
    margin-bottom: 70px;
    padding-left: 17px;
    display: flex;
    flex-direction: column;

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
const Habito = styled.div`
    width: 300px;
    height: 90px;
    display: flex;
    align-items: center;
    background-color: white;
    margin-top: 10px;
    border-radius: 10px;
    padding-left: 10px;
    justify-content: space-between;
    :last-child{
        margin-bottom: 80px;
    }
`
const CalendarContainer = styled.div`
    div{
        width: 350px;
        border-radius: 10px;
        border: 0px solid white;
    }
    button{
    }
    .verde{
        background-color: green;
        border-radius: 50%;
    }
    .vermelho{
        background-color: red;
        border-radius: 50%;
    }

`
const CaixaStatus = styled.div`
    background-color: ${props => props.color ? '#8FC549' : 'red'};  
    width: 69px;
    height: 69px;
    margin-right: 13px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38px;
    color: white;
`