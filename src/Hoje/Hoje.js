import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { getHabitosHoje, postHabitosFeitoHoje, postHabitosDesfeitoHoje } from "../Services/TrackIt";
import UserContext from "../context/UserContext";
import HabitContext from "../context/HabitContext";

const dayjs = require('dayjs');
dayjs().format();

export default function Hoje() {

    let weekDay;
    let now = dayjs(new Date());
    if (now.$W === 0) { weekDay = "Domingo"; }
    if (now.$W === 1) { weekDay = "Segunda-feira"; }
    if (now.$W === 2) { weekDay = "Terça-feira"; }
    if (now.$W === 3) { weekDay = "Quarta-feira"; }
    if (now.$W === 4) { weekDay = "Quinta-feira"; }
    if (now.$W === 5) { weekDay = "Sexta-feira"; }
    if (now.$W === 6) { weekDay = "Sabado"; }

    const { tasks, setTasks } = useContext(UserContext);
    const [habitos, setHabitos] = useState([]);
    const { habitTasks,setHabitTasks} = useContext(HabitContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${tasks.token}`
        }
    }

    useEffect(() => {
        const promise = getHabitosHoje(config);
        promise.then(autorizado)
        promise.catch(desautorizado)
    }, [])

    useEffect(() => {
        let total = habitos.length;
        let concluido = habitos.filter(habito=>habito.done===true).length;
        let percentual = (100*concluido/total).toFixed(0);
        setHabitTasks(percentual);
    }, [habitos])

    function autorizado(response) {
        setHabitos([...response.data])
    }

    function desautorizado() {
        alert("Faça login novamente");
    }

    function concluirHabito(index) {
        habitos[index].done = !habitos[index].done;

        if (habitos[index].done === true) { habitos[index].currentSequence += 1 }
        if (habitos[index].done === false) {
            if(habitos[index].highestSequence === habitos[index].currentSequence){
                habitos[index].highestSequence-=1;
            }
            habitos[index].currentSequence -= 1 
        }
        if (habitos[index].currentSequence > habitos[index].highestSequence) {
            habitos[index].highestSequence = habitos[index].currentSequence;
        }
        setHabitos([...habitos]);

        if (habitos[index].done === true){
            const promise = postHabitosFeitoHoje(habitos[index],config,habitos[index].id);
            promise.then();
            promise.catch(desautorizado);
        }
        if (habitos[index].done === false){
            const promise = postHabitosDesfeitoHoje(habitos[index],config,habitos[index].id);
            promise.then();
            promise.catch(desautorizado);
        }
        
    }

    return (
        <Container>
            <Data>{weekDay},{` ${now.$D}/${now.$M}`}</Data>
            {habitTasks==0  ? 
            <Texto>
                Nenhum hábito concluído ainda
            </Texto> : 
            <TextoVerde>
                {habitTasks}% dos hábitos concuídos
            </TextoVerde>}
            {habitos.map((habito, index) => (
                <Habito>
                    <TextosHabitos>
                        <HabitoTitulo>{habito.name}</HabitoTitulo>
                        <Sequencia>Sequência atual:
                            <CorSequencia color={habito.done}>
                                {habito.currentSequence} dias
                            </CorSequencia>
                        </Sequencia>
                        <Recorde>Seu recorde:
                            <CorRecorde
                                color={(habito.highestSequence == habito.currentSequence && habito.highestSequence != 0)}>
                                {habito.highestSequence} dias
                            </CorRecorde>
                        </Recorde>
                    </TextosHabitos>

                    <CaixaStatus color={habito.done} onClick={() => { concluirHabito(index) }} >
                        <ion-icon name="checkmark-sharp"></ion-icon>
                    </CaixaStatus>
                </Habito>))
            }
        </Container>
    )
}



const Container = styled.div`
    margin-top: 70px;
    background-color: #E5E5E5;
    height: 100vh;
    margin-bottom: 70px;
    padding-left: 18px;
`
const Data = styled.div`
    font-size: 23px;
    color:#126BA5;
    padding-top: 28px;
    margin-bottom: 5px;
`
const Texto = styled.div`
    color:#BABABA;
    font-size: 18px;
    margin-bottom: 28px;
`
const TextoVerde = styled.div`
    color:#8FC549;
    font-size: 18px;
    margin-bottom: 28px;
`
const Habito = styled.div`
    width: 80%;
    height: 94px;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    
`
const TextosHabitos = styled.div`
    margin-left: 15px;
`

const HabitoTitulo = styled.div`
    color: #666666;
    font-size: 20px;
    padding-top: 15px;
    margin-bottom: 7px;
`
const CaixaStatus = styled.div`
    background-color: ${props => props.color ? '#8FC549' : '#EBEBEB'};  
    width: 69px;
    height: 69px;
    margin-top: 13px;
    margin-right: 13px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38px;
    color: white;
`
const Sequencia = styled.div`
    color: #666666;
    font-size: 13px;
`
const CorSequencia = styled.span`
    color: ${props => props.color ? '#8FC549' : '#666666'};
`
const CorRecorde = styled.span`
    color: ${props => props.color ? '#8FC549' : '#666666'}
`

const Recorde = styled.div`
    color: #666666;
    font-size: 13px;
`