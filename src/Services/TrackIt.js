import axios from 'axios';

const Base_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

function postLogin(login) {
    const promise = axios.post(`${Base_URL}/auth/login`,login);
    return promise;
}

function postCadastro(cadastro) {
    const promise = axios.post(`${Base_URL}/auth/sign-up`,cadastro);
    return promise;
}

function postHabito(habito,config){
    const promise = axios.post(`${Base_URL}/habits`,habito,config);
    return promise;
}

function getHabitos(config){
    const promise = axios.get(`${Base_URL}/habits`,config);
    return promise;
}

function deletHabito(config,id){
    const promise = axios.delete(`${Base_URL}/habits/${id}`,config);
    return promise;   
}

function getHabitosHoje(config){
    const promise = axios.get(`${Base_URL}/habits/today`,config);
    return promise;   
}

function postHabitosFeitoHoje(habito,config,id){
    const promise = axios.post(`${Base_URL}/habits/${id}/check`,habito,config);
    return promise;     
}

function postHabitosDesfeitoHoje(habito,config,id){
    const promise = axios.post(`${Base_URL}/habits/${id}/uncheck`,habito,config);
    return promise;     
}

function getHistoricoHabitos(config){
    const promise = axios.get(`${Base_URL}/habits/history/daily`,config);
    return promise;     
}



export {postLogin,postCadastro, getHabitos, postHabito, 
        deletHabito, getHabitosHoje, postHabitosFeitoHoje,
        postHabitosDesfeitoHoje, getHistoricoHabitos};