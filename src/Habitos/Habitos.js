import styled from "styled-components";
import { getHabitos, postHabito, deletHabito } from '../Services/TrackIt'
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import VerificacaoDia from "./Verificacao";

export function Habitos() {

    const [habito, setHabito] = useState({ days: [], name: "" })
    let [habitos, setHabitos] = useState([]);
    const [habitDelId, setHabitDelId] = useState(null);

    const [days, setDays] = useState([{ day: "D", color: "#CFCFCF", backColor: "FFFFFF"},
    { day: "S", color: "#CFCFCF", backColor: "FFFFFF"}, { day: "T", color: "#CFCFCF", backColor: "FFFFFF"},
    { day: "Q", color: "#CFCFCF", backColor: "FFFFFF"}, { day: "Q", color: "#CFCFCF", backColor: "FFFFFF"},
    { day: "S", color: "#CFCFCF", backColor: "FFFFFF"}, { day: "S", color: "#CFCFCF", backColor: "FFFFFF"}]);

    const [Habitodays, setHabitoDays] = useState([{ day: "D", color: "#CFCFCF", backColor: "FFFFFF"},
    { day: "S", color: "#CFCFCF", backColor: "FFFFFF"}, { day: "T", color: "#CFCFCF", backColor: "FFFFFF"},
    { day: "Q", color: "#CFCFCF", backColor: "FFFFFF"}, { day: "Q", color: "#CFCFCF", backColor: "FFFFFF"},
    { day: "S", color: "#CFCFCF", backColor: "FFFFFF"}, { day: "S", color: "#CFCFCF", backColor: "FFFFFF"}]);

    const [formDisplay, setFormDisplay] = useState("none");
    const [confirmDisplay, setConfirmDisplay] = useState("none");
    const [disableForm, setDisableForm] = useState(false);
    const [disableDelete, setDisableDelete] = useState(false);

    const { tasks, setTasks } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${tasks.token}`
        }
    }

    console.log(habitos);
    
    useEffect(() => {
        let promise = getHabitos(config);
        promise.then(autorizado);
        promise.catch(desautorizado);
    }, [])

    function autorizado(response) {
        setHabitos([...response.data]);
        setDisableDelete(false);
    }

    function desautorizado() {
        alert('Erro, refaça login e tente denovo')
    }

    function criarHabito() {
        if (formDisplay === "none") { setFormDisplay("flex"); }
        if (formDisplay !== "none") { setFormDisplay("none") }
    }

    function submitHabit(event) {
        event.preventDefault();
    }

    function selecionarDia(index) {
        if (!disableForm) {
            if (days[index].color === "#FFFFFF") {
                days[index].color = "#CFCFCF";
                days[index].backColor = "#FFFFFF";
            }
            else {
                days[index].color = "#FFFFFF";
                days[index].backColor = "#CFCFCF";
            }
            setDays([...days])
        }
    }

    function salvarHabito() {
        setDisableForm(true);

        for (let i = 0; i < days.length; i++) {
            if (days[i].color.toString() === "#FFFFFF") {
                habito.days.push(i);
            }
            days[i].backColor = "#FFFFFF";
            days[i].color = "#CFCFCF";
        }
        setHabito({ ...habito });
        setDays([...days]);

        const promise = postHabito(habito, config);


        promise.then(postAutorizado);
        promise.catch(postDesautorizado)
    }

    function postAutorizado() {
        const promise = getHabitos(config);
        promise.then(autorizado);
        promise.catch(desautorizado);
        setFormDisplay("none");
        setDisableForm(false);
        setHabito({ days: [], name: "" });
    }

    function postDesautorizado() {
        alert("post invalido ou refaça login");
        setDisableForm(false);
    }

    function deletHabit(id) {
        if(!disableDelete){
            setConfirmDisplay("flex");
            setHabitDelId(id);
        }   
    }

    function cancelarCriacaoHabito() {
        setFormDisplay("none");
    }

    function confirmDelete(response) {
        setDisableDelete(true);
        setConfirmDisplay("none");
        if (response === "cancelar") {
        }
        if (response === "confirmar") {
            const promise = deletHabito(config, habitDelId.toString());
            promise.then(postAutorizado);
            promise.catch(desautorizado);
        }
    }

    return (
        <Container>
            <Titutlo>
                <div>Meus hábitos</div>
                <button onClick={criarHabito}>+</button>
            </Titutlo>
            <ConfirmWindow confirmDisplay={confirmDisplay}>
                Deseja mesmo deletar hábito?
                <Confirm onClick={() => { confirmDelete("confirmar") }}>Confirmar</Confirm>
                <Cancel onClick={() => { confirmDelete("cancelar") }}>Cancelar</Cancel>
            </ConfirmWindow>
            <CriarHabitoForm formDisplay={formDisplay} onSubmit={submitHabit} >
                <HabitoInput disabled={disableForm} type='text' placeholder=" Nome do hábito"
                    onChange={event => setHabito({ ...habito, name: event.target.value })} />
                <Dias>
                    {days.map((dia, index) => (<Dia key={index} color={dia.color}
                        backColor={dia.backColor} onClick={() => { selecionarDia(index, disableForm) }}>{dia.day}</Dia>))}
                </Dias>
                <Botoes>
                    <Cancelar onClick={cancelarCriacaoHabito}>Cancelar</Cancelar>
                    <Salvar type="reset" onClick={salvarHabito}>Salvar</Salvar>
                </Botoes>
            </CriarHabitoForm>
            {habitos.length === 0 ?
                <Texto>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Texto>
                : <>
                    {habitos.map((habit) => (<Habito>
                        <TituloHabito>
                            {habit.name}<ion-icon onClick={() => { deletHabit(habit.id) }} name="trash-outline"></ion-icon>
                        </TituloHabito>
                        <Dias>
                            {Habitodays.map((dia, iDia) =>
                            <VerificacaoDia habit={habit} dia={dia} iDia={iDia}></VerificacaoDia>
                               )}
                        </Dias></Habito>))}
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    margin-top: 70px;
    background-color: #E5E5E5;
    height: 100%;
    overflow-y: scroll;
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
    width: 92%;
    background-color: white;
    border-radius: 5px;
    display: ${props => props.formDisplay};
    flex-wrap:wrap;
    margin-bottom: 20px;
`
const Habito = styled.form`
    width: 92%;
    height: auto;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
    div{
        font-size: 20px;
        margin-top: 15px;
        margin-left: 15px;
    }
    :last-child{
        margin-bottom: 90px;
    }
`



const HabitoInput = styled.input`
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
    background-color:${props => props.backColor};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    color: ${props => props.color};
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

const TituloHabito = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 15px;
    padding-left: 15px;
`

const ConfirmWindow = styled.div`
    display: ${props => props.confirmDisplay};
    flex-direction: column;
    text-align: center;
    width: 200px;
    height: 120px;
    position: absolute;
    top: 45%;
    bottom: 45%;
    background-color: lightgray;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.5);
`

const Confirm = styled.div`
    width: 90px;
    height: 30px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.5);
`

const Cancel = styled.div`
    width: 90px;
    height: 30px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.5);
`
