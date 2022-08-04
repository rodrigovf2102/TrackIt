import Icone from '../Assets/Img/Icone.png'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import {postLogin, setToken} from '../Services/TrackIt';
import { useState, useContext } from 'react';
import { Grid } from 'react-loader-spinner';
import UserContext from '../context/UserContext';

export default function Login() {

    const [login,setLogin] = useState({email:"",password:""});
    const [corEntrar, setCorEntrar] = useState(1)
    const [disableForm, setDisableForm] = useState(false);
    const navigate = useNavigate();
    const {taks,setTasks} = useContext(UserContext);

    function loginInfo(event) {
        event.preventDefault();
    }

    function Login() {
        setCorEntrar(0.6);
        setDisableForm(true);
        const promisse = postLogin(login);
        promisse.then(autorizado);
        promisse.catch(desautorizado);
    }

    function desautorizado() {
        alert("Usuário ou senha incorreto");
        setCorEntrar(1);
        setDisableForm(false);
    }

    function autorizado(response) {
        setToken(response.data.token);
        setTasks({...response.data});
        setDisableForm(false);
        setCorEntrar(1);
        navigate('/hoje');
    }

    return (
        <Container>
            <img alt="1" src={Icone} />
            <Form onSubmit={loginInfo}>
                <Input type="text" placeholder=' Email' onChange={event => setLogin({...login, email : event.target.value})} 
                                   disabled={disableForm} required/>
                <Input type="password" placeholder=' Senha' onChange={event => setLogin({...login, password : event.target.value})} 
                                   disabled={disableForm} required />
                <Entrar cor={corEntrar} onClick={Login} disabled={disableForm} type="submit">
                    {disableForm ? <Grid color='white' radius="8" heigth="100"/> :"Entrar"}
                </Entrar>
                <Link to="/cadastro"><Cadastrar>Não tem uma conta? Cadastre-se</Cadastrar></Link>
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
display: flex;
justify-content: center;
align-items: center;
overflow-y: hidden;
`

const Cadastrar = styled.div`
text-decoration-line: underline;
width: 232px;
color: #52B6FF;
font-size: 14px;
margin-top: 25px;
`
export {Container,Form,Input,Entrar,Cadastrar};
