import axios from 'axios';

let token;
const Base_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

function postLogin(login) {
    const promise = axios.post(`${Base_URL}/auth/login`,login);
    return promise;
}

function setToken(toke){
    token=toke;
}

function postCadastro(cadastro) {
    const promise = axios.post(`${Base_URL}/auth/sign-up`,cadastro);
    return promise;
}

function postHabito(habito){
    const promise = axios.post(`${Base_URL}/habits`,habito);
    return promise;
}

function getHabitos(){
    const promise = axios.get(`${Base_URL}/habits`);
    return promise;
}


export {postLogin,postCadastro, setToken};