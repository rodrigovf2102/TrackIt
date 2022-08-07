import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";


export default function Topo() {

    const url = useLocation().pathname;
    const [displayTopo, setDisplayTopo] = useState("");
    const { tasks, setTasks } = useContext(UserContext);

    useEffect(() => {
        if (url === '/' || url === '/cadastro') {
            setDisplayTopo("none");
        }
        else {
            setDisplayTopo("flex");
        }
    }, [url])

    return (
        <Top displayTopo={displayTopo}>
            <Titulo>Trackit</Titulo>
            {tasks !==null ? <Imagem src={tasks.image} /> : <Imagem/>}
        </Top>
    )
}

const Top = styled.div`
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: ${props => props.displayTopo};
    position: fixed;
    top:0;
    left: 0;
    justify-content:space-between;
    align-items: center;
`

const Imagem = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 18px;
`

const Titulo = styled.div`
    font-size: 39px;
    font-family: 'Playball', cursive;
    color: white;
    margin-left: 18px;
`