import styled from "styled-components"
const dayjs = require('dayjs')

export default function Hoje(){
 let now  =dayjs();
    


    return(
        <Container>{now}</Container>
    )
}

const Container = styled.div`
    margin-top: 70px;
    background-color: #E5E5E5;
    height: 100vh;
    margin-bottom: 70px;
`