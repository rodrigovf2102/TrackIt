import { useContext } from "react"
import styled from "styled-components"
import UserContext from "../context/UserContext"

export default function Hoje(){
    const {tasks,setTasks} = useContext(UserContext);


    return(
        <Container></Container>
    )
}

const Container = styled.div`
    margin-top: 70px;
    background-color: #E5E5E5;
    height: 100%;
    margin-bottom: 70px;
`