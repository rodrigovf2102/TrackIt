import Icone from '../Assets/Img/Icone.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { postLogin } from '../Services/TrackIt';
import { useState } from 'react';

export default function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [corEntrar,setCorEntrar] = useState(1)

    function loginInfo(event) {
        event.preventDefault();
    }

    function Login(){
        setCorEntrar(0.7)
        const login = { email: email, password:password};
        const promisse = postLogin(login);

        promisse.then(Autorizado);
        promisse.catch(Desautorizado);
    }

    function Desautorizado(erro){
        console.log(erro.response.status);
        setCorEntrar(1)
    }

    function Autorizado(){

    }

    return (
        <Container>
            <img src={Icone} />
            <Form onSubmit={loginInfo}>
                <Input type="text" placeholder=' Email' onChange={event => setEmail(event.target.value)} required />
                <Input type="password" placeholder=' Senha' onChange={event => setPassword(event.target.value)} required/>
                <Entrar cor={corEntrar} onClick={Login} type="submit">{"Entrar"} </Entrar>
                <Link to="/cadastro"><Cadastro>Não tem uma conta? Cadastre-se</Cadastro></Link>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`

const Form = styled.form`
margin-top: 50px;
display: flex;
flex-direction: column;
align-items: center;
`

const Input = styled.input`
width: 303px;
height: 45px;
border: 1px solid #D5D5D5;
border-radius: 5px;
margin-bottom: 10px;
`

const Entrar = styled.button`
width: 303px;
height: 45px;
background: #52B6FF;
border-radius: 5px;
color: white;
font-size: 21px;
opacity: ${props => props.cor};
`

const Cadastro = styled.div`
text-decoration-line: underline;
width: 232px;
color: #52B6FF;
font-size: 14px;
margin-top: 25px;
`

