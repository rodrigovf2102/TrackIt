import styled from "styled-components"
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import HabitContext from "../context/HabitContext";
import 'react-circular-progressbar/dist/styles.css';

export default function Fundo() {

    const url = useLocation().pathname;
    const [displayMenu, setDisplayMenu] = useState("");
    const { habitTasks,setHabitTasks} = useContext(HabitContext);

    useEffect(() => {
        if (url === '/' || url === '/cadastro') {
            setDisplayMenu("none");
        }
        else {
            setDisplayMenu("flex");
        }
    }, [url])

    return (
        <Menu displayMenu={displayMenu}>
            <Link to="/habitos"><Itens>Hábitos</Itens></Link>
            <Link to="/hoje">
                <Circulo>
                    <CircularProgressbar styles={buildStyles(
                        {textColor:'#FFFFFF', pathColor:'#FFFFFF', trailColor:'#52B6FF'})} value={habitTasks} text={`Hoje`}/>
                </Circulo>
            </Link>
            <Link to="/historico"><Itens>Histórico</Itens></Link>
        </Menu>
    )
}

const Menu = styled.div`
    display: ${props => props.displayMenu};
    justify-content: space-around;
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    left: 0;
    align-items: center;
    background-color: white;
`
const Itens = styled.div`
    font-size: 18px;
    color: #52B6FF;
`
const Circulo = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 60px;
    background-color: #52B6FF;
    border-radius: 50%;
`