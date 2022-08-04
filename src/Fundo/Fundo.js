import styled from "styled-components"
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Fundo() {

    const url = useLocation().pathname;
    const [displayMenu, setDisplayMenu] = useState("");

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
            <Link to="/hoje"><div>Hoje</div></Link>
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
    font-family: 'Lexend Deca', sans-serif;
    color: #52B6FF;
`