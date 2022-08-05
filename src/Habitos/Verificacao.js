import styled from "styled-components";

export default function VerificacaoDia({ habit, dia, iDia }) {

    dia.backColor = "FFFFFF";
    dia.color = "#CFCFCF";

    habit.days.map(day => {
        if (day === iDia) {
            dia.backColor = "#CFCFCF";
            dia.color = "#FFFFFF";
        }
    })

    return (
        <Dia color={dia.color} backColor={dia.backColor}>
            {dia.day}
        </Dia>
    );
}

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