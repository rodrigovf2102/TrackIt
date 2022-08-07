import {Container,Form,Input,Entrar,Cadastrar} from '../Login/Login';
import Icone from '../Assets/Img/Icone.png';
import { Grid } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postCadastro } from '../Services/TrackIt';

export default function Cadastro() {

    const [disableForm, setDisableForm] = useState(false);
    const [cadastro,setCadastro] = useState({email:"",name:"",image:"",password:""});
    const [corCadastrar,setCorCadastrar] = useState(1);
    let status="";
    const navigate = useNavigate();

    function FazerCadastro(){
        setCorCadastrar(0.6);
        setDisableForm(true);
        console.log(cadastro);
        const promise = postCadastro(cadastro);
        promise.then(Autorizado);
        promise.catch(Desautorizado);
    }

    function Autorizado(response){
        console.log(response.data);
        status="autorizado"  
        setCorCadastrar(1);
        setDisableForm(false);
        navigate('/') ;      
    }
    
    function Desautorizado(){
        alert('Dados inválidos');
        setCorCadastrar(1);
        setDisableForm(false);
    }

    return (
        <Container>
            <img alt="1" src={Icone} />
            <Form>
                <Input type="text" placeholder=' Email' disabled={disableForm}
                       onChange={event => setCadastro({...cadastro, email : event.target.value})}/>
                <Input type="password" placeholder=' Senha' disabled={disableForm}
                       onChange={event => setCadastro({...cadastro, password : event.target.value})}/>
                <Input type="text" placeholder=' Nome' disabled={disableForm} 
                       onChange={event => setCadastro({...cadastro, name : event.target.value})}/>
                <Input type="url" placeholder=' Foto' disabled={disableForm} 
                       onChange={event => setCadastro({...cadastro, image : event.target.value})}/>
                <Entrar cor={corCadastrar} type="submit" disabled={disableForm} onClick={FazerCadastro}>
                    {disableForm ? <Grid color='white' radius="8" heigth="100"/> :'Cadastrar'}
                </Entrar>
                <Link to="/"><Cadastrar>Já tem uma conta? Faça login!</Cadastrar></Link>
            </Form>
        </Container>
    );
}