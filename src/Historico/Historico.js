import styled from "styled-components";

export default function Historico(){




    
    return(
        <Container>
            <Titulo>Histórico</Titulo>
            <Texto>Em breve você poderá ver o histórico dos seus hábitos aqui!</Texto>
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