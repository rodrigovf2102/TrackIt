import styled from "styled-components";
import { getHabitos } from '../Services/TrackIt'
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function Habitos() {

    const [formDisplay,setFormDisplay] = useState("none");
    const { tasks, setTasks } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${tasks.token}`
        }
    }
    let habitos = [];
    let promise = getHabitos(config);
    promise.then(Autorizado);
    promise.catch(Desautorizado);

    function Autorizado(response) {
        habitos = response.data;
        console.log(habitos);
        console.log(response.data);
    }

    function Desautorizado() {
        alert('Faça login novamente')
    }

    function criarHabito() {
        if(formDisplay==="none") {setFormDisplay("flex");}
        if(formDisplay!=="none") {setFormDisplay("none")}
    }

    return (
        <Container>
            <Titutlo>
                <div>Meus hábitos</div>
                <button onClick={criarHabito}>+</button>
            </Titutlo>
            <CriarHabitoForm formDisplay={formDisplay} >
                <Habito type='text' placeholder=" Nome do hábito" />
                <Dias>
                    <Dia>D</Dia><Dia>S</Dia><Dia>T</Dia><Dia>Q</Dia><Dia>Q</Dia><Dia>S</Dia><Dia>S</Dia>
                </Dias>
                <Botoes>
                    <Cancelar>Cancelar</Cancelar>
                    <Salvar>Salvar</Salvar>
                </Botoes>
            </CriarHabitoForm>
            {habitos.length === 0 ?
                <Texto>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Texto>
                : <div></div>}

        </Container>
    )
}

const Container = styled.div`
    margin-top: 70px;
    background-color: #E5E5E5;
    height: 100%;
    margin-bottom: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Titutlo = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
    padding-top: 30px;
    margin-bottom: 20px;
    :nth-child(1){
        color: #126BA5;
        font-size: 23px;
    }
    button{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        color: white;
        font-size: 27px;
    }
`
const Texto = styled.div`
        color: #666666;
        font-size: 18px;
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 25px;
`

const CriarHabitoForm = styled.form`
    height: auto;
    width: 90%;
    background-color: white;
    border-radius: 5px;
    display: ${props=> props.formDisplay};
    flex-wrap:wrap;

`

const Habito = styled.input`
    width: 95%;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
 
`

const Dia = styled.div`
    width: 30px;
    height: 30px;
    background-color: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    color: #D4D4D4;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 10px;
`
const Dias = styled.div`
    width: 100%;
    display: flex;
`

const Botoes = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 15px;
`

const Cancelar = styled.button`
    color: #52B6FF;
    font-size: 16px;
    background-color: white;
    margin-right: 15px;
`

const Salvar = styled.button`
    color: white;
    background: #52B6FF;
    border-radius: 5px;
    width: 84px;
    height: 35px;
    margin-right: 15px;
`